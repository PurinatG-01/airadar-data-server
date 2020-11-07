function rawToProcess(data){
    return {
      device_id : data[8],  
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
module.exports =  { rawToProcess };