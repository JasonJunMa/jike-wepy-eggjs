'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        openid: {
            type: String,
            unique: true
        },
        unionId: {
            type: String,
            unique: false
        },
        session_key: {
            type: String,
        },
        mobile: {
            type: String
        },
        certification: { // 个人认证信息 真实姓名 身份证号 身份证照片
            type: Object
        },
        oprationTime: {
            type: Date,
            default: Date.now
        },
        userinfo: {
            type: mongoose.Schema.Types.Mixed
        },
    });
    return mongoose.model('User', UserSchema);
};
