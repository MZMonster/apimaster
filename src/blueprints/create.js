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

module.exports = function (req, res) {
  let Model = actionUtil.parseModel(req);

  // 除了创建site和admin，其他都必须传site id
  if (!req.body.site && Model.identity !== 'site' && Model.identity !== 'admin') {
    return res.badRequest('siteID is required!');
  }

  // 可能是 Object { site }
  let siteID = (typeof req.body.site === 'object') ? req.body.site.id : +req.body.site;

  // 非超级管理员和非站点管理员，不允许创建该站点下的ship/container/component
  if (siteID && !_.includes(req.session.sites, siteID) && !req.session.admin.isSuper) {
    sails.log('req.session.sites', req.session.sites);
    sails.log('req.body.site', req.body.site);
    return res.forbidden('You are not the manager of the site');
  }

  req.body.createBy = req.session.user;   // 设置创建人
  let data = actionUtil.parseValues(req);

  Model.create(data).then(function created(newInstance) {

    // action log
    ActionLog.create({
      model: Model.identity,
      action: 'create',
      target: newInstance.id,
      data,
      after: newInstance,
      admin: req.session.user,
    }).catch(err => {
      sails.log.error(err);
    });

    // after create site
    if (Model.identity === 'site') {
      req.session.sites.push(newInstance.id); // 当前站点设置到登录用户系统.
      newInstance.admins.add(req.session.user);

      return newInstance.save().then(() => res.created(newInstance));
    }

    res.created(newInstance);
  }).catch(err => {
    sails.log.error(err);
    res.negotiate(err);
  });

};

