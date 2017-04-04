import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import CreateNew from 'material-ui/svg-icons/content/add-circle';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import ImportExcel from 'material-ui/svg-icons/file/cloud-upload';
import Instruction from 'material-ui/svg-icons/maps/directions';
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
            <Tabs tabItemContainerStyle={{backgroundColor: "#00cc44", height: 65, fontWeight: "bold"}}
                  inkBarStyle={{backgroundColor: "red", height: 2}}>
                <Tab icon={<ImportExcel />} label="IMPORT" style={{fontWeight: "bold"}} onActive={this.handleImportTab}>
                    <div className="content">
                        <Import templateList={this.state.templateList}/>
                    </div>
                </Tab>
                <Tab icon={<CreateNew/>} label="CREATE NEW TEMPLATE" style={{fontWeight: "bold"}}>
                    <div className="content">
                        <Form/>
                    </div>
                </Tab>
                <Tab
                    icon={<Edit />}
                    label="REMOVE OR EDIT TEMPLATE"
                    style={{fontWeight: "bold"}}
                />
                <Tab
                    icon={<Instruction />}
                    label="HOW TO USE"
                    style={{fontWeight: "bold"}}
                />
            </Tabs>
        );
    }
}

