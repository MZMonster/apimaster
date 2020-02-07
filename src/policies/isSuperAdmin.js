/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/6/30
 * @description
 *
 */

module.exports = function (req, res, next) {
  if (!req.session.admin.isSuper) {
    return res.forbidden('You are not super admin');
  }

  return next();
};
