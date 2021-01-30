var mongoose = require("mongoose");

var airdataSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
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
    gas: {
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
    }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "AirData"
  }
);

var AirData = mongoose.model("AirData", airdataSchema);
module.exports = AirData;