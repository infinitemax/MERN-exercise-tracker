const { User } = require("../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

// REGISTER A NEW USER
exports.register = async (req, res, next) => {
    const { username, password, email } = req.body;

    // validation - if user somehow submits empty strings, their post req will be rejected.
    if (!username || !password || !email) {
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
            message: "that username has been taken",
        });
    }

    try {
        const hashed = await bcrypt.hash(password, saltRounds); // does this need a callback to deal with errors?

        const newUser = new User({
            username: username,
            password: hashed,
            email: email
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
        username,
        password,
        email,
    });
};

// USER LOGIN
exports.login = async (req, res, next) => {
    const {username, password} = req.body

    // find user
    const user = await User.findOne({username: username})

    if (!user) {
        return res.status(404).json({
            status: 404,
            message: "user not found"
        })
    }

    //check password
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
        if (err) {
            console.log(err)
            return
        }
        if (!result) {
            return res.status(401).json({
                status: 401,
                message: "incorrect password",
            })
        }
        // if a user logs in successfully, they are given a jwt via generateToken()
        if (result) {
            const token = generateToken(user._id);
            console.log(token)

            // generate token, then send that as a json.
            return res.status(200).json({
                status: 200,
                message: "user successfully logged in",
            })
        }
    })

    
}

// CREATE JWT
// a function to create a jwt based on the user id, which is passed in and then used as the payload for the jwt method. As an option we have set the jwt to expire in 30 days
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

// SERVE USER DATA
exports.getUserArea = async (req, res, next) => {
    // user gets access
    const userId = req.tokenResult.id

    try {
        // find the user on the basis of the ID we get form the token payload.
    const user = await User.findById(userId) // I think this can be refactored so that it happens in authMiddleware, with that returning a user, rather than id. Bu then maybe that's unncessary, as we need to access the db anyway to get their records

    if (!user) {
        console.log("not authorised")
    }

    res.json({ 
        message: "user data route", 
        otherMessage: "testing jwt middleware",
        userId: userId,
        user
    });} catch (error) {
        console.log(error)
    }
};
