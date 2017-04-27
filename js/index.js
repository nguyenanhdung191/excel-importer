import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainTab from "./view/MainTab"
import injectTapEventPlugin from 'react-tap-event-plugin';
import initHeaderBar from 'd2-ui/lib/app-header';


injectTapEventPlugin();

initHeaderBar(document.getElementById('header-bar'), "https://hispvn.org/gdpm/api")
    .catch(err => {
        console.warn(err);
    });


const App = () => (
    <MuiThemeProvider>
        <MainTab/>
    </MuiThemeProvider>
);

const app = document.getElementById("app");

ReactDOM.render(<App />, app);
