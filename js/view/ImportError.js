import React from 'react';
import {List, ListItem} from 'material-ui/List';


export default class ImportError extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        let conflicts = [];
        if (this.props.summary.hasOwnProperty("response")) {
            this.props.summary.response.importSummaries.forEach(is => {
                if (is.hasOwnProperty("conflicts")) {
                    is.conflicts.forEach(c => {
                        conflicts.push(`${c.value} : ${c.object}`);
                    });
                } else if (is.hasOwnProperty("description")) {
                    conflicts.push(is.description);
                }
            });
        } else if (this.props.summary.hasOwnProperty("conflicts")) {
            this.props.summary.conflicts.forEach(c => {
                conflicts.push(`${c.value} : ${c.object}`);
            });
        }
        return (
            <div>
                <div className="importErrorTitle">IMPORT ERROR</div>
                <List style={{width: 880}}>
                    {
                        conflicts.map((c, index) => {
                            return <ListItem key={index} primaryText={c}/>
                        })
                    }
                </List>
            </div>
        );
    }
}
