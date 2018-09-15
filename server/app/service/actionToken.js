'use strict';

const Service = require('egg').Service;

class ActionTokenService extends Service {
    async apply(_id) {
        const {
            ctx
        } = this;
        // console.log(ctx.app.config.jwt.secret)
        return ctx.app.jwt.sign({
            data: {
                _id,
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        });
    }
}

module.exports = ActionTokenService;
