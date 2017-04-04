import xlsx from "xlsx";

export default class ExcelReader {
    constructor() {

    }

    //JUST CONVERT TO ARRAY BUFFER BECAUSE readAsBinaryString is not supported on all browser
    fixdata(data) {
        let o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    };


    parseExcel(file) {
        let reader = new FileReader();
        let current = this;
        let workbook;
        let promise = new Promise((resolve, reject) => {
            reader.onload = e => {
                let data = e.target.result;
                let arr = current.fixdata(data);
                workbook = xlsx.read(btoa(arr), {type: 'base64'});
                resolve(workbook);
            }
        });
        reader.readAsArrayBuffer(file);
        return promise;
    };


};