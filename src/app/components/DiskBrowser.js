import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cookie from 'react-cookies'
import axios from 'axios'

import {config} from '../config'
import DiskBrowserControls from './DiskBrowserControls'
import DiskBrowserPath from './DiskBrowserPath'
import DiskBrowserList from './DiskBrowserList'

export default class DiskBrowser extends Component {
    // static propTypes = {
    //     accessToken: PropTypes.string()
    // }
    //
    // static defaultProps = {
    //     accessToken: ""
    // }

    constructor() {
        super()

    }

    componentWillMount() {
        console.log('componentWillMount')
        const hash = document.location.hash
        let appStatus = 'loading'
        let accessToken

        if (hash !== '' && /access_token=([^&]+)/.exec(hash).length >= 2) {
            accessToken = /access_token=([^&]+)/.exec(hash)[1]
            cookie.save('accessToken', accessToken)
        } else {
            accessToken = cookie.load('accessToken') || ''
        }

        if (accessToken === '') {
            appStatus = 'logout'
        } else {
            axios.defaults.headers.common['Authorization'] = 'OAuth ' + accessToken
            this.loadData()
        }

        this.state = {
            appStatus: appStatus,
            accessToken: accessToken,
            response: {}
        }
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
                    <DiskBrowserControls />
                    <DiskBrowserPath />
                    <DiskBrowserList>
                        <div>{JSON.stringify(response)}</div>
                        <button className="btn btn-info" onClick={this.logOut}>Выход</button>
                    </DiskBrowserList>
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
            accessToken: ''
        })
        cookie.remove('accessToken')
        document.location.hash = ''
    }

    loadData() {
        axios.get(config.apiUrl + 'resources', {
            params: {
                path: '/',
                fields: '_embedded.items.name,_embedded.items.type'
            }
        })
        .then(response => {
            console.log(response)
            console.log(response.data._embedded.items)
            this.setState({
                appStatus: 'loaded',
                response: response
            })
        })
        .catch(response => {
            this.setState({
                appStatus: 'error',
                response: response
            })
        })
    }
}