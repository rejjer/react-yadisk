import React, {Component} from 'react'
import PropTypes from 'prop-types'

import AddFolderModal from './AddFolderModal'

export default class DiskBrowserConrols extends Component {
    static propTypes = {
        logOut: PropTypes.func.isRequired,
        addFolderHandler: PropTypes.func.isRequired,
        userLogin: PropTypes.string
    }

    constructor() {
        super()

        this.state = {
            addFolderModalShow: false
        }
    }

    render() {
        return (
            <div className="navbar navbar-default browser-controls">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-left">
                        <li><button type="button" className="btn btn-default navbar-btn" onClick={this.showAddFolderModal}>Новая папка</button></li>
                        <li><button type="button" className="btn btn-default navbar-btn" disabled="disabled">Загрузить файл</button></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><button type="button" className="btn btn-default navbar-btn" onClick={this.props.logOut}>Выход ({this.props.userLogin})</button></li>
                    </ul>
                </div>
                <AddFolderModal isOpen={this.state.addFolderModalShow} toggleModal={this.toggleModalHandler} addFolderHandler={this.addFolderHandler} />
            </div>
        )
    }

    showAddFolderModal = () => {
        this.toggleModalHandler(true)
    }

    toggleModalHandler = (status) => {
        this.setState({
            addFolderModalShow: status
        })
    }

    addFolderHandler = (folderName) => {
        this.toggleModalHandler(false)
        this.props.addFolderHandler(folderName)
    }

}