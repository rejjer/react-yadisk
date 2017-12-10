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
        }))
    }

    render() {
        return (
            <div className="browser-list">
                {this.props.resourceList.map(item =>
                    <ListItem key={item.resource_id} itemType={item.type} itemName={item.name} itemPath={item.path}/>
                )}
            </div>
        )
    }

}