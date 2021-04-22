var mongoose = require("mongoose");

var eventSchema = mongoose.Schema(
    {
        device_id: {
            type: String
        },
        event_factors: {
            type: Array
        },
        date: {
            type: Date,
            default: Date.now
        }

    },
    {
        collection: "Event"
    }
);

var Event = mongoose.model("Event", eventSchema);
module.exports = Event;