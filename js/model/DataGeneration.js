import xlsx from "xlsx";
import moment from "moment";

export default class DataGeneration {
    constructor() {

    }

    createEvents(object) {
        let template = object.selectedTemplate;
        let sheetName = object.excelFile.workbook.SheetNames[parseInt(template.sheetNo) - 1];
        let sheet = object.excelFile.workbook.Sheets[sheetName];
        let fixedOrgUnit = "";
        let fixedEventDate = "";
        if (template.orgUnitContainer === "cell") {
            fixedOrgUnit = sheet[template.orgUnitAddress].v + "";
        }
        if (template.eventDateContainer === "cell") {
            fixedEventDate = moment(sheet[template.eventDateAddress].v).format("YYYY-MM-DD");
        }
        let endingRow = xlsx.utils.sheet_to_json(sheet, {header: "A"}).length;
        let events = {events: []};
        for (let i = object.excelFile.startingRow; i <= endingRow; i++) {
            let event = {
                program: template.program,
                orgUnit: (fixedOrgUnit === "") ? sheet[template.orgUnitAddress + i].v : fixedOrgUnit,
                eventDate: (fixedEventDate === "") ? sheet[template.eventDateAddress + i].v : moment(fixedEventDate).format("YYYY-MM-DD"),
                dataValues: []
            };
            Object.keys(template.deMapping).forEach(de_coc => {
                let de = de_coc.split("-")[0];
                let address = template.deMapping[de_coc];
                let value = (sheet[address + i].t === "d") ? moment(sheet[address + i].v).format("YYYY-MM-DD") : sheet[address + i].v + "";
                event.dataValues.push({
                    dataElement: de,
                    value: value
                });
            });
            events.events.push(event);
        }
        return events;
    }

    createDataValues(object) {
        let template = object.selectedTemplate;
        let sheetName = object.excelFile.workbook.SheetNames[parseInt(template.sheetNo) - 1];
        let sheet = object.excelFile.workbook.Sheets[sheetName];
        let fixedOrgUnit = "";
        let fixedPeriod = "";
        if (template.orgUnitContainer === "cell") {
            fixedOrgUnit = sheet[template.orgUnitAddress].v + "";
        }
        if (template.periodContainer === "cell") {
            fixedPeriod = sheet[template.periodAddress].v + "";
        }
        let endingRow = xlsx.utils.sheet_to_json(sheet, {header: "A"}).length;
        let dataValues = {dataValues: []};

        for (let i = object.excelFile.startingRow; i <= endingRow; i++) {
            let orgUnit = (fixedOrgUnit === "") ? sheet[template.orgUnitAddress + i].v + "" : fixedOrgUnit;
            let period = (fixedPeriod === "") ? sheet[template.periodAddress + i].v + "" : fixedPeriod;
            Object.keys(template.deMapping).forEach(de_coc => {
                let dataValue = {
                    dataElement: "",
                    categoryOptionCombo: "",
                    value: "",
                    orgUnit: orgUnit,
                    period: period
                };
                let de = de_coc.split("-")[0];
                let coc = de_coc.split("-")[1];
                let address = template.deMapping[de_coc];
                let value = sheet[address + i].v + "";
                dataValue.dataElement = de;
                dataValue.categoryOptionCombo = coc;
                dataValue.value = value;
                dataValues.dataValues.push(dataValue);
            });
        }
        return dataValues;
    }

};
