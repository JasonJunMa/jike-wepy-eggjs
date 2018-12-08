'use strict';
module.exports = app => {
    class weappController extends app.Controller {
        async register() {
            const {
                ctx,
                service,
            } = this;
            const postdata = ctx.request.body || {};
            let res = await service.weapp.getSessionKey(postdata);
            res.appid = postdata.appid;
            const user = await service.user.create(res);
            res = {
                token: await service.actionToken.apply(user._id, user.openid),
                userinfo: user.userinfo ? user.userinfo : false,
            };
            ctx.helper.success(ctx, res);
        }

        async login() {
            const {
                ctx,
                service,
            } = this;
            const user = await service.user.getuserinfobyself();
            const res = {
                token: await service.actionToken.apply(user._id, user.openid),
                userinfo: user.userinfo ? user.userinfo : false,
            };
            ctx.helper.success(ctx, res);
        }

        async update() {
            const {
                ctx,
                service,
            } = this;
            const userinfo = ctx.request.body || {};
            const descData = await service.weapp.authorization(userinfo);
            const payload = {
                unionId: descData.unionId,
                userinfo: userinfo.userInfo,
            };
            const _id = ctx.state.user.data._id;
            payload.userinfo.expirationTime = new Date().getTime() + 864000000; // 240个小时 10天 用户信息在十天之后过期
            let res = await service.user.updateById(payload, _id);
            res = payload.userinfo;
            ctx.helper.success(ctx, res);
        }

        async updateUserInfo() {
            const {
                ctx,
                service,
            } = this;
            const userinfo = ctx.request.body || {};
            const _id = ctx.state.user.data._id;
            let res = await service.user.updateById({ userinfo }, _id);
            res = userinfo;
            ctx.helper.success(ctx, res);
        }

        async upload() {
            const {
                ctx,
                service,
            } = this;
            const res = await service.weapp.upload();
            ctx.helper.success(ctx, res);
        }

        async getphoneNumber() {
            const { ctx, service } = this;
            const postdata = ctx.request.body || {};
            const res = await service.weapp.getphoneNumber(postdata);
            ctx.helper.success(ctx, res);
        }
    }
    return weappController;
};
