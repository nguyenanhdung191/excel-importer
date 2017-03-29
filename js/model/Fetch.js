import fetch from "node-fetch";
const auth = "Basic " + btoa("dung:ABCD1234");

export default class Fetch {
    constructor() {

    }

    getDataSetList() {
        return fetch(
            "https://dhis2.asia/lao/api/dataSets.json?paging=false",
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

    getDataSetDataElementList() {
        return fetch(
            `https://dhis2.asia/lao/api/dataElements.json?paging=false&filter=domainType:eq:AGGREGATE&fields=id,name,categoryCombo`,
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
            `https://dhis2.asia/lao/api/dataElements.json?paging=false&filter=domainType:eq:TRACKER&fields=id,name,categoryCombo`,
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
            `https://dhis2.asia/lao/api/categoryCombos.json?paging=false&fields=id,name,categoryOptionCombos[id,name],isDefault`,
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


};