import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from "material-ui/Avatar";
import Import from "material-ui/svg-icons/action/input";
import Update from "material-ui/svg-icons/action/cached";
import Ignore from "material-ui/svg-icons/alert/warning";
import {green500, lightBlue800, yellow800} from 'material-ui/styles/colors';
import moment from 'moment';


export default class ImportSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        let imported = "";
        let ignored = "";
        let updated = "";
        if (this.props.summary.hasOwnProperty("response")) {
            imported = this.props.summary.response.imported;
            ignored = this.props.summary.response.ignored;
            updated = this.props.summary.response.updated;
        }
        else {
            imported = this.props.summary.importCount.imported;
            ignored = this.props.summary.importCount.ignored;
            updated = this.props.summary.importCount.updated;
        }
        return (
            <div>
                <div className="importSummaryTitle">IMPORT SUMMARY</div>
                <span>{this.props.time}</span>
                <List style={{width: 380}}>
                    <ListItem leftAvatar={<Avatar icon={<Import />} backgroundColor={green500}/>}
                              primaryText={`Imported: ${imported}`}/>
                    <ListItem leftAvatar={<Avatar icon={<Update />} backgroundColor={lightBlue800}/>}
                              primaryText={`Updated: ${updated}`}/>
                    <ListItem leftAvatar={<Avatar icon={<Ignore />} backgroundColor={yellow800}/>}
                              primaryText={`Ignored: ${ignored}`}/>
                </List>
            </div>
        );
    }
}
