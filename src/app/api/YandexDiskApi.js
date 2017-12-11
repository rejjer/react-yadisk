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

    this.getResourceList = function (path) {
        let requestPath
        if (path === '' || path === '/disk') {
            requestPath = '/'
        } else {
            requestPath = path
        }
        return axios.get(config.apiUrl + 'resources', {
            params: {
                path: requestPath,
                fields: '_embedded.items.name,_embedded.items.type,_embedded.items.path,_embedded.items.resource_id'
            }
        })
    }

    this.getDownloadUrl = function (path) {
        return axios.get(config.apiUrl + 'resources/download', {
            params: {
                path: path,
                fields: 'href'
            }
        })
    }

    this.addFolder = function (path, accessToken) {
        return axios.put(config.apiUrl + 'resources?path=' + path)
    }

    this.deleteResource = function (path) {
        return axios.delete(config.apiUrl + 'resources', {
            params: {
                path: path
            }
        })
    }
}

export const diskApi = new YandexDiskApi()