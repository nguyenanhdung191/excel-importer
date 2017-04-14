import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton"
import ImportIcon from "material-ui/svg-icons/file/file-upload";
import moment from "moment";
import ImportSummary from "./ImportSummary";
import ExcelReader from "../model/ExcelReader";
import Ultility from "../model/Ultility";
import DataGeneration from  "../model/DataGeneration";
import SendData from "../model/SendData";
import ImportError from "./ImportError";

const excelHandler = new ExcelReader();
const ultility = new Ultility();
const dataGeneration = new DataGeneration();
const sendData = new SendData();

export default class Import extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTemplateName: "",
            selectedTemplate: {},
            excelFile: {
                name: "",
                size: 0,
                noOfSheets: 0,
                workbook: {},
                startingRow: 0
            },
            importSummary: {
                importCount: {
                    imported: 0,
                    updated: 0,
                    ignored: 0
                }
            },
            importTime: ""
        }
    }

    handleSelectedTemplate = (event, key, value) => {
        this.setState({
            selectedTemplateName: value,
            selectedTemplate: this.props.templateList[value]
        });
    };

    handleUploadFile = (event) => {
        if (event.target.value === "") {
            return;
        }
        let fileName = event.target.files[0].name;
        let fileExtension = fileName.split(".").pop();
        let fileSize = event.target.files[0].size;
        if (fileExtension === "xls" || fileExtension === "xlsx") {
            excelHandler.parseExcel(event.target.files[0])
                .then(workbook => {
                    let object = {
                        name: fileName,
                        size: ((fileSize / 1000000).toFixed(2)) + " MB",
                        noOfSheets: workbook.SheetNames.length,
                        workbook: workbook
                    };
                    let startingRow = prompt("Please enter stating row number");
                    while (startingRow === "" || !ultility.isNumeric(startingRow) || startingRow === "0") {
                        startingRow = prompt("Invalid number,please enter stating row number again");
                    }
                    object.startingRow = parseInt(startingRow);
                    this.setState({
                        excelFile: object
                    });
                    document.getElementById("excelFileInput").value = "";
                });
        }
        else {
            alert("Invalid file!");
            event.target.value = "";
            this.setState({
                excelFile: {
                    name: "",
                    size: 0,
                    noOfSheets: 0,
                    workbook: {},
                    startingRow: 0
                }
            });
        }
    };

    handleImportExcel = () => {
        if (this.state.selectedTemplateName === "") {
            alert("Please select template");
        }
        else if (this.state.excelFile.size === 0) {
            alert("Please upload excel file")
        } else {
            if (this.state.selectedTemplate.domainType === "event") {
                sendData.sendEvents(dataGeneration.createEvents(this.state), this.state.selectedTemplate.orgUnitMappingBy)
                    .then(summary => {
                        this.setState({
                            importSummary: summary,
                            importTime: moment().format("YYYY-MM-DD HH:MM:SS"),
                            excelFile: {
                                name: "",
                                size: 0,
                                noOfSheets: 0,
                                workbook: {},
                                startingRow: 0
                            }
                        });
                    });
            }
            else {
                sendData.sendDataValues(dataGeneration.createDataValues(this.state), this.state.selectedTemplate.orgUnitMappingBy)
                    .then(summary => this.setState({
                        importSummary: summary,
                        importTime: moment().format("YYYY-MM-DD HH:MM:SS"),
                        excelFile: {
                            name: "",
                            size: 0,
                            noOfSheets: 0,
                            workbook: {},
                            startingRow: 0
                        }
                    }));
            }
        }
    };


    render() {
        return (
            <div>
                <div style={{float: "left", marginRight: 10, marginBottom: 10}}>
                    <Paper style={{width: 400, height: 200, padding: 10}} zDepth={1}>
                        <SelectField floatingLabelText="Plese select template"
                                     value={this.state.selectedTemplateName}
                                     onChange={this.handleSelectedTemplate}>
                            {
                                Object.keys(this.props.templateList).map(templateName => {
                                    return (
                                        <MenuItem key={templateName} value={templateName}
                                                  primaryText={templateName}/>
                                    )
                                })
                            }
                        </SelectField><br/><br/><br/>
                        <RaisedButton
                            labelStyle={{fontWeight: "bold"}}
                            labelColor="#FFFFFF"
                            backgroundColor="#00adcc"
                            label="UPLOAD EXCEL FILE"
                            labelPosition="before"
                            containerElement="label">
                            <input id="excelFileInput"
                                   type="file"
                                   accept=".xls,.xlsx"
                                   onChange={this.handleUploadFile}
                                   style={{
                                       cursor: 'pointer',
                                       position: 'absolute',
                                       top: 0,
                                       bottom: 0,
                                       right: 0,
                                       left: 0,
                                       width: '100%',
                                       opacity: 0,
                                   }}/>
                        </RaisedButton>
                    </Paper>
                </div>
                <div style={{float: "left"}}>
                    <Paper style={{width: 900, height: 200, padding: 10}} zDepth={1}>
                        <table className="excelFileInfo">
                            <tbody>
                            <tr>
                                <td><span className="infoTitle">File name:</span> {this.state.excelFile.name}</td>
                                <td><span className="infoTitle">File size:</span> {this.state.excelFile.size}</td>
                                <td><span
                                    className="infoTitle">Number of sheets:</span> {this.state.excelFile.noOfSheets}
                                </td>
                                <td><span
                                    className="infoTitle">Starting row number:</span> {this.state.excelFile.startingRow}
                                </td>
                            </tr>
                            <tr>
                                <td><span
                                    className="infoTitle">Org unit address:</span> {this.state.selectedTemplate.orgUnitAddress}
                                </td>
                                <td><span
                                    className="infoTitle">Period address:</span> {this.state.selectedTemplate.periodAddress}
                                </td>
                                <td><span
                                    className="infoTitle">Event date address:</span> {this.state.selectedTemplate.eventDateAddress}
                                </td>
                                <td><span
                                    className="infoTitle">Sheet to import:</span> {this.state.selectedTemplate.sheetNo}
                                </td>
                            </tr>
                            <tr>
                                <td><RaisedButton
                                    labelStyle={{fontWeight: "bold"}}
                                    labelColor="#FFFFFF"
                                    backgroundColor="#00cc44"
                                    label="START IMPORT"
                                    labelPosition="before"
                                    icon={<ImportIcon />}
                                    onClick={this.handleImportExcel}>
                                </RaisedButton></td>
                            </tr>
                            </tbody>
                        </table>
                    </Paper>
                </div>
                <div style={{clear: "left", float: "left"}}>
                    <Paper style={{width: 400, padding: 10, height: 250}} zDepth={1}>
                        <ImportSummary summary={this.state.importSummary} time={this.state.importTime}/>
                    </Paper>
                </div>
                <div style={{float: "left", marginLeft: 10}}>
                    <Paper style={{width: 900, padding: 10, minHeight: 250}} zDepth={1}>
                        <ImportError summary={this.state.importSummary}/>
                    </Paper>
                </div>
            </div>
        );
    }
}
