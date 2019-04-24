var host = 'http://127.0.0.1:7005';
var config = {

    // 下面的地址配合后端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/api/weapp/login`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    },
};

module.exports = config;
