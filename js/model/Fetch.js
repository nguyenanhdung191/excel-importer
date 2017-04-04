import fetch from "node-fetch";
import {TEMPLATE_CONSTANT_ID, TEMPLATE_ATTRIBUTE_ID} from "./constants.js";
const auth = "Basic " + btoa("dung:ABCD1234");

export default class Fetch {
    constructor() {

    }

    getDataSetList() {
        return fetch(
            "https://hispvn.org/gdpm/api/dataSets.json?paging=false",
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

    getProgramList(){
        return fetch(
            "https://hispvn.org/gdpm/api/programs.json?paging=false",
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
            "https://hispvn.org/gdpm/api/dataElements.json?paging=false&fields=id,name,categoryCombo",
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
            `https://hispvn.org/gdpm/api/dataElements.json?paging=false&filter=domainType:eq:AGGREGATE&fields=id,name,categoryCombo`,
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
            `https://hispvn.org/gdpm/api/dataElements.json?paging=false&filter=domainType:eq:TRACKER&fields=id,name,categoryCombo`,
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
            `https://hispvn.org/gdpm/api/categoryCombos.json?paging=false&fields=id,name,categoryOptionCombos[id,name],isDefault`,
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
            `https://hispvn.org/gdpm/api/constants/${TEMPLATE_CONSTANT_ID}.json?fields=attributeValues[value]`,
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

        fetch(`https://hispvn.org/gdpm/api/constants/${TEMPLATE_CONSTANT_ID}`,
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
        ;
    }


};