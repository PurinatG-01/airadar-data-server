var mongoose = require("mongoose");

var eventSchema = mongoose.Schema(
    {
        // กำหนด ชื่อและชนิดของ document เรา
        device_id: {
            type: String
        },
        description: {
            type: Array
        },
        factors : {
            type: Array
        },
        date: {
            type: Date,
            default: Date.now,
        }
    },
    {
        // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
        collection: "Raw_Data"
    }
);

var AirData = mongoose.model("Raw_Data", airdataSchema);
module.exports = AirData;