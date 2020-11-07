var mongoose = require("mongoose");

var devicesSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    name: {
      type: String
    },
    price: {
      type: Number
    }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "Devices"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Devices = mongoose.model("devices", devicesSchema);
module.exports = Devices;