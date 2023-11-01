const { User } = require("../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
        const hashed = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: username,
            password: hashed,
            email: email,
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
    res.json({message: "login route"})
}

// SERVE USER DATA
exports.getUserArea = async (req, res, next) => {
    res.json({ message: "user data route" });
};
