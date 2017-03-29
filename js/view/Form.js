import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import TextField from 'material-ui/TextField';
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
            filteredDataElementList: [],
            selectedDataElementList: []
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
                            key: de.id + cc.categoryOptionCombos[0].id,
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
            domainType: value
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
        } else {
            fetch.getProgramDataElementList()
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
            console.log(filteredDataElements);
            this.setState({
                filteredDataElementList: filteredDataElements
            });
        }
    };

    handleClick = event => {
        console.log(event.target.selectedOptions);
    };

    render() {
        return (
            <div>
                <div>
                    <SelectField floatingLabelText="Please select domain type" value={this.state.domainType}
                                 onChange={this.handleDomainType}>
                        <MenuItem value="aggregate" primaryText="Aggregate"/>
                        <MenuItem value="event" primaryText="Event"/>
                    </SelectField>
                    <RefreshIndicator size={40} left={20} top={0}
                                      style={{position: "relative", display: "inline-block"}}
                                      status={this.state.loading}/>
                </div>
                <div>
                    <TextField floatingLabelText="Search by name ..." onChange={this.handleFilter}/>
                </div>
                <div className="dataElementTableContainer">
                    <select multiple id="availableDataElement" onChange={this.handleClick}>
                        {this.state.filteredDataElementList.map(de => <option key={de.key} value={de.dataElement + "-" + de.categoryOptionCombo}>{de.name}</option>)}
                    </select>
                    <select multiple id="selectedDataElement">

                    </select>
                </div>
            </div>
        );
    }
}