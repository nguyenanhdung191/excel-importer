import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainTab from "./view/MainTab"

import injectTapEventPlugin from 'react-tap-event-plugin';



injectTapEventPlugin();



const App = () => (
    <MuiThemeProvider>
        <MainTab/>
    </MuiThemeProvider>
);

const app = document.getElementById("app");

ReactDOM.render(<App />, app);
