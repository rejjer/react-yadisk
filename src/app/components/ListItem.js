import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default class ListItem extends Component {
    static propTypes = {
        itemType: PropTypes.string.isRequired,
        itemName: PropTypes.string.isRequired,
        itemPath: PropTypes.string,
        downloadFile: PropTypes.func,
        changeFolder: PropTypes.func
    }

    static defaultProps = {
        itemType: "file",
        itemName: "emptyfileName",
        itemPath: "emptyPath"
    }

    render() {
        if (this.props.itemType === 'dir') {
            return (
                <a href={'#/' + this.props.itemPath.replace(':', '') + '/'} onClick={this.folderClick}>
                    <div className="list-item">
                        <span className="item-icon ion-ios-folder"></span>
                        <div className="item-name">
                            {this.props.itemName}
                        </div>
                        <div className="item-controls">
                            <span className="control-icon ion-archive" onClick={this.downloadFileClick}></span>
                            <span className="control-icon ion-trash-a"></span>
                        </div>
                    </div>
                </a>
            )
        } else {
            return (
                <div className="list-item">
                    <span className="item-icon ion-document"></span>
                    <div className="item-name">
                        {this.props.itemName}
                    </div>
                    <div className="item-controls">
                        <span className="control-icon ion-ios-cloud-download" onClick={this.downloadFileClick}></span>
                        <span className="control-icon ion-trash-a"></span>
                    </div>
                </div>
            )
        }
    }

    downloadFileClick = () => {
        this.props.downloadFile(this.props.itemPath)
    }

    folderClick = () => {
        this.props.changeFolder(this.props.itemPath.replace('disk:', ''))
    }

}