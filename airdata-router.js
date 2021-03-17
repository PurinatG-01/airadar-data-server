var express = require("express");
var router = express.Router();
// MongoDB model
var AirData = require("./airdata-model");
var Score = require("./score-model")
var Event = require("./event-model")
// Utility
var utility = require("./utility")
var scoreCal = require("./score-cal")
var eventCal = require("./event-cal")
var axios = require("axios")

const blynk_address = "139.59.126.32:8080"


let event_session = []


// ============================= GET data =============================

// GET Device status
router.get("/getDeviceStatus/:device_id", (req, res) => {
  console.log(`Get status !! ${req.params.device_id}`)
  axios
    .get(`http://${blynk_address}/${req.params.device_id}/isHardwareConnected`)
    .then((response) => {
      res.send(response.data)
      console.log("> status response : ", response)
    }).catch((err) => {
      res.status(400).send(err);
    })

})


// ---------------------- Raw_Data ----------------------------
// GET all
router.get("/rawData/getAllData", (req, res) => {
  AirData.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : GET all]")
    res.status(200).send(data);
  });
});

// GET all by device_id
router.get("/rawData/getAllDataByDeviceId/:device_id", (req, res) => {
  AirData.find({ device_id: req.params.device_id }).exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : GET all by device_id]")
    res.status(200).send(data);
  });
});

// GET 1 by device_id
router.get("/rawData/getByDeviceId/:device_id", (req, res) => {
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

// GET Historical CSV by device_id

router.get("/rawData/getHistoricalByDeviceId/:device_id", (req, res, next) => {
  let limit = 10;
  if (req.query.limit) {
    limit = Number(req.query.limit)
  }
  AirData.find({ device_id: req.params.device_id }).sort({ _id: -1 }).limit(limit).exec((err, data) => {
    if (err) {
      next(err)
      return res.status(400).send(err)
    };
    console.log("[DB=>AirData : GET Historical CSV data by device_id]")
    const fileName = req.query.fileName ? req.query.fileName : `${req.params.device_id}.csv`
    if (data.length != 0) {
      const csv = utility.jsonToCSV(data)
      res.header('Content-Type', 'text/csv');
      res.attachment(fileName);
      res.status(200).send(csv);
    } else {
      res.status(200).send("No data available");
    }
  });
})


// ---------------------- Score ----------------------------

// Get score by device_id [1, 10, 50, 100, All (Optional) ]
router.get("/score/getByDeviceId/:device_id", (req, res) => {
  let limit = 1;
  if (req.query.limit) {
    limit = Number(req.query.limit)
  }
  console.log("> limit : ", limit)
  Score.find({ device_id: req.params.device_id }).sort({ date: -1 }).limit(limit).exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : GET 1 by device_id]")
    axios
      .get(`http://${blynk_address}/${req.params.device_id}/isHardwareConnected`)
      .then((status) => {
        const result = [{ ...JSON.parse(JSON.stringify(data[0])), online: status.data }]
        res.status(200).send(result)
      })
      .catch((err2) => {
        res.status(400).send(err2)
      })
  })
})


// ---------------------- Event ----------------------------

// Get events by device_id [1, 5, 10, All (Optional) ]
router.get("/event/getByDeviceId/:device_id", (req, res) => {
  let limit = 1;
  if (req.query.limit) {
    limit = Number(req.query.limit)
  }
  console.log("> limit : ", limit)
  Event.find({ device_id: req.params.device_id }).sort({ date: -1 }).limit(limit).exec((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : GET 1 by object device_id]")
    res.status(200).send(data)
  })

})

// Get events by multiple device_id [10]
router.get("/event/getByMultipleDeviceIds", (req, res) => {
  let devicesId = req.body.devices.split(',')
  Event.find({ device_id: devicesId }).sort({ date: -1 }).limit(10).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data)
  })
})

// ================================= POST data =====================================
// POST (create new data)
router.post("/postData/", (req, res) => {
  let data = req.body.data.split(",")
  const proccessedData = utility.rawToProcess(data)
  //  --------------------------------------------------
  // Save to Raw_Data
  var rawData = new AirData(proccessedData);
  rawData.save((err, data) => {
    if (err) return res.status(400).send(err);
    console.log("[DB=>AirData : POST]")

    //  -------------- Calculate in period (1 hrs, 1 min, 10 secs ) -------------------
    // Save to Score (ScoreModel)
    const score = scoreCal(proccessedData)
    var scoreData = new Score(score);
    scoreData.save((err, data) => {
      if (err) return res.status(400).send(err);
      console.log("[DB=>Score : POST]")

      const EVENT = eventCal(score, event_session)
      if (EVENT) {
        // if same ignore new upcoming
        if (EVENT.isSame) {
          console.log("[3] Same event occur")
          res.status(200).send("Successfully post data")
        }
        else {
          event_session = EVENT.new_event_session
          console.log("[1] New event arrived")

          var eventData = new Event({ device_id: score.device_id, event_factors: EVENT.new_event });
          eventData.save((err, data) => {
            if (err) return res.status(400).send(err);
            console.log("[DB=>Event : POST]")

            res.status(200).send("Successfully post data");
          });
        }

      } else {
        //  No event (Reset specific device_id session)
        console.log("[2] No event !!")
        event_session = event_session.filter((session) => (session.device_id != score.device_id))
        res.status(200).send("Successfully post data");
      }


    });
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
