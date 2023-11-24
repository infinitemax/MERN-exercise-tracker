const mongoose = require("mongoose");
const { User } = require("./User");

const suggestionSchema = new mongoose.Schema(
    {
        name: String,
        type: String,
        muscle: String,
        equipment: String,
        difficulty: String,
        instructions: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: User },
    },
    { timestamps: true }
);

module.exports.Suggestion = mongoose.model("Suggestion", suggestionSchema);
