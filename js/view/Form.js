import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Fetch from '../model/Fetch.js';
const fetch = new Fetch();

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: "hide",
            domainType: "",
            categoryComboList: [],
            dataElementList: [],
            currentSelectedAvailableDataElement: [],
            currentSelectedSelectedAvailableDataElement: [],
            filteredDataElementList: [],
            selectedDataElementList: [],
            templateName: "",
            mapping: {
                orgUnitContainer: "",
                orgUnitMappingBy: "",
                orgUnitAddress: "",
                periodContainer: "",
                periodAddress: "",
                deContainer: "",
                deMapping: {},
                sheetNo: "",
            }
        };

        fetch.getCategoryOptionCombinationList()
            .then(json => {
                this.setState({
                    categoryComboList: json
                });
            });
    }

    generateDataElementList = json => {
        let dataElements = [];
        json.forEach(de => {
            this.state.categoryComboList.forEach(cc => {
                if (cc.id === de.categoryCombo.id) {
                    if (cc.isDefault === false) {
                        cc.categoryOptionCombos.forEach(coc => {
                            dataElements.push({
                                key: de.id + "-" + coc.id,
                                dataElement: de.id,
                                categoryOptionCombo: coc.id,
                                name: de.name + " " + coc.name
                            });
                        });
                    } else {
                        dataElements.push({
                            key: de.id + "-" + cc.categoryOptionCombos[0].id,
                            dataElement: de.id,
                            categoryOptionCombo: cc.categoryOptionCombos[0].id,
                            name: de.name
                        });
                    }
                }
            });
        });
        return dataElements;
    };

    handleDomainType = (event, index, value) => {
        this.setState({
            loading: "loading",
            domainType: value,
            dataElementList: [],
            currentSelectedAvailableDataElement: [],
            filteredDataElementList: [],
            selectedDataElementList: []
        });

        if (value === "aggregate") {
            fetch.getDataSetDataElementList()
                .then(json => {
                    this.setState({
                        loading: "hide",
                        dataElementList: this.generateDataElementList(json),
                        filteredDataElementList: this.generateDataElementList(json)
                    });
                });
        } else if (value === "event") {
            fetch.getProgramDataElementList()
                .then(json => {
                    this.setState({
                        loading: "hide",
                        dataElementList: this.generateDataElementList(json),
                        filteredDataElementList: this.generateDataElementList(json)
                    });
                });
        } else {
            fetch.getDataELementList()
                .then(json => {
                    this.setState({
                        loading: "hide",
                        dataElementList: this.generateDataElementList(json),
                        filteredDataElementList: this.generateDataElementList(json)
                    });
                });
        }
    };

    handleFilter = (event, value) => {
        if (value === "") {
            this.setState({
                filteredDataElementList: JSON.parse(JSON.stringify(this.state.dataElementList))
            });
        }
        else {
            let filteredDataElements = [];
            this.state.dataElementList.forEach(de => {
                if (de.name.toLowerCase().includes(value.toLowerCase())) {
                    filteredDataElements.push(de);
                }
            });
            this.setState({
                filteredDataElementList: filteredDataElements
            });
        }
    };

    handleAvailableDataElement = (event) => {
        let currentSelectedDataElement = [];
        [].slice.call(event.target.selectedOptions).forEach(option => {
            this.state.filteredDataElementList.forEach(de => {
                if (option.value === `${de.dataElement}-${de.categoryOptionCombo}`) {
                    currentSelectedDataElement.push(de);
                }
            });
        });
        this.setState({
            currentSelectedAvailableDataElement: currentSelectedDataElement
        });
    };

    handleSelectedDataElement = (event) => {
        let currentSelectedDataElement = [];
        [].slice.call(event.target.selectedOptions).forEach(option => {
            this.state.selectedDataElementList.forEach(de => {
                if (option.value === `${de.dataElement}-${de.categoryOptionCombo}`) {
                    currentSelectedDataElement.push(de);
                }
            })
        });
        this.setState({
            currentSelectedSelectedAvailableDataElement: currentSelectedDataElement
        });
    };

    handleAdd = () => {
        let availableDataElements = this.state.dataElementList.slice(0);
        let filteredDataElements = this.state.filteredDataElementList.slice(0);
        let selectedDataElements = this.state.selectedDataElementList.slice(0);
        let object = this.state.mapping;
        this.state.currentSelectedAvailableDataElement.forEach(de => {
            object.deMapping[de.key] = "";
            availableDataElements.forEach((availableDE, availableDEIndex) => {
                if (availableDE.key === de.key) {
                    availableDataElements.splice(availableDEIndex, 1);
                }
            });
            filteredDataElements.forEach((filteredDE, filteredDEIndex) => {
                if (filteredDE.key === de.key) {
                    filteredDataElements.splice(filteredDEIndex, 1);
                }
            });
            selectedDataElements.push(de);
        });

        this.setState({
            dataElementList: availableDataElements,
            currentSelectedAvailableDataElement: [],
            filteredDataElementList: filteredDataElements,
            selectedDataElementList: selectedDataElements,
            mapping: object
        });
        console.log(this.state);
    };

    handleRemove = () => {
        let availableDataElements = this.state.dataElementList.slice(0);
        let filteredDataElements = this.state.filteredDataElementList.slice(0);
        let selectedDataElements = this.state.selectedDataElementList.slice(0);
        this.state.currentSelectedSelectedAvailableDataElement.forEach(selectedDE => {
            selectedDataElements.forEach((de, index) => {
                if (de.key === selectedDE.key) {
                    availableDataElements.push(de);
                    filteredDataElements.push(de);
                    selectedDataElements.splice(index, 1);
                }
            });
        });

        this.setState({
            dataElementList: availableDataElements,
            currentSelectedSelectedAvailableDataElement: [],
            filteredDataElementList: filteredDataElements,
            selectedDataElementList: selectedDataElements
        });
    };

    handleDataElementMapping = (event, value) => {
        let address = value.toUpperCase();
        let property = event.target.id;
        let object = this.state.mapping;
        object.deMapping[property] = address;
        this.setState({
            mapping: object
        });
    };

    handleTextConfigChange = (event, value) => {
        let property = event.target.getAttribute("property");
        let val = value.toUpperCase();
        let object = this.state.mapping;
        object[property] = val;
        this.setState({
            mapping: object
        });
    };

    handleSelectConfigChange = (event, key, value) => {
        let property = value.split("-")[0];
        let val = value.split("-")[1];
        let object = this.state.mapping;
        object[property] = val;
        this.setState({
            mapping: object
        });
    };

    handleTemplateName = (event, value) => {
        this.setState({
            templateName: value
        });
    };

    handleSaveTemplate = () => {
        fetch.getTemplates()
            .then(templates => {
                let object = JSON.parse(templates);
                object[this.state.templateName] = this.state.mapping;
                fetch.saveTemplate(object);
            });
    };

    render() {
        return (
            <div>
                <div>
                    <SelectField floatingLabelText="Please select domain type" value={this.state.domainType}
                                 onChange={this.handleDomainType}>
                        <MenuItem value="aggregate" primaryText="Aggregate"/>
                        <MenuItem value="event" primaryText="Event"/>
                        <MenuItem value="aggregate-event" primaryText="Both Aggregate and Event"/>
                    </SelectField>
                    <RefreshIndicator size={40} left={20} top={0}
                                      style={{position: "relative", display: "inline-block"}}
                                      status={this.state.loading}/>
                </div>
                <div>
                    <TextField floatingLabelText="Search by name ..." onChange={this.handleFilter}/>
                </div>
                <br/>
                Data elements list:
                <div className="dataElementTableContainer">
                    <div className="availableDataElementContainer">
                        <select multiple id="availableDataElement" onChange={this.handleAvailableDataElement}>
                            {this.state.filteredDataElementList.map(de => <option key={de.key}
                                                                                  value={de.dataElement + "-" + de.categoryOptionCombo}>{de.name}</option>)}
                        </select>
                    </div>
                    <div className="selectDataElementButtonContainer">
                        <RaisedButton onClick={this.handleAdd} backgroundColor="#a4c639"
                                      icon={<ContentAdd color={fullWhite}/>}/><br/><br/>
                        <RaisedButton onClick={this.handleRemove} backgroundColor="#a4c639"
                                      icon={<ContentRemove color={fullWhite}/>}/>
                    </div>
                    <div className="selectedDataElementContainer">
                        <select multiple id="selectedDataElement" onChange={this.handleSelectedDataElement}>
                            {this.state.selectedDataElementList.map(de => <option key={de.key}
                                                                                  value={de.dataElement + "-" + de.categoryOptionCombo}>{de.name}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <SelectField floatingLabelText="Organisation Unit container"
                                             onChange={this.handleSelectConfigChange}
                                             className="mappingSelector"
                                             value={`${Object.keys(this.state.mapping)[0]}-${this.state.mapping.orgUnitContainer}`}>
                                    <MenuItem value="orgUnitContainer-column" primaryText="Column"/>
                                    <MenuItem value="orgUnitContainer-cell" primaryText="Cell"/>
                                </SelectField>
                            </td>
                            <td style={{paddingLeft: 20, paddingRight: 20}}>&rarr;</td>
                            <td>
                                <TextField
                                    inputStyle={{textTransform: "uppercase"}}
                                    property="orgUnitAddress"
                                    hintText="Example: A1, B, C, D4"
                                    floatingLabelText="Cell address or column name"
                                    floatingLabelFixed={true}
                                    onChange={this.handleTextConfigChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <SelectField floatingLabelText="Organisation Unit mapping by"
                                             onChange={this.handleSelectConfigChange}
                                             className="mappingSelector"
                                             value={`${Object.keys(this.state.mapping)[1]}-${this.state.mapping.orgUnitMappingBy}`}>
                                    <MenuItem value="orgUnitMappingBy-code" primaryText="Org Unit code"/>
                                    <MenuItem value="orgUnitMappingBy-id" primaryText="UID"/>
                                </SelectField>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <SelectField floatingLabelText="Period container"
                                             onChange={this.handleSelectConfigChange}
                                             className="mappingSelector"
                                             value={`${Object.keys(this.state.mapping)[3]}-${this.state.mapping.periodContainer}`}>
                                    <MenuItem value="periodContainer-column" primaryText="Column"/>
                                    <MenuItem value="periodContainer-cell" primaryText="Cell"/>
                                </SelectField>
                            </td>
                            <td style={{paddingLeft: 20, paddingRight: 20}}>&rarr;</td>
                            <td>
                                <TextField
                                    inputStyle={{textTransform: "uppercase"}}
                                    property="periodAddress"
                                    hintText="A1, B, C, D4"
                                    floatingLabelText="Cell address or column name"
                                    floatingLabelFixed={true}
                                    onChange={this.handleTextConfigChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <SelectField floatingLabelText="Read data elements by"
                                             onChange={this.handleSelectConfigChange}
                                             className="mappingSelector"
                                             value={`${Object.keys(this.state.mapping)[5]}-${this.state.mapping.deContainer}`}>
                                    <MenuItem value="deContainer-column" primaryText="Column"/>
                                    <MenuItem value="deContainer-cell" primaryText="Cell"/>
                                </SelectField>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    {
                        this.state.selectedDataElementList.map(de => {
                            return (
                                <div key={de.key}>
                                    <TextField
                                        style={{width: 800}}
                                        inputStyle={{color: "black"}}
                                        value={de.name}
                                        disabled={true}
                                        floatingLabelText="Data Element name"
                                    />
                                    <span style={{marginLeft: 20, marginRight: 20, fontSize: 20}}>&rarr;</span>
                                    <TextField
                                        id={de.key}
                                        inputStyle={{textTransform: "uppercase"}}
                                        hintText="Example: A1, B, C, D4"
                                        floatingLabelText="Cell address or column name"
                                        floatingLabelFixed={true}
                                        onChange={this.handleDataElementMapping}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <TextField
                        property="sheetNo"
                        floatingLabelText="Sheet number"
                        floatingLabelFixed={true}
                        onChange={this.handleTextConfigChange}
                    /><br/>
                    <TextField
                        property="templateName"
                        floatingLabelText="Template name"
                        floatingLabelFixed={true}
                        onChange={this.handleTemplateName}
                    />
                </div>
                <div>
                    <RaisedButton
                        onClick={this.handleSaveTemplate}
                        label="Save template"
                        labelPosition="before"
                    />
                </div>
            </div>
        );
    }
}