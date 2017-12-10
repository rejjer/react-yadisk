import axios from 'axios'
import {config} from '../config'

function YandexDiskApi() {

    this.setAuthHeader = function (accessToken) {
        axios.defaults.headers.common['Authorization'] = 'OAuth ' + accessToken
    }

    this.getUserLogin = function () {
        return axios.get(config.apiUrl, {
            params: {
                path: '/',
                fields: 'user.login'
            }
        })
    }

    this.getResourceList = function () {
        return axios.get(config.apiUrl + 'resources', {
            params: {
                path: '/',
                fields: '_embedded.items.name,_embedded.items.type,_embedded.items.path,_embedded.items.resource_id'
            }
        })
    }
}

export const diskApi = new YandexDiskApi()