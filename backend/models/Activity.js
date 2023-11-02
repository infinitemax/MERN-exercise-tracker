const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        activity: {
            type: String,
            require: true,
        },
        time: {
            type: String,
            require: true,
        }
    },
    { timestamps: true } // added to give us a created/edited timestamp
);

// I've chosen to go with a new mongoose schema, not sure if it's the best option. Alternative would be to add items to user's array but 

module.exports.Activity = mongoose.model("Activity", activitySchema);
