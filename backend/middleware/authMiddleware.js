const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const protect = async (req, res, next) => {

    // So, remaining question - where does the token get sent from?? It must be stored somewhere and then sent within the header. 

    // ANOTHER VIDEO TUTORIAL! (WEB DEV SIMPLIFIED)
    // the purpose of this middleware is to:
        // get the token that was sent
        // verify the user
        // send that user to the function/route that called this middleware

    // *****using cookies
    const token = req.cookies.token;


    if (!token) {
        console.log("no token");
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
        // if we have a valid token, set req.tokenResult as the tokenResult object we get back from jwt.verify. 
        
        // add the token result (i.e. the _id) to the request body, which can be passed to the route.
        req.userId = tokenResult.id
        
        next()
    })} catch (error) {
        console.log(error)
    }

};

module.exports = { protect };
