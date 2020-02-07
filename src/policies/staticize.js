/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/8
 * @description
 *
 */

var Staticize = require('node-staticize');

var staticize = new Staticize({
  cache: {
    adapter: 'redis',
    options: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || '6379',
      password: process.env.REDIS_PASSWD || '',
      db: +process.env.REDIS_DB || 5,
    }
  },
  routes: {
    '/api/': 60,  // 客户端api缓存60秒
  },
});

function noCache(req, res, next) {
  return next();
}

let exportFunction = noCache;
if (process.env.NODE_ENV === 'production') {
  exportFunction = staticize.cacheMiddleware();
}

module.exports = exportFunction;
