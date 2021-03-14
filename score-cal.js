const CONSTANTS = require("./air-constants")

const factorCal = (name, rawData) => {

    let AQI = 0.0
    const breakpoint = CONSTANTS.breakpoints.find((e) => (e.title == name))
    let range = breakpoint.ranges.find((e) => {
        if (e.low != "-" && e.high != "-")
            return (rawData >= e.low && rawData <= e.high)
        if (e.low == "-")
            return (rawData <= e.high)
        if (e.high == "-")
            return (rawData >= e.low)
    })

    if (range) {
        const index = CONSTANTS.IAQIRange.find((e) => (range.range == e.range))
        // In case of index has no boundary
        if (range.low == "-")
            range.low = 0
        if (range.high == "-")
            range.high = range.low + 100

        AQI = index.high - ((rawData - range.low) * ((index.high - index.low) / (range.high - range.low)))
       
        return Number(AQI.toFixed(2))
    } else {
        
        console.log("> rawData : ",rawData)
        console.log("> breakpoint.ranges[0].low : ",breakpoint.ranges[0].low)

        // Out of range in lower bound (good)
        if(rawData <= breakpoint.ranges[0].low){
            return 100.00
        }
        // Out of range in higher bound (hazardous)
        if(rawData >= breakpoint.ranges[3].high){
            return 0.00
        }
        // console.error(`> ${name} rawData not in any range\n-----------------------------------------------------------`)
        // return "Not in ranged"
    }

}

const scoreCal = (data) => {

    const factorsScore = [
        { name: "co", AQI: factorCal("co", data.co) },
        { name: "pm2_5", AQI: factorCal("pm2_5", data.pm2_5) },
        { name: "pm10_0", AQI: factorCal("pm10_0", data.pm10_0) },
        { name: "temperature", AQI: factorCal("temperature", data.temperature) },
        { name: "humidity", AQI: factorCal("humidity", data.humidity) },
    ]

    let deviceAQI = 0.0
    let notInRanged = 0
    factorsScore.forEach((e) => {
        if (e.AQI != "Not in ranged")
            deviceAQI += Number(e.AQI)
        else
            notInRanged += 1
    })

    deviceAQI = deviceAQI / (6 - notInRanged)
    let level = "-"
    CONSTANTS.IAQIRange.forEach((range)=>{
        if(deviceAQI >= range.low && deviceAQI <= range.high){
            level = range.range
        }
    })

    return {
        // String
        device_id: data.device_id,
        // Number
        device_score: deviceAQI,
        // String
        level: level,
        // Array
        factors_score: factorsScore,
    }
}

module.exports = scoreCal
