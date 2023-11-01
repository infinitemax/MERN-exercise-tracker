const { User } = require("../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.register = async (req, res, next) => {
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
        return res.status(400).json({ email: "Email is already registered" });
    }

    // VALIDATION - check if username is taken
    const usernameCheck = await User.findOne({ username: username })
    if (usernameCheck) {
        return res.status(400).json({ username: "Username has been taken" });
    }

    try {
        const hashed = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email: email,
            password: hashed,
            username: username,
        });
        await newUser.save();
    } catch (error) {
        return res.status(500).json({
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
