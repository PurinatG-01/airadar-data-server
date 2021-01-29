var express = require("express");
var router = express.Router();
// MongoDB model
var AirData = require("./airdata-model");
var Score = require("./score-model")
var Event = require("./score-model")
// Utility
var utility = require("./utility")
var scoreCal = require("./score-cal")



// ============================= GET data =============================

// ---------------------- Raw_Data ----------------------------
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
  if (req.query.limit) {
    limit = Number(req.query.limit)
  }
  console.log("> limit : ", limit)
  AirData.find({ device_id: req.params.device_id }).sort({ _id: -1 }).limit(limit).exec((err, data) => {
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

// ---------------------- Score ----------------------------

// Get score by device_id [1, 10, 50, 100, All (Optional) ]

// ---------------------- Event ----------------------------

// Get event by device_id [1, 5, 10, All (Optional) ]


// ================================= POST data =====================================
// POST (create new data)
router.post("/postData/", (req, res) => {
  let data = req.body.data.split(",")
  console.log(data)
  const proccessedData = utility.rawToProcess(data)


  //  --------------------------------------------------
  // Save to Raw_Data
  var rawData = new AirData(proccessedData);
  rawData.save((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : POST]")
    res.status(200).send("Successfully post data");
  });
  //  -------------- Calculate in period (1 hrs, 1 min, 10 secs ) -------------------
  // Save to Score (ScoreModel)
  const score = airCal(proccessedData)
  var scoreData = new Score(score);
  scoreData.save((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>Score : POST]")
    res.status(200).send("Successfully post data");
  });
  //  --------------------------------------------------
  // If has Event => Save to Event
  const event = airCal(score)
  var eventData = new Event(event);
  eventData.save((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>Score : POST]")
    res.status(200).send("Successfully post data");
  });
  //  --------------------------------------------------
});

// =========================== OTHERS [PUT, DELETE] =================================

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
