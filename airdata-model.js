var mongoose = require("mongoose");

var airdataSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    device_id: {
      type: String
    },
    co2: {
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
    }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "Raw_Data"
  }
);

var AirData = mongoose.model("Raw_Data", airdataSchema);
module.exports = AirData;