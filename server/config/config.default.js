'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.cluster = {
    listen: {
        port: 7004,
        hostname: '0.0.0.0',
    }
};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533866442380_2792';

  // add your config here
  config.security = {
    csrf: {
        enable: false,
    },
    domainWhiteList: [],
};

config.mongoose = {
   
};

config.redis = {
  
};

config.rabbitmq = {
 
};


// add your config here
config.middleware = [ 'errorHandler' ];

// this.ctx.state.user.data._i
config.jwt = {
 
};

config.classRecordExpireTime = 300; // 秒

config.role = {
  
};

config.weapp = {
    // 微信小程序 App ID
    appId: '',
    // 微信小程序 App Secret
    appSecret: '',
    // 如果使用腾讯云的对象存储 请填写
    imageview2: '',
    cos: {
        // 腾讯云id
        qcloudAppId: '',

        // 腾讯云密码
        qcloudSecretId: '',

        // 腾讯云密匙key
        qcloudSecretKey: '',

        fileBucket: '',

        region: '',

        // 每次上传文件最大限制
        maxSize: 10,

        // 文件上传字段 小程序 默认是file
        fieldName: '',

        // 存储文件路径
        uploadFolder: ''
    }
};


  return config;
};
