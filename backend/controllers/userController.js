const { User } = require("../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// REGISTER A NEW USER
exports.register = async (req, res) => {
    const { email, username, password } = req.body;

    // validation - if user somehow submits empty strings, their post req will be rejected.
    if (!email || !username || !password) {
        //manual error creation
        return res.status(400).json({
            message:
                "Valid details were not provided. Check username, email and password have been given.",
        });

        // http-errors error creation
        // return next(console.log(createError(400, "Valid details were not provided. Check username, email and password have been given.")))
    }

    // VALIDATION - check if email is already registered
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
        return res.status(400).json({
            status: 400,
            message: "email is already registered",
        });
    }

    // VALIDATION - check if username is taken
    const usernameCheck = await User.findOne({ username: username });
    if (usernameCheck) {
        return res.status(400).json({
            status: 400,
            message: "Username already taken",
        });
    }

    try {
        const hashed = await bcrypt.hash(password, saltRounds); // does this need a callback to deal with errors?

        const newUser = new User({
            email: email,
            password: hashed,
            username: username,
        });
        await newUser.save();
    } catch (error) {
        return res.status(500).json({
            status: res.status,
            message: "a server error has occured.",
        });
    }

    res.status(200).json({
        message: "User registered successfully",
        email,
        username,
        password,
    });
};

// USER LOGIN
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // find user
    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({
            status: 404,
            message: "user not found",
        });
    }

    //check password
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        if (!result) {
            return res.status(401).json({
                status: 401,
                message: "incorrect password",
            });
        }
        // if a user logs in successfully, they are given a jwt via generateToken()
        if (result) {
            const token = generateToken(user._id);
            console.log(`token is ${token}`);

            // save token as a cookie, returns status and message

            return res
                .cookie("token", token, {
                    httpOnly: true,
                    // left out secure: .... here
                })
                .status(200)
                .json({
                    status: 200,
                    message: "user successfully logged in",
                });
        }
    });
};

// CREATE JWT FOR LOGIN
// a function to create a jwt based on the user id, which is passed in and then used as the payload for the jwt method. As an option we have set the jwt to expire in 30 days
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// SERVE USER DATA - PROTECTED
exports.getUserArea = async (req, res) => {
    // user gets access
    const userId = req.userId;

    try {
        // find the user on the basis of the ID we get from the token payload.
        // note use of populate method - this populates the user's activities array
        const user = await User.findById(userId).populate("activities");

        // if there is no user, send a 401
        if (!user) {
            console.log("not authorised");
            return res.status(401).json({
                message: "Not authorised",
            });
        }

        return res.status(200).json({
            message: "user data route",
            username: user.username,
            activities: user.activities,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "server error",
        });
    }
};

// SHOW ALL USERS - PROTECTED
exports.allUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json({
            users: allUsers
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}


// UPDATE A USER - PROTECTED
exports.updateUser = async (req, res) => {
    // to use this endpoint, user id is taken from the middleware, and the body must contain a json like this:
    /*
    {
        "update" : {
            "[property to update]" : "[new value]"
        }
    }
    */
    const userId = req.userId
    const updatedInfo = req.body.update
    try {
        const updatedUser = await User.updateOne(
            {_id: userId}, updatedInfo
        )
        
        if (updatedUser.acknowledged) {
            const user = await User.find({_id: userId})

            return res.status(200).json({
                status: 200,
                message: "Update successful",
                user
            })
        } else {
            return res.status(500).json({
                status: 500,
                message: "update unsuccessful due to server error"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "update unsuccessful due to server error"
        })
    }
}

// DELETE A USER - PROTECTED
exports.deleteUser = async (req, res) => {
    // get user id from cookie
    const userToDelete = req.userId;

    try {
        // find and delete
        const deletedUser = await User.findByIdAndDelete(userToDelete);

        // remove the cookie
        return res
            .clearCookie("token")
            .status(200)
            .json({
                status: 200,
                message: `User id ${deletedUser._id} has been deleted.`,
            });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "user not deleted due to server error",
        });
    }
};


// LOG A USER OUT
exports.logout = async (_, res) => {
    return res.clearCookie("token").status(200).json({
        message: "User has been logged out.",
    });
};
