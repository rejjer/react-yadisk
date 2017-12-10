import React, {Component} from 'react'

export default class DiskBrowserConrols extends Component {

    render() {
        return (
            <div className="navbar navbar-default browser-controls">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-left">
                        <li><button type="button" className="btn btn-default navbar-btn">Новая папка</button></li>
                        <li><button type="button" className="btn btn-default navbar-btn">Загрузить файл</button></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><button type="button" className="btn btn-default navbar-btn">Выход (userName)</button></li>
                    </ul>
                </div>
            </div>
        )
    }

}