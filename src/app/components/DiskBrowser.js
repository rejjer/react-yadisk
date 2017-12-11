import React, {Component} from 'react'
import cookie from 'react-cookies'
import {Redirect} from 'react-router-dom';

import {config} from '../config'
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
            response: {}
        }
    }

    componentWillMount() {
        let appStatus = 'loading'
        let accessToken = cookie.load('accessToken') || ''
        let userLogin = cookie.load('userLogin') || ''

        if (accessToken === '') {
            appStatus = 'logout'
        } else {
            diskApi.setAuthHeader(accessToken)
            this.getUserLogin()
            this.getResourceList()
        }

        this.setState({
            appStatus: appStatus,
            accessToken: accessToken,
            userLogin: userLogin,
            response: {}
        })
    }

    render() {
        const {appStatus, accessToken} = this.state

        if (this.state.appStatus === 'logout') {
            return <Redirect to='/auth'/>
        }

        switch (appStatus) {
            case 'loading': return this.showDiskBrowser('loading')
            case 'loaded': return this.showDiskBrowser()
            default: return <Redirect to='/auth'/>
        }
    }

    showDiskBrowser(loadingStatus) {
        const response = this.state.response

        return (
            <div className="container">
                <div className={'disk-browser' + (loadingStatus === 'loading' ? ' loading' : '')}>
                    <DiskBrowserControls logOut={this.logOut} userLogin={this.state.userLogin}/>
                    <DiskBrowserPath />
                    <DiskBrowserList resourceList={this.state.resourceList} downloadFileHandler={this.downloadFile} />
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

    getResourceList() {
        diskApi.getResourceList()
            .then(response => {
                if (response.data._embedded.items.length) {
                    this.setState({
                        appStatus: 'loaded',
                        resourceList: response.data._embedded.items
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