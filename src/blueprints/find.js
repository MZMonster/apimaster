/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/12
 * @description
 *
 */

import _ from 'lodash';
import actionUtil from 'sails/lib/hooks/blueprints/actionUtil';

module.exports = function find(req, res) {
  if (!req.session.admin) {
    return res.forbidden('sorry, you can not access this url');
  }

  let Model = actionUtil.parseModel(req);

  if (actionUtil.parsePk(req)) {
    return require('sails/lib/hooks/blueprints/actions/findOne')(req, res);
  }

  // 解析查询条件, 限制ship/container/component只能搜索自己站点下的
  // admin表例外
  let where = actionUtil.parseCriteria(req);
  if (!req.session.admin.isSuper && Model.identity !== 'admin') {
    // 除了超级管理员, 其他管理员限制查询范围
    if (Model.identity === 'site') {
      // 只能查询属于自己管理范围的站点
      where.id = req.session.sites;
    } else {
      // 其他模块只能查询自己的站点下的数据
      if (where.site) {
        if (typeof where.site === 'number' && !_.includes(req.session.sites, where.site)) {
          return res.forbidden('You are not the owner of the site');
        } else if (where.site instanceof Array) {
          let before = where.site;
          where.site = _.intersection(req.session.sites, where.site); // 交集运算
          if (_.difference(before, where.site)) {
            // 所查询的站点中包含非本人站点
            return res.forbidden('You are not the owner of these sites');
          }
        }
      }

      if (!where.site) {
        // 参数没有包含站点,则自动限制只查自己的站点
        where.site = req.session.sites;
      }
    }
  }

  // Lookup for records that match the specified criteria
  let query = Model.find()
    .where(where)
    .limit(actionUtil.parseLimit(req))
    .skip(actionUtil.parseSkip(req))
    .sort(actionUtil.parseSort(req));
  query = actionUtil.populateRequest(query, req);
  query.exec(function found(err, matchingRecords) {
    if (err) {
      sails.log.error(err);
      return res.serverError();
    }    
    res.ok(matchingRecords);
  });
};
