var mongoose = require("mongoose");

var airdataSchema = mongoose.Schema(
  {
    device_id: {
      type: String
    },
    co: {
      type: Number
    },
    temperature: {
      type: Number
    },
    humidity: {
      type: Number
    },
    pressure: {
      type: Number
    },
    VOC: {
      type: Number
    },
    pm1_0: {
      type: Number
    },
    pm2_5: {
      type: Number
    },
    pm10_0:{
      type: Number 
    },
    date:{
      type: Date,
      default: Date.now
    },
    device_send_date:{
      type: Date,
      // default: Date.now,
    },
    dataserver_received_data:{
      type: Date,
      default: Date.now,
    },
    sequence_no:{
      type: Number,
    }
  },
  {
    collection: "AirData_testing"
  }
);

var AirData = mongoose.model("AirData_testing", airdataSchema);
module.exports = AirData;