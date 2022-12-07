/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1669776756308_4392';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

   // 静态文件路径配置
  config.static = {
    prefix:'/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    gzip: true,
    //dynamic: true,
    //preload: false,
    maxAge: 31536000,
    //buffer: false
  };

  config.security = {
    csrf: {
      enable: false,
    },

    methodnoallow: {
      enable: false
    },

    domainWhiteList: [
      '127.0.0.1',
      'localhost',
      '.brmind.cn',
      'open.weixin.qq.com',
      'cdp.hzsw-bio.com',
      'edu.brmind.cn',
      'edu.duoduozhijiao.cn',
      'qb.duoduozhijiao.cn',
      '.duoduozhijiao.cn',
    ]
  };

  config.session={ 
     key:'SESSION_ID',
     maxAge:864000,
     renew: true //延长会话有效期
  }

  return {
    ...config,
    ...userConfig,
  };
};
