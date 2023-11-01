require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const createError = require("http-errors");
const userRoutes = require("./routes/userRoutes")


app.use(
    cors({
        
    })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({ extended: false }));

    
try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('connected to database')
} catch (error) {
    console.log('error connecting to the database')
}


// auth code to go here


app.use("/", userRoutes); // brings in user routes, e.g. register

// app.post("/register", (req, res, next) => {
//     res.send("hello")
// })



// per a supertest video, I have created an app.js file separate from the index.js so that we can test more easily. app.js can be imported into index.js and the index.js test file.
module.exports = app;