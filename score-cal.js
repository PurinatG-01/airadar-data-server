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
        // console.log("> rawData : ", rawData)
        // console.log("> breakpoint : ", breakpoint)
        // console.log("> range : ", range)
        // console.log("> index : ", index)
        if (range.low == "-")
            range.low = 0
        if (range.high == "-")
            range.high = range.low + 100

        AQI = index.high - ((rawData - range.low) * ((index.high - index.low) / (range.high - range.low)))
        // console.log(`> AQI ${name} : `, AQI)
        // console.log("-----------------------------------------------------------")
        return AQI.toFixed(2)
    } else {
        console.error(`> ${name} rawData not in any range\n-----------------------------------------------------------`)
        return "Not in ranged"
    }

}

const scoreCal = (data) => {

    const factorsScore = [
        { name: "co", AQI: factorCal("co", data.co) },
        { name: "pm2_5", AQI: factorCal("pm2_5", data.pm2_5) },
        { name: "pm10_0", AQI: factorCal("pm10_0", data.pm10_0) },
        { name: "temperature", AQI: factorCal("temperature", data.temperature) },
        { name: "humidity", AQI: factorCal("humidity", data.humidity) },
        { name: "VOC", AQI: factorCal("VOC", data.VOC) },
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

    return {
        // String
        device_id: data.device_id,
        // Number
        device_score: deviceAQI,
        // Array
        factors_score: factorsScore,
    }
}

module.exports = scoreCal


// Debug
// let AQIs = []

// CONSTANTS.testData.forEach((e) => {
//     AQIs.push({
//         name: e.name,
//         AQI: factorCal(e.name, e.rawData),
//     })
// })

// console.log("> AQIs : ", AQIs)
// const testScoreCal = scoreCal({
//     co: 400,
//     pm2_5: 14,
//     pm10_0: 9,
//     temperature: 27,
//     humidity: 40,
//     gas: 242,
// })
// console.log("> scoreCal : ", testScoreCal)
