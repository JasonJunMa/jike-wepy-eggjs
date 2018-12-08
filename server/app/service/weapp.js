'use strict';
const http = require('axios');
// const sha1 = require('../util/sha1');
const aesDecrypt = require('../util/aesDecrypt');


module.exports = app => {
    class weappService extends app.Service {

        /**
       * @description 根据code获取用户的openid
       * @param {*} postdata
       */
        async getSessionKey(postdata) {
            const {code } = postdata;
            let config  = this.app.config
            const appid =  config.weapp.appId;
            const appsecret =  config.weapp.appSecret;
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

        async getphoneNumber(payload) {
            const id = this.ctx.state.user.data._id;
            const sessionkey = await this.ctx.model.User.findOne({ _id: id }, 'session_key');
            let decryptedData = null;
            try {
                decryptedData = aesDecrypt(sessionkey.session_key, payload.iv, payload.encryptedData);
                decryptedData = JSON.parse(decryptedData);
            } catch (e) {
                this.ctx.helper.error('获取手机号码失败，请重试');
            }
            return decryptedData;
        }

        /**
         * @description 用于鉴权 在小程序上点击授权按钮之后 能够拿到用户的信息以及 unionId
         * @param {*} userinfo
         * @returns
         */
        async authorization(userinfo) {
            const { encryptedData, iv } = userinfo;
            const { service } = this;
            const user = await service.user.getuserinfobyself();
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
            const { service, ctx } = this;
            const res = await service.cos.uploader();
            const image = {
                name: res.imgKey,
                url: res.imgUrl,
                cutUrl: res.imgKey,
                extra: res,
            };
            return ctx.model.Image.create(image);
        }

        async createWXAQRCode(access_token, path = 'pages/index') {
            const url = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN';
            const res = await http({
                url,
                method: 'post',
                data: {
                    access_token,
                    path,
                },
            });
            return res;
        }
    }
    return weappService;
};
