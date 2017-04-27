import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Form from './Form';
import Import from './Import';
import Fetch from "../model/Fetch";

const fetch = new Fetch();

export default class Maintab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateList: {}
        };

        fetch.getTemplates()
            .then(templates => {
                this.setState({
                    templateList: JSON.parse(templates)
                });
            });
    }

    handleImportTab = (tab) => {
        fetch.getTemplates()
            .then(templates => {
                this.setState({
                    templateList: JSON.parse(templates)
                });
            });
    };


    render() {
        return (
            <Tabs tabItemContainerStyle={{backgroundColor: "#e4e4e4"}}
                  inkBarStyle={{backgroundColor: "orange", height: 2}}>
                <Tab label="IMPORT" style={{color: "#666666"}}
                     onActive={this.handleImportTab}>
                    <Import templateList={this.state.templateList}/>
                </Tab>
                <Tab label="CREATE NEW TEMPLATE" style={{color: "#666666"}}>
                    <Form/>
                </Tab>
                <Tab label="REMOVE OR EDIT TEMPLATE" style={{color: "#666666"}}/>
                <Tab label="HOW TO USE" style={{color: "#666666"}}/>
                <Tab label="ABOUT" style={{color: "#666666"}}/>

            </Tabs>
        );
    }
}

