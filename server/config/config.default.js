'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = '';
  
  config.jwt = {
    secret: '1234567',
    enable: true, // default is false
    match: '/jwt', // optional
  }

  // add your config here
  config.middleware = ['errorHandler'];

  config.cluster = {
    listen: {
      port: 7005,
      hostname: '0.0.0.0',
    }
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [],
  };

  config.mongoose = {
    url: 'mongodb://148.70.123.247:27017/ijike',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
      user: 'admin',
      pass: 'admin@ijike'
    },
  };

  
  config.weapp = {
    // 微信小程序 App ID
    appId: 'wx08e42eacf01761f6',
    // 微信小程序 App Secret
    appSecret: '1c16872425ea2ccb13c07beab3d53f34',
    // 如果使用腾讯云的对象存储 请填写
    cos: {
        // 腾讯云id
        qcloudAppId: '',

        // 腾讯云密码
        qcloudSecretId: '',

        // 腾讯云密匙key
        qcloudSecretKey: '',

        fileBucket: '',

        region: 'ap-chengdu',

        // 每次上传文件最大限制
        maxSize: 10,

        // 文件上传字段 小程序 默认是file
        fieldName: 'fitnessfile',

        // 存储文件路径
        uploadFolder: ''
    }
};


  return config;
};