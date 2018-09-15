'use strict';
const http = require('axios');
// const sha1 = require('../util/sha1');
const aesDecrypt = require('../util/aesDecrypt');


module.exports = app => {
    class weappService extends app.Service {
        async getSessionKey(code) {
            const { config } = this;
            const appid =  config.weapp.appId;
            const appsecret = config.weapp.appSecret;
            const res = await http({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                method: 'GET',
                params: {
                    appid,
                    secret: appsecret,
                    js_code: code,
                    grant_type: 'authorization_code',
                },
            });
            if (res.data.openid) {
                // 获取成功
                return res.data;
            }
            throw new Error(res.data.errmsg);
        }


        async authorization(userinfo) {
            // const {
            //     'x-wx-code': code,
            //     'x-wx-encrypted-data': encryptedData,
            //     'x-wx-iv': iv
            // } = req.headers
            const { encryptedData, iv } = userinfo;
            // const seesion = await this.getSessionKey(code);
            // const session_key = seesion.session_key;
            // const skey = sha1(session_key);
            const { service } = this;
            const user = await service.user.index();
            const session_key = user.session_key;
            let decryptedData;
            try {
                decryptedData = aesDecrypt(session_key, iv, encryptedData);
                decryptedData = JSON.parse(decryptedData);
            } catch (e) {
                throw new Error(`解密错误:\n${e}`);
            }
            return decryptedData;
        }


        async upload() {
            // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
            // 只支持上传一个文件。
            // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
            const { service, ctx } = this;
            const res = await service.cos.uploader();
            const image = {
                name: res.imgKey,
                url: res.imgUrl,
                cutUrl: app.config.weapp.imageview2 + res.imgKey,
                extra: res
            };
            return ctx.model.Image.create(image);
        }
    }
    return weappService;
};
