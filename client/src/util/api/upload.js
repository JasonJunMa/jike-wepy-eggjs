const baseUrl = require('../../config').service.host;
import {
    buildAuthHeaders
} from '../weapp-clien-sdk/auth';
import {seesion, constants} from '../session/index';
import {
    request
} from '../request';

export function getvideosignature() {
    return new Promise((resolve, reject) => {
        let videosignature = seesion.getwithtime(constants.videosignature) || null;
        if (videosignature === null) {
            request('get', {}, '/api/weapp/getvideosignature').then(res => {
                console.log(res);
                let obj = {
                    signature: res
                };
                seesion.setwithtime(constants.videosignature, obj);
                resolve(res);
            }).catch(e => {
                wx.showToast({
                    title: '获取视频上传签名失败',
                    icon: 'none'
                });
            });
        } else {
            resolve(videosignature.signature);
        }
    });

}

export function upload(filepath, i = 0) {
    return new Promise((resolve, reject) => {
        let headers = buildAuthHeaders();
        wx.uploadFile({
            url: baseUrl + '/api/weapp/upload',
            filePath: filepath,
            name: 'fitnessfile', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
            header: headers, // 设置请求的 header
            success: function(res) {
                res = JSON.parse(res.data);
                if (res.code === 20000) {
                    res.data.index = i;
                    resolve(res.data);
                } else {
                    console.log(res);
                    reject(i);
                }
            },
            fail: function(err) {
                wx.hideToast();
                reject(i);
            },
        });
    });
}
