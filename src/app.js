import React from 'react'
import {render} from 'react-dom'
import Header from './components/Header'
import Content from './components/Content'

function App() {
    return (
    <main>
        <Header />
        <div className="page-header" />
        <Content />
    </main>
    );
}

render (<App />, document.getElementById('app'))