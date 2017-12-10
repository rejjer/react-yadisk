import React from 'react'
import {render} from 'react-dom'

import Header from './components/Header'
import DiskBrowser from './components/DiskBrowser'

function App() {
    return (
    <main>
        <Header />
        <div className="page-header" />
        <DiskBrowser />
    </main>
    );
}

render (<App />, document.getElementById('app'))