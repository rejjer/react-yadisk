import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cookie from 'react-cookies'
import axios from 'axios'

import {config} from '../config'

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
        let status = 'loading'
        let accessToken

        if (hash !== '' && /access_token=([^&]+)/.exec(hash).length >= 2) {
            accessToken = /access_token=([^&]+)/.exec(hash)[1]
            cookie.save('accessToken', accessToken)
        } else {
            accessToken = cookie.load('accessToken') || ''
        }

        if (accessToken === '') {
            status = 'logout'
        } else {
            axios.defaults.headers.common['Authorization'] = 'OAuth ' + accessToken
            this.loadData()
        }

        this.state = {
            status: status,
            accessToken: accessToken,
            response: {}
        }
    }

    render() {
        console.log('render')
        const {status, accessToken} = this.state

        switch (status) {
            case 'loading': return this.showLoader()
            case 'logout': return this.showAuth()
            case 'loaded': return this.showDiskBrowser()
            default: return this.showError()
        }
    }

    componentDidMount() {
        console.log('componentDidMount')

    }

    showDiskBrowser() {
        const response = this.state.response

        return (
            <div className="container text-center">
                <div className="jumbotron">
                    <div>{JSON.stringify(response)}</div>
                    <button className="btn btn-info" onClick={this.logOut}>Выход</button>
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
            status: 'logout',
            accessToken: ''
        })
        cookie.remove('accessToken')
        document.location.hash = ''
    }

    loadData() {
        axios.get(config.apiUrl)
            .then(response => {
                this.setState({
                    status: 'loaded',
                    response: response
                })
            })
            .catch(response => {
                this.setState({
                    status: 'error',
                    response: response
                })
            })
    }
}