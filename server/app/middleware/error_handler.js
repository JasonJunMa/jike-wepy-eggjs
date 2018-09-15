'use strict';
const util = require('../util/utils');

module.exports = (option, app) => {
    return async function (ctx, next) {
        try {
            const intime = new Date().getTime();
            await next();
            const outtime = new Date().getTime();
            console.log(util.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}') + ' ' + ctx.request.method + ' ' + (outtime - intime) / 1000 + ctx.path);
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            console.log(ctx.path);
            app.emit('error', err, this);
            const status = err.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && app.config.env === 'prod' ?
                'Internal Server Error' :
                err.message;
            // 从 error 对象上读出各个属性，设置到响应中
            ctx.body = {
                code: status,
                error
            };
            ctx.status = 200;
        }
    };
};
