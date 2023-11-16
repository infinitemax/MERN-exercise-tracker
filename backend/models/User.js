const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
        },
        token: String,
        testActivities: [{type: String}],
        activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity"}],
        firstName: String,
        lastName: String,
        dateOfBirth: Date,
        height: Number,
        weight: Number,
        avatar: {
            data: Buffer,
            contentType:String
        } // need to make this an image file!
    },
    { timestamps: true } // added to give us a created/edited timestamp
);

// a note on activities = at the moment this is just an array, I wonder if that will be okay, or do I need to create a separate schema that can be added to the array? I don't think I do necessarilyt, it might be fine to just create an object when they do an activity and add that to the array.

module.exports.User = mongoose.model("User", userSchema);
