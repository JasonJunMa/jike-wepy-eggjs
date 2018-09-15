'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
   // weapp
   router.get('/weapp/login', app.jwt, controller.weapp.login);
   router.get('/weapp/register', controller.weapp.register);
   router.put('/weapp/user', app.jwt, controller.weapp.update);
   router.put('/weapp/userinfo', app.jwt, controller.weapp.updateUserInfo);
   router.post('/weapp/upload', app.jwt, controller.weapp.upload);

};
