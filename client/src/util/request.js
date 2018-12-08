const serviceconfig = require('../config').service;
import wepy from 'wepy';
import {
    buildAuthHeaders
} from './weapp-clien-sdk/auth';
import {
    login
} from './weapp-clien-sdk/login';

/**
 *
 * @param {string} methods GET POST 等
 * @param {object} data  请求的数据
 * @param {string} url   请求的url
 * @param {boolean} fullurl 已经是全部的url了
 */

function doRequest(requesturl, data, method, retry = true) {
    return new Promise((resolve, reject) => {
        let headers = buildAuthHeaders();
        console.log({
            requesturl,
            data,
            method,
            headers
        });
        wepy.request({
            url: requesturl, // 开发者服务器接口地址",
            data: data, // 请求的参数",
            method: method,
            header: headers,
            dataType: 'json', // 如果设为json，会尝试对返回的数据做一次 JSON.parse
        }).then(res => {
            if (res.data.code === 20000) {
                resolve(res.data.data);
            } else if (res.data.code === 401) {
                login().then(res => {
                    if (retry) {
                        return doRequest(requesturl, data, method, false);
                    }
                });
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function gethosturl(hostname) {
    return serviceconfig[hostname] || serviceconfig['host'];
}

export function request(method, data, url, fullurl = false, hostname = 'host') {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();
        let requesturl = gethosturl(hostname);
        if (method === 'GET') {
            url = buildUrlParam(url, data);

        }
        if (fullurl) {
            requesturl = url;
        }
        requesturl += url;
        doRequest(requesturl, data, method).then(res => {
            resolve(res);
        }).catch(err => {
            wx.showToast({
                title: err.data.error,
                icon: 'none', // loading
                duration: 3000,
                mask: false
            });
            reject(err.data);
        });

    });

}

function buildUrlParam(url, data) {
    url += '?';
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            url += key + '=' + value + '&';
        }
    }
    return url;
}
