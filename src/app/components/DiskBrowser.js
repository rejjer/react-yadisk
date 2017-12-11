import React, {Component} from 'react'
import cookie from 'react-cookies'
import {Redirect} from 'react-router-dom';

import {diskApi} from '../api/YandexDiskApi'
import DiskBrowserControls from './DiskBrowserControls'
import DiskBrowserPath from './DiskBrowserPath'
import DiskBrowserList from './DiskBrowserList'

export default class DiskBrowser extends Component {
    constructor() {
        super()

        this.state = {
            appStatus: '',
            accessToken: '',
            userLogin: '',
            resourceList: [],
            diskPath: '',
            response: {}
        }
    }

    componentWillMount() {
        let appStatus = 'loading'
        let accessToken = cookie.load('accessToken') || ''
        let userLogin = cookie.load('userLogin') || ''
        let diskPath = ''
        const urlParams = this.props.match.params[0]

        if (urlParams !=='' && urlParams !=='/') {
            diskPath = urlParams
        }

        if (accessToken === '') {
            appStatus = 'logout'
        } else {
            diskApi.setAuthHeader(accessToken)
            this.getUserLogin()
            this.getResourceList(diskPath)
        }

        this.setState({
            appStatus: appStatus,
            accessToken: accessToken,
            userLogin: userLogin,
            diskPath: diskPath,
            response: {}
        })
    }

    render() {
        const {appStatus, accessToken} = this.state

        if (this.state.appStatus === 'logout') {
            return <Redirect to='/'/>
        }

        switch (appStatus) {
            case 'loading': return this.showDiskBrowser('loading')
            case 'loaded': return this.showDiskBrowser()
            default: return <Redirect to='/'/>
        }
    }

    showDiskBrowser(loadingStatus) {
        const response = this.state.response

        return (
            <div className="container">
                <div className={'disk-browser' + (loadingStatus === 'loading' ? ' loading' : '')}>
                    <DiskBrowserControls logOut={this.logOut} userLogin={this.state.userLogin} addFolderHandler={this.addFolder} />
                    <DiskBrowserPath diskPath={this.state.diskPath} changeFolderHandler={this.getResourceList}/>
                    <DiskBrowserList resourceList={this.state.resourceList} downloadFileHandler={this.downloadFile} deleteResourceHandler={this.deleteResource} changeFolderHandler={this.getResourceList}/>
                </div>
            </div>
        );
    }

    logOut = () => {
        this.setState({
            appStatus: 'logout',
            accessToken: '',
            userLogin: ''
        })
        cookie.remove('accessToken')
        cookie.remove('userLogin')
    }


    getResourceList = (path) => {
        this.setState({
            appStatus: 'loading',
        })
        diskApi.getResourceList(path)
            .then(response => {
                if (response.data._embedded.items) {
                    this.setState({
                        appStatus: 'loaded',
                        resourceList: response.data._embedded.items,
                        diskPath: path
                    })
                }
            })
            .catch(response => {
                this.setState({
                    appStatus: 'error',
                    response: response
                })
            })
    }

    deleteResource = (path) => {
        this.setState({
            appStatus: 'loading',
        })
        diskApi.deleteResource(path)
            .then(response => {
                this.getResourceList(this.state.diskPath)
            })
            .catch(this.setState({appStatus: 'loaded'}))
    }

    addFolder = (folder) => {
        let path = this.state.diskPath
        if (path) {
            if (path[path.length - 1] === '/') {
                path = path + folder
            } else {
                path = path + '/' + folder
            }
        } else {
            path = '/' + folder
        }
        this.setState({
            appStatus: 'loading',
        })
        diskApi.addFolder(path, this.state.accessToken)
            .then(response => {
                console.log(response)
                this.getResourceList(this.state.diskPath)
            })
            .catch(this.setState({appStatus: 'loaded'}))
    }

    getUserLogin() {
        diskApi.getUserLogin()
            .then(response => {
                if (response.data.user.login) {
                    cookie.save('userLogin', response.data.user.login)
                    this.setState({
                        userLogin: response.data.user.login
                    })
                }
            })
    }

    downloadFile(path) {
        diskApi.getDownloadUrl(path)
            .then(response => {
                if (response.data.href) {
                    window.location = response.data.href
                }
            })
    }
}