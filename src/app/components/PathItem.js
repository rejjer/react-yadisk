import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class PathItem extends Component {
    static propTypes = {
        itemPath: PropTypes.string.isRequired,
        folderName: PropTypes.string.isRequired,
        isActive: PropTypes.bool,
        changeFolderHandler: PropTypes.func
    }

    render() {
        let {itemPath, folderName, isActive} = this.props

        if (isActive) {
            return (
                <li className="active">{folderName}</li>
            )
        } else {
            return (
                <li><a href={'#/disk/' + itemPath} onClick={this.folderClick}>{folderName}</a></li>
            )
        }

    }

    folderClick = () => {
        this.props.changeFolderHandler(this.props.itemPath)
    }

}