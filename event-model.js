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
        date:{
            type: Date,
            default: Date.now
        }

    },
    {
        // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
        collection: "Event"
    }
);

var Event = mongoose.model("Event", eventSchema);
module.exports = Event;