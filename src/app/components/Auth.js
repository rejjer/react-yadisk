import React from 'react'
import cookie from 'react-cookies'
import {Redirect} from 'react-router-dom';

import {config} from '../config'

export default function Auth(props) {
    const hashRegExp = /access_token=([^&]+)/.exec(props.match.url)

    if (hashRegExp !== null && hashRegExp.length >= 2) {
        cookie.save('accessToken', hashRegExp[1])
        return <Redirect to='/disk'/>
    }

    return (
        <div className="container">
            <div className="jumbotron text-center">
                <p>Для работы приложения нобходим токен авторизации</p>
                <a className="btn btn-success" href={config.oAuthUrl + config.appId}>Продолжить</a>
            </div>
        </div>
    )
}