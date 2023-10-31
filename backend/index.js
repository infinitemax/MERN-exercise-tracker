require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const createError = require("http-errors");


app.use(
    cors({
        origin: "http://localhost:3001",
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







app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
