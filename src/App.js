import './App.css';
import React from 'react';
import {ConfigProvider, theme} from "antd";
import frFR from 'antd/locale/fr_FR';
import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import Store, {persistor} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react';
import AppHome from "./appHome";

function App() {
    return (
        <ConfigProvider theme={{algorithm: theme.defaultAlgorithm}}
                        direction="ltr" locale={frFR}>
            <Provider store={Store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <div className="App">
                            <AppHome/>
                        </div>
                    </Router>
                </PersistGate>
            </Provider>
        </ConfigProvider>);
}

export default App;
