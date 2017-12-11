import React, {Component} from 'react'
import PropTypes from 'prop-types'

import PathItem from './PathItem'

export default class DiskBrowserPath extends Component {
    static propTypes = {
        diskPath: PropTypes.string.isRequired,
        changeFolderHandler: PropTypes.func
    }

    render() {
        let {diskPath} = this.props

        if (diskPath === '') {
            return (
                <ol className="breadcrumb browser-path">
                    <PathItem key="Диск" itemPath="/" folderName="Диск" isActive={true} />
                </ol>
            )
        } else {
            let foldersList = []
            diskPath = diskPath.split('/')
            diskPath = diskPath.filter(function(e){ return e.replace(/(\r\n|\n|\r)/gm,"")});

            foldersList.push({
                folderName: 'Диск',
                folderPath: '',
                isActive: false
            })

            for (let i = 0; i < diskPath.length; i++) {
                let folderPath = diskPath.slice(0, i + 1).join('/')
                foldersList.push({
                    folderName: diskPath[i],
                    folderPath: folderPath,
                    isActive: false
                })
            }

            foldersList[foldersList.length - 1].isActive = true

            return (
                <ol className="breadcrumb browser-path">
                    {foldersList.map((folder) =>
                        <PathItem key={folder.folderPath} itemPath={folder.folderPath} folderName={folder.folderName} isActive={folder.isActive} changeFolderHandler={this.props.changeFolderHandler}/>
                    )}
                </ol>
            )
        }

    }

}