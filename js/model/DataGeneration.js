import xlsx from "xlsx";

export default class DataGeneration {
    constructor() {

    }

    createEvents(object) {
        console.log(object);
        let sheetName = object.excelFile.workbook.SheetNames[parseInt(object.selectedTemplate.sheetNo) - 1];
        let sheet = xlsx.utils.sheet_to_json(object.excelFile.workbook.Sheets[sheetName], {header: "A"});
        for (let i = object.excelFile.startingRow; i < sheet.length; i++) {
            console.log(i);
        }
    }


};
