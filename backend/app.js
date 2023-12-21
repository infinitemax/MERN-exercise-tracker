require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const createError = require("http-errors");
const userRoutes = require("./routes/userRoutes")
const cookieParser = require("cookie-parser")

// "https://mern-exercise-tracker-7fu9.vercel.app" || 

app.use(
    cors({
        origin: ["http://localhost:3002"],
        methods: ["GET", "POST", "DELETE", "PATCH"],
        credentials: true
    })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({ extended: false }));
app.use(cookieParser());
    
try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('connected to database')
} catch (error) {
    console.log('error connecting to the database')
}



app.use("/", userRoutes); // brings in user routes, e.g. register


// per a supertest video, I have created an app.js file separate from the index.js so that we can test more easily. app.js can be imported into index.js and the index.js test file.
module.exports = app;
