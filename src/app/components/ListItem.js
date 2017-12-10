import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class ListItem extends Component {
    static propTypes = {
        itemType: PropTypes.string.isRequired,
        itemName: PropTypes.string.isRequired,
        itemPath: PropTypes.string
    }

    static defaultProps = {
        itemType: "file",
        itemName: "emptyfileName",
        itemPath: "emptyPath"
    }

    render() {
        return (
            <div className="list-item">
                <span className={'item-icon ' + (this.props.itemType === 'dir' ? 'ion-ios-folder' : 'ion-document')}></span>
                <div className="item-name">
                    {this.props.itemName}
                </div>
                <div className="item-controls">
                    {this.props.itemType !== 'dir' ? <span className="control-icon ion-ios-cloud-download"></span> : ''}
                    <span className="control-icon ion-trash-a"></span>
                </div>
            </div>
        )
    }

}