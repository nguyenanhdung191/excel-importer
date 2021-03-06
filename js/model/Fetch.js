import fetch from "node-fetch";
import {TEMPLATE_CONSTANT_ID, TEMPLATE_ATTRIBUTE_ID} from "./constants.js";

//const api = window.location.href.slice(0, window.location.href.indexOf("api")) + "api";


const auth = "Basic " + btoa("thai:ABCD1234");
const api = "https://hispvn.org/gdpm/api";
export default class Fetch {
    constructor() {

    }

    getDataSetList() {
        return fetch(
            `${api}/dataSets.json?paging=false`,
            {
                headers: {
                    Authorization: auth
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json.dataSets);
    }

    getProgramList() {
        return fetch(
            `${api}/programs.json?paging=false`,
            {
                headers: {
                    Authorization: auth
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json.programs);
    }

    getDataELementList() {
        return fetch(
            `${api}/dataElements.json?paging=false&fields=id,name,categoryCombo`,
            {
                headers: {
                    Authorization: auth
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json.dataElements);
    }

    getDataSetDataElementList() {
        return fetch(
            `${api}/dataElements.json?paging=false&filter=domainType:eq:AGGREGATE&fields=id,name,categoryCombo`,
            {
                headers: {
                    Authorization: auth
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json.dataElements);
    }

    getProgramDataElementList() {
        return fetch(
            `${api}/dataElements.json?paging=false&filter=domainType:eq:TRACKER&fields=id,name,categoryCombo`,
            {
                headers: {
                    Authorization: auth
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json.dataElements);
    }

    getCategoryOptionCombinationList() {
        return fetch(
            `${api}/categoryCombos.json?paging=false&fields=id,name,categoryOptionCombos[id,name],isDefault`,
            {
                headers: {
                    Authorization: auth
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json.categoryCombos);
    }

    getTemplates() {
        return fetch(
            `${api}/constants/${TEMPLATE_CONSTANT_ID}.json?fields=attributeValues[value]`,
            {
                headers: {
                    Authorization: auth
                },
                compress: false
            }
        )
            .then(result => result.json())
            .then(json => json.attributeValues[0].value);
    }

    saveTemplate(json) {
        let object = {
            "name": "excel-importer-template",
            "value": 0,
            "attributeValues": [
                {
                    "value": JSON.stringify(json),
                    "attribute": {
                        "id": TEMPLATE_ATTRIBUTE_ID
                    }
                }
            ]
        };

        fetch(`${api}/constants/${TEMPLATE_CONSTANT_ID}`,
            {
                method: 'PUT',
                body: JSON.stringify(object),
                headers: {
                    Authorization: auth,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                compress: false
            }
        )
            .then(function (res) {
                return res.json();
            });
    }


};