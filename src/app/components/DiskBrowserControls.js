import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DiskBrowserConrols extends Component {
    static propTypes = {
        logOut: PropTypes.func.isRequired,
        userLogin: PropTypes.string
    }

    render() {
        return (
            <div className="navbar navbar-default browser-controls">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-left">
                        <li><button type="button" className="btn btn-default navbar-btn">Новая папка</button></li>
                        <li><button type="button" className="btn btn-default navbar-btn">Загрузить файл</button></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><button type="button" className="btn btn-default navbar-btn" onClick={this.props.logOut}>Выход ({this.props.userLogin})</button></li>
                    </ul>
                </div>
            </div>
        )
    }

}