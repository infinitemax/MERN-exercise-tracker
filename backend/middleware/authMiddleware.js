const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const protect = async (req, res, next) => {

    // So, remaining question - where does the token get sent from?? It must be stored somewhere and then sent within the header. 

    // ANOTHER VIDEO TUTORIAL! (WEB DEV SIMPLIFIED)
    // the purpose of this middleware is to:
        // get the token that was sent
        // verify the user
        // send that user to the function/route that called this middleware


    // *****this is where token is as a bearer header, but we're going to try with cookies
    // const authHeader = req.headers["authorization"]
    // const token = authHeader && authHeader.split(" ")[1] // sets token where authHeader exists (using conditional approach)

    // *****using cookies
    const token = req.cookies.token;


    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "no token"
        })
    }

    try {await jwt.verify(token, process.env.JWT_SECRET, (err, tokenResult) => {

        if (err) {
            console.log("token is not valid")
            return res.status(403).json({
                status: 403,
                message: "token is not valid"
            })
        }
        // if we have a valid token, set req.tokenResult as the tokenResult object we get back from jwt.verify. Going to log this as I don't quite understand what it is - answer: it's the payload that we included when we created the token.
        console.log(`user object from jwt.verify is:`)
        
        console.log(tokenResult.id)
        req.userId = tokenResult.id
        

        next()
    })} catch (error) {
        console.log(error)
    }


    // ONE VIDEO TUTORIAL
    // let token;

    // // check for bearer token in the auth header
    // // if authorisation header is there, and if it begins with "bearer" we check it's a valid token
    // console.log("trying to auth");
    // console.log(req.headers);
    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.startsWith("Bearer")
    // ) {
    //     try {
    //         console.log("now I'm at line 16");
    //         // get token from header
    //         token = req.headers.authorization.split(" ")[1];

    //         // verify token (with jwt method)
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //         // get user from token
    //         req.user = await User.findById(decoded.id).select("-password");

    //         next();
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(401).json({
    //             message: "Not authorised - invalid token",
    //         });
    //     }
    // }
    // if (!token) {
    //     console.log("no token");
    //     res.status(401).json({
    //         message: "Not authorised - no token",
    //     });
    // }
};

module.exports = { protect };
