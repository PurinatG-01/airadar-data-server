var mongoose = require("mongoose");

var scoreSchema = mongoose.Schema(
    {
        device_id: {
            type: String
        },
        device_score: {
            type: Number
        },
        factors_score: {
            type: Array,
        },
        level:{
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "Score"
    }
);

var ScoreData = mongoose.model("Score", scoreSchema);
module.exports = ScoreData;