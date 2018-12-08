'use strict';
module.exports = app => {
    class userService extends app.Service {
        async create({ openid, session_key }) {
            const { ctx, service } = this;
            const user = await service.user.findByOpenId(openid);
            if (user) {
                // 已经存在 无所畏惧 改一下seesion_key
                // console.log('我是已经存在的')
                return await service.user.updateById({ session_key }, user._id);
            }
            return await ctx.model.User.create({ openid, session_key });
        }

        async findByOpenId(openid) {
            return this.ctx.model.User.findOne({ openid });
        }

        async getuserinfobyself() {
            const { ctx } = this;
            const _id = ctx.state.user.data._id;
            return ctx.model.User.findById(_id);
        }

        async changeCertification(authinfo) {
            const id = this.ctx.state.user.data._id;
            return this.ctx.model.User.findByIdAndUpdate({ _id: id }, { certification: authinfo });
        }

        async updateById(payload, _id) {
            payload.oprationTime = new Date();
            return this.ctx.model.User.findByIdAndUpdate(_id, payload);
        }

        async getUserCertification(_id) {
            return this.ctx.model.User.findOne({ _id }, 'certification');
        }
    }
    return userService;
};
