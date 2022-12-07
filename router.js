'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/register', controller.home.register);
  router.post('/api/login', controller.home.login);
  router.post('/api/savemsg', controller.home.save_msg);
  router.post('/api/allmsg', controller.home.all_msg);
  router.post('/api/logout', controller.home.all_msg);
};
