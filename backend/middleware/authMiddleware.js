const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    // check for bearer token in the auth header
    // if authorisation header is there, and if it begins with "bearer" we check it's a valid token
    console.log("trying to auth");
    console.log(req.headers);
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            console.log("now I'm at line 16");
            // get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token (with jwt method)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                message: "Not authorised - invalid token",
            });
        }
    }
    if (!token) {
        console.log("no token");
        res.status(401).json({
            message: "Not authorised - no token",
        });
    }
};

module.exports = { protect };
