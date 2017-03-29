import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from "./view/Form";

import injectTapEventPlugin from 'react-tap-event-plugin';



injectTapEventPlugin();



const App = () => (
    <MuiThemeProvider>
        <Form/>
    </MuiThemeProvider>
);

const app = document.getElementById("app");

ReactDOM.render(<App />, app);
