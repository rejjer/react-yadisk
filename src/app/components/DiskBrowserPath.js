import React, {Component} from 'react'

export default class DiskBrowserPath extends Component {

    render() {
        return (
            <ol className="breadcrumb browser-path">
                <li><a href="#">Диск</a></li>
                <li><a href="#">Папка 1</a></li>
                <li className="active">Папка 2</li>
            </ol>
        )
    }

}