var express = require("express");
var router = express.Router();
var AirData = require("./airdata-model");
var utility = require("./utility")


// GET all
router.get("/getAllData", (req, res) => {
  AirData.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : GET all]")
    res.status(200).send(data);
  });
});

// GET all by device_id
router.get("/getAllDataByDeviceId/:device_id", (req, res) => {
  AirData.find({ device_id: req.params.device_id }).exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : GET all by device_id]")
    res.status(200).send(data);
  });
});

// GET 1 by device_id
router.get("/getByDeviceId/:device_id", (req, res) => {
  let limit = 1;
  if(req.params.limit){
    limit = req.params.limit
  }
  AirData.find({ device_id: req.params.device_id }).sort({ _id: -1 }).limit(1).exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : GET 1 by object device_id]")
    res.status(200).send(data)
  })

})

// GET 1 by object_id
router.get("/getByObjectId/:_id", (req, res) => {
  AirData.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : GET 1 by object _id]")
    res.status(200).send(data);
  });
});


// POST (create new data)
router.post("/postData/", (req, res) => {
  let data = req.body.data.split(",")
  console.log(data)
  const proccessedData = utility.rawToProcess(data)
  var obj = new AirData(proccessedData);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : POST]")
    res.status(200).send("Successfully post data");
  });
});

// PUT (update current data)
router.put("/editData/:_id", (req, res) => {
  AirData.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : PUT]")
    res.status(200).send("Successfully update data");
  });
});

// DELETE (delete 1 data)
router.delete("/deleteData/:_id", (req, res) => {
  AirData.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : DELETE]")
    res.status(200).send("Successfully delete data");
  });
});

module.exports = router;
