const config = require('../../config');
import {constants, seesion} from '../session/index';
import {buildAuthHeaders} from './auth';

export function login() {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: function() {
                getUserInfo().then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log(err);
                    dologin().then(res => {
                        resolve(res);
                    });
                });
            },
            fail: function() {
                dologin().then(res => {
                    resolve(res);
                });
            }
        });
    });
}

export function checkSession() {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: function() {
                resolve();
            },
            fail: function() {
                dologin().then(res => {
                    resolve(res);
                }).catch(reject);
            }
        });
    });
}

function getUserInfo() {
    return new Promise((resolve, reject) => {
        let headers = buildAuthHeaders();
        wx.request({
            url: config.service.loginUrl,
            method: 'GET',
            header: headers,
            success: function(res) {
                if (res.data.code === 20000) {
                    seesion.set(constants.token, res.data.data);
                    resolve(res.data.data);
                } else {
                    reject(res);
                }
            }
        });
    });
}

export function dologin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: function(res) {
                if (res.code) {
                    var header = {};
                    const postdata = {
                        code: res.code
                    };
                    wx.request({
                        url: config.service.host + '/api/weapp/register',
                        header: header,
                        method: 'post',
                        data: postdata,
                        success: function(res) {
                            if (res.data.code === 20000) {
                                seesion.set(constants.token, res.data.data);
                                resolve(res.data.data);
                            }
                        }
                    });
                } else {
                    console.log('登录失败！' + res.errMsg);
                }
            },
            fail: function(res) {
                console.log('登录失败！' + res);
            }
        });
    });
}

/**
 *
 * @param {*} userinfo
 * @param {String} apiurl -- /api/weapp/user --
 */
export function updateUser(userinfo, apiurl = '/api/weapp/user') {
    return new Promise((resolve, reject) => {
        const token = seesion.get(constants.token);
        let headers = buildAuthHeaders();
        let now = new Date();
        userinfo.expirationTime = now.setDate(now.getDate() + 1);
        wx.request({
            url: config.service.host + apiurl,
            method: 'PUT',
            header: headers,
            data: userinfo,
            success: function(res) {
                if (res.data.code === 20000) {
                    token.userinfo = res.data.data;
                    seesion.setsync(constants.token, token);
                    resolve(res.data.data);
                } else {
                    reject(res);
                }
            }
        });
    });
}

function updateUserinfo (userinfo) {
    return new Promise((resolve, reject) => {
        updateUser(userinfo, '/api/weapp/userinfo').then(res => {
            resolve(res.userinfo);
        }).catch(err => {
            console.log(err);
        });
    });
}

/**
 * 验证是否已经授权用户信息
 */
export function getlocalUserInfo() {
    return new Promise((resolve, reject) => {
        let token = seesion.get(constants.token);
        if (token && token.userinfo) {
            if (token.userinfo.expirationTime > new Date().getTime()) {
                resolve(token.userinfo);
            } else {
                wx.getUserInfo({
                    success: function(res) {
                        // 更新服务器上用户信息
                        updateUserinfo(res.userInfo).then(res => {
                            resolve(res);
                        });
                    },
                    fail: function() {
                        reject(token);
                    }
                }
                );
            }
        } else {
            reject(token);
        }
    });
}
