import fetch from "node-fetch";
//const api = window.location.href.slice(0, window.location.href.indexOf("api")) + "api";
const api = "https://hispvn.org/gdpm/api";
const auth = "Basic " + btoa("thai:ABCD1234");


export default class SendData {
    constructor() {

    }

    sendDataValues(dataValues, ouScheme) {
        return fetch(`${api}/dataValueSets?orgUnitIdScheme=${ouScheme}&dryRun=true`,
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
        return fetch(`${api}/events?orgUnitIdScheme=${ouScheme}&dryRun=true`,
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