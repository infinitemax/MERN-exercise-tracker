const mongoose = require("mongoose");
const { User } = require("./User")

const activitySchema = new mongoose.Schema(
    {
        activity: {
            type: String,
            // require: true,
        },
        duration: {
            type: Number,
            // require: true,
        },
        intensity: {
            type: Number,
            // require: true,
        },
        // add date = what's the best approach? 
        notes: String,
        user: {type: mongoose.Schema.Types.ObjectId, ref: User}
    },
    { timestamps: true } // added to give us a created/edited timestamp
);

// I've chosen to go with a new mongoose schema, not sure if it's the best option. Alternative would be to add items to user's array but 

module.exports.Activity = mongoose.model("Activity", activitySchema);
