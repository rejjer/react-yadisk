import React, {Component} from 'react'
import cookie from 'react-cookies'

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
        console.log('componentWillMount')
        const hash = document.location.hash
        let appStatus = 'loading'
        let accessToken
        let userLogin = cookie.load('userLogin') || ''

        if (hash !== '' && /access_token=([^&]+)/.exec(hash).length >= 2) {
            accessToken = /access_token=([^&]+)/.exec(hash)[1]
            cookie.save('accessToken', accessToken)
        } else {
            accessToken = cookie.load('accessToken') || ''
        }

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
        console.log('render')
        const {appStatus, accessToken} = this.state

        switch (appStatus) {
            case 'loading': return this.showDiskBrowser('loading')
            case 'logout': return this.showAuth()
            case 'loaded': return this.showDiskBrowser()
            default: return this.showError()
        }
    }

    componentDidMount() {
        console.log('componentDidMount')

    }

    showDiskBrowser(loadingStatus) {
        const response = this.state.response

        return (
            <div className="container">
                <div className={'disk-browser' + (loadingStatus === 'loading' ? ' loading' : '')}>
                    <DiskBrowserControls logOut={this.logOut} userLogin={this.state.userLogin}/>
                    <DiskBrowserPath />
                    <DiskBrowserList resourceList={this.state.resourceList} />
                </div>
            </div>
        );
    }

    showAuth() {
        return (
            <div className="container text-center">
                <div className="jumbotron">
                    <p>Для работы приложения нобходим токен авторизации</p>
                    <a className="btn btn-success" href={config.oAuthUrl + config.appId}>Продолжить</a>
                </div>
            </div>
        );
    }

    showLoader() {
        return (
            <div className="container text-center">
                <div className="jumbotron">
                    <p>Загрузка...</p>
                    <button className="btn btn-info" onClick={this.logOut}>Выход</button>
                </div>
            </div>
        );
    }

    showError() {
        return (
            <div className="container text-center">
                <div className="jumbotron text-danger">
                    <p>Произошла какая-то ошибка</p>
                    <p>{JSON.stringify(response)}</p>
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
        document.location.hash = ''
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
            .catch(response => {
                this.setState({
                    appStatus: 'error',
                    response: response
                })
            })
    }
}