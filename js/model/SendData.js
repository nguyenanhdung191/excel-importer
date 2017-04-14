import fetch from "node-fetch";
const auth = "Basic " + btoa("nghia:ABCD1234");


export default class SendData {
    constructor() {

    }

    sendDataValues(dataValues, ouScheme) {
        return fetch(`http://localhost:8082/api/dataValueSets?orgUnitIdScheme=${ouScheme}&dryRun=true`,
            {
                method: 'POST',
                body: JSON.stringify(dataValues),
                headers: {
                    Authorization: auth,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json);
    }

    sendEvents(events, ouScheme) {
        return fetch(`https://hispvn.org/gdpm/api/events?orgUnitIdScheme=${ouScheme}&dryRun=true`,
            {
                method: 'POST',
                body: JSON.stringify(events),
                headers: {
                    Authorization: auth,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json);
    }
}