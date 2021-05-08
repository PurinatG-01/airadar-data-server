const { Parser } = require('json2csv')

function rawToProcess(data){
    return {
      device_id : data[8],  
      co: data[0],
      temperature: data[1],
      humidity: data[2],
      pressure: data[3],
      VOC: data[4],
      pm1_0 : data[5],
      pm2_5: data[6],
      pm10_0: data[7],
      device_send_date: data[9],
    }
  
}

function jsonToCSV(data, fields) {
    const json2csv = new Parser();
    // Convert BSON to JSON then parse to CSV format
    const csv = json2csv.parse(JSON.parse(JSON.stringify(data)));
    return csv
  }
  
module.exports = { rawToProcess, jsonToCSV };