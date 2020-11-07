const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Test = require("./testrouter");

let session_history_data = []


// Mongo Atlas
var mongo_uri = "mongodb+srv://admin:senior2020@airdatacluster.6vorx.mongodb.net/Mongo-Test?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[DB:success] connected to the database ");
  },
  error => {
    console.log("[DB:failed] " + error);
    process.exit();
  }
);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(cors());

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});


function rawToProcess(data){
  return {
    id: session_history_data.length,
    co2: data[0],
    temperature: data[1],
    humidity: data[2],
    pressure: data[3],
    gas: data[4],
    pm1_0 : data[5],
    pm2_5: data[6],
    pm10_0: data[7],
  }

}

app.get('/getSessionData', (req,res)=>{
  res.json(session_history_data)
})

app.post('/pushData', (req,res)=>{
  if(session_history_data.length == 30){
    session_history_data = []
  }
  
  let data = req.body.data.split(",")
  const proccessedData = rawToProcess(data)
  session_history_data.push(rawToProcess(data))
  console.log(session_history_data[session_history_data.length-1])
  res.send("Push Data Completed")
  
})


// MongoDB Path
app.use("/api/devices",Test)

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});