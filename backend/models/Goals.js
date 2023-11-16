// A GOAL MODEL

// This model allows users to record goals which are stores in a separte collection but linked with the user.

const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
    {
        goalType: {
            type: String,
            enum: ['repetition', 'duration', 'energy'],
            require: true
        },
        target: {
            type: Number,
            require: true
        },
        goalPeriod: {
            type: Number,
            require: true
        },
        userId: [{
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        }]
    },
    { timestamps: true }
);

module.exports.Goal = mongoose.model("Goal", goalSchema)