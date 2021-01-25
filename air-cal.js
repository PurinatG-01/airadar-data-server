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

    if(range){
        const index = CONSTANTS.IAQIRange.find((e) => (range.range == e.range))
        console.log("> rawData : ", rawData)
        console.log("> breakpoint : ",breakpoint)
        console.log("> range : ", range)
        console.log("> index : ", index)
        if (range.low == "-")
            range.low = 0
        if (range.high == "-")
            range.high = range.low + 100
    
        AQI = index.high - ((rawData - range.low) * ((index.high - index.low) / (range.high - range.low)))
        console.log(`> AQI ${name} : `, AQI)
        console.log("-----------------------------------------------------------")
        return AQI.toFixed(2)
    }else{
        console.error(`> ${name} rawData not in any range\n-----------------------------------------------------------`)
        return "Not in ranged"
    }

}

let AQIs = []

const airCal = () => {
    return "aircal"
}

CONSTANTS.testData.forEach((e) => {
    AQIs.push({
        name: e.name, 
        AQI : factorCal(e.name, e.rawData),
    })
})

console.log("> AQIs : ", AQIs)



module.exports = airCal