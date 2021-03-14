
const CONSTANTS = {
    testData: [
        { name: "co", rawData: 601 },
        { name: "pm2_5", rawData: 100 },
        { name: "pm10_0", rawData: 0.16 },
        { name: "temperature", rawData: 27.2 },
        { name: "humidity", rawData: 52 },
        { name: "VOC", rawData: 0.21 },
    ],
    factors: ["co", "pm2_5", "pm10_0", "temperature", "humidity"],
    breakpoints: [
        {
            title: "co",
            ranges: [
                {
                    range: "good",
                    low: 0,
                    high: 1.7,
                },
                {
                    range: "moderate",
                    low: 1.8,
                    high: 8.7,
                },
                {
                    range: "unhealthy",
                    low: 8.8,
                    high: 10.0,
                },
                {
                    range: "hazardous",
                    low: 10.1,
                    high: 50.0,
                },
            ]

        },
        {
            title: "pm2_5",
            ranges: [
                {
                    range: "good",
                    low: 0,
                    high: 37,
                },
                {
                    range: "moderate",
                    low: 38,
                    high: 50,
                },
                {
                    range: "unhealthy",
                    low: 51,
                    high: 200,
                },
                {
                    range: "hazardous",
                    low: 201,
                    high: "-",
                },
            ]

        },
        {
            title: "pm10_0",
            ranges: [
                {
                    range: "good",
                    low: 0.0,
                    high: 20.0,
                },
                {
                    range: "moderate",
                    low: 21,
                    high: 150,
                },
                {
                    range: "unhealthy",
                    low: 0.151,
                    high: 180
                },
                {
                    range: "hazardous",
                    low: 181,
                    high: 600,
                },
            ],

        },
        {
            title: "temperature",
            ranges: [
                {
                    range: "good",
                    low: 20.0,
                    high: 26.0,
                },
                {
                    range: "moderate",
                    low: 26.1,
                    high: 29.0,
                },
                {
                    range: "unhealthy",
                    low: 29.1,
                    high: 39.0,
                },
                {
                    range: "hazardous",
                    low: 39.1,
                    high: 45.0,
                },
            ],
        },
        {
            title: "humidity",
            ranges: [
                {
                    range: "good",
                    low: 40.0,
                    high: 70.0,
                },
                {
                    range: "moderate",
                    low: 70.1,
                    high: 80.0,
                },
                {
                    range: "unhealthy",
                    low: 80.1,
                    high: 90.0,
                },
                {
                    range: "hazardous",
                    low: 90.1,
                    high: 100.0,
                },
            ],

        },
        {
            title: "VOC",
            ranges: [
                {
                    range: "good",
                    low: 0.0,
                    high: 0.087,
                },
                {
                    range: "moderate",
                    low: 0.088,
                    high: 0.261,
                },
                {
                    range: "unhealthy",
                    low: 0.262,
                    high: 0.43,
                },
                {
                    range: "hazardous",
                    low: 0.44,
                    high: 3.00,
                },
            ],

        }],
    IAQIRange: [
        {
            range: "good",
            low: 76,
            high: 100,
        },
        {
            range: "moderate",
            low: 51,
            high: 75,
        },
        {
            range: "unhealthy",
            low: 26,
            high: 50,
        },
        {
            range: "hazardous",
            low: 0,
            high: 25,
        },
    ],




}

module.exports = CONSTANTS