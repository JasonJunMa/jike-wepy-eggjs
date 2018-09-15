// var host = 'http://192.168.1.103:7002';
// var host = 'http://127.0.0.1:7002';
var host = 'https://fitness.hubbleinfo.cn';
var config = {

    // 下面的地址配合后端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`
    },

    // 课程发布时间
    readyClassTime: 3,
};

module.exports = config;
