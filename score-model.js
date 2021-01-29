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
    },
    {
        // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
        collection: "Score"
    }
);

var ScoreData = mongoose.model("Score", scoreSchema);
module.exports = ScoreData;