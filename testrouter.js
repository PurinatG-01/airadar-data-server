var express = require("express");
var router = express.Router();
var Devices = require("./testmodel");


// GET all
router.get("/", (req, res) => {
    Devices.find().exec((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    });
  });
  
  // GET 1
  router.get("/:_id", (req, res) => {
    Devices.findById(req.params._id).exec((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    });
  });
  

  // POST (create new data)
router.post("/", (req, res) => {
    var obj = new Devices(req.body);
    obj.save((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
    });
  });
  
  // PUT (update current data)
  router.put("/:_id", (req, res) => {
    Devices.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
    });
  });
  
  // DELETE (delete 1 data)
  router.delete("/:_id", (req, res) => {
    Devices.findByIdAndDelete(req.params._id, (err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send("ลบข้อมูลเรียบร้อย");
    });
  });
  
  module.exports = router;
