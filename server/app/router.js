'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  const messageFormid = app.middleware.messageFormid();

   // weapp
   router.get('/api/weapp/login', app.jwt, controller.weapp.login);  // 调用wx.login是让用户登录
   router.post('/api/weapp/register', controller.weapp.register);    // 用户祖册
   router.put('/api/weapp/user', app.jwt, controller.weapp.update); // 用户授权解析 用于获取用户的unionid 以及更新用户信息
   router.put('/api/weapp/userinfo', app.jwt, controller.weapp.updateUserInfo); // 用户更新用户信息
   router.post('/api/weapp/upload', app.jwt, controller.weapp.upload);
   router.post('/api/weapp/getphoneNumber', app.jwt, controller.weapp.getphoneNumber); // 获取手机号码
   router.get('/api/weapp/formid', app.jwt, messageFormid, controller.home.index);


   router.post('/api/orderpay/pullpay',app.jwt, controller.orderpay.pullpay); //拉起支付
   router.post('/api/orderpay/notify',app.jwt,controller.orderpay.notify); 
   router.post('/api/orderpay/refundnotify',app.jwt,controller.orderpay.refundnotify);
};
