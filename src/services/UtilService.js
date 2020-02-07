/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/15
 * @description
 *
 */

/**
 * 禁止使用的方法,屏蔽blueprint
 * @param req
 * @param res
 */
function bannedAction(req, res) {
  res.notFound();
}

function errorHandler(res, err) {
  if (err.code) {
    sails.log.error(err.message);
    switch (err.code) {
      case 400:
        return res.badRequest(err.message);
      case 403:
        return res.forbidden(err.message);
      case 404:
        return res.notFound(err.message);
      default:
        break;
    }
  }

  sails.log.error(err);
  return res.serverError();
}

export default {
  bannedAction,
  errorHandler,
};