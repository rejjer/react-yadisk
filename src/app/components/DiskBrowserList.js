import React, {Component} from 'react'
import PropTypes from 'prop-types'

import ListItem from './ListItem'

export default class DiskBrowserList extends Component {
    static propTypes = {
        resourceList: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            resource_id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired
        })),
        downloadFileHandler: PropTypes.func,
        deleteResourceHandler: PropTypes.func,
        changeFolderHandler: PropTypes.func
    }

    render() {
        return (
            <div className={'browser-list' + (this.props.resourceList.length === 0 ? ' empty' : '' )}>
                {this.props.resourceList.map(item =>
                    <ListItem key={item.resource_id} itemType={item.type} itemName={item.name} itemPath={item.path} downloadFile={this.props.downloadFileHandler} deleteResource={this.props.deleteResourceHandler} changeFolder={this.props.changeFolderHandler}/>
                )}
            </div>
        )
    }

}