'use strict';

/**
 * Created by liuxing on 16/6/29.
 */

var ADMIN_API_PATH = /\/api2\//;

module.exports = function (req, res, next) {
  if (!req.path.match(ADMIN_API_PATH)) {
    return next();
  }

  if (!req.session.admin) {
    return res.status(403).send({
      code: 403,
      message: 'sorry, you can not access this url',
    });
  }

  var ownerSites = req.session.sites;  // 当前登录用户的 siteID

  // post, put 请求的时候,确认该站点和所有者对应
  var siteID = req.body && +req.body.site;
  siteID = (typeof siteID === 'object') ? siteID.id: siteID; // site 对象

  if (req.method === 'GET' || req.session.admin.isSuper) {
    return next();
  }

  // 创建站点
  if (!siteID && req.path === '/api2/site' && req.method === 'POST') {
    return next();
  }

  if (!ownerSites.length) {
    return res.status(400).send({
      code: 400,
      message: 'You have no site created yet!',
    });
  }

  if (siteID && !_.includes(ownerSites, siteID)) {  // 站点的创建者,并非当前的登录用户
    return res.status(403).send({
      code: 403,
      message: 'You are not the owner of the site!',
    });
  }

  next();
};