const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        token: String,
        activities: [],
    },
    { timestamps: true } // added to give us a created/edited timestamp
);

// a note on activities = at the moment this is just an array, I wonder if that will be okay, or do I need to create a separate schema that can be added to the array? I don't think I do necessarilyt, it might be fine to just create an object when they do an activity and add that to the array.

module.exports.User = mongoose.model("User", userSchema);
