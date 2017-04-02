import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Fetch from "../model/Fetch";
const fetch = new Fetch();
export default class Import extends React.Component {

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


    render() {
        return (
            <SelectField floatingLabelText="Plese select template">
                {
                    Object.keys(this.state.templateList).map(templateName => {
                        return (
                            <MenuItem key={templateName} value="a" primaryText={templateName}/>
                        )
                    })
                }
            </SelectField>
        );
    }
}
