const e = require('express');
const { IAQIRange } = require('./air-constants')

const eventCal = (score, event_session) => {

    // Calculate event from score
    let eventFactors = []
    score.factors_score.forEach(e => {
        if (e.AQI <= IAQIRange.find(el => (el.range == 'unhealthy')).high) {
            eventFactors.push(e.name)
        }
    });

    if (eventFactors.length > 0) {
        // If there any same device_id which mean already occur an event
        const prevE = event_session.find((e) => (
            e.device_id == score.device_id
        ))

        if (prevE) {

            // Check with prev session (No exist session bad => bad )
            let checkEventFactors = 0
            // check if eventFactors same to an exists one
            eventFactors.forEach(el => {
                if (prevE.event_factors.includes(el)) {
                    checkEventFactors += 1
                }
            })

            // if it's same
            if ((checkEventFactors == eventFactors.length) && (eventFactors.length == prevE.event_factors.length)) {
                return { new_event: null, new_event_session: event_session, isSame: true }
            }

            // It's not same as prev
            let new_event_session = [...event_session]
            new_event_session = new_event_session.filter((session) => (session.device_id != score.device_id))
            new_event_session = [...new_event_session, {
                device_id: score.device_id,
                event_factors: eventFactors,
            }]
            return { new_event: eventFactors, new_event_session: new_event_session, isSame: false }
        } else {
            // Push new session event (No exist session good => bad )
            const new_event_session = [...event_session, {
                device_id: score.device_id,
                event_factors: eventFactors,
            }]
            return { new_event: eventFactors, new_event_session: new_event_session, isSame: false }
        }
    } else {
        return null
    }


}
module.exports = eventCal