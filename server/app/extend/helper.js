// 处理成功响应
'use strict';
exports.success = (ctx, res = null, message = '请求成功') => {
    ctx.body = {
        code: 20000,
        data: res,
        message
    };
    ctx.status = 200;
};
