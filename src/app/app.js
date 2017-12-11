import React from 'react'
import {render} from 'react-dom'
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';

import Header from './components/Header'
import DiskBrowser from './components/DiskBrowser'
import Auth from "./components/Auth";

function App() {
    return (
    <main>
        <Header />
        <div className="page-header" />
        <Switch>
            <Route exact path="/" component={Auth}/>
            <Route exact path="/auth:yandexOAuth" component={Auth}/>
            <Route exact path="/disk*" component={DiskBrowser}/>
        </Switch>
    </main>
    );
}

render ((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById('app'))