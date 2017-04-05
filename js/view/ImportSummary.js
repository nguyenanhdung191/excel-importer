import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from "material-ui/Avatar";
import Import from "material-ui/svg-icons/action/input";
import Update from "material-ui/svg-icons/action/cached";
import Ignore from "material-ui/svg-icons/alert/warning";
import {green500, lightBlue800, yellow800} from 'material-ui/styles/colors';


export default class ImportSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div>
                <div className="importSummaryTitle">IMPORT SUMMARY</div>
                <List style={{width: 400}}>
                    <ListItem leftAvatar={<Avatar icon={<Import />} backgroundColor={green500}/>}
                              primaryText="Imported"/>
                    <ListItem leftAvatar={<Avatar icon={<Update />} backgroundColor={lightBlue800}/>}
                              primaryText="Updated"/>
                    <ListItem leftAvatar={<Avatar icon={<Ignore />} backgroundColor={yellow800}/>}
                              primaryText="Ignored"/>
                </List>
            </div>
        );
    }
}
