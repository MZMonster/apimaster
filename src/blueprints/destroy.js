/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/18
 * @description
 *
 */

import actionUtil from 'sails/lib/hooks/blueprints/actionUtil';

module.exports = function destroyOneRecord(req, res) {

  var Model = actionUtil.parseModel(req);
  var pk = actionUtil.requirePk(req);

  var query = Model.findOne(pk);
  query = actionUtil.populateRequest(query, req);
  query.exec(function foundRecord(err, record) {
    if (err) return res.serverError(err);
    if (!record) return res.notFound('No record found with the specified `id`.');
    if (Model.attributes.canDelete && !record.canDelete) {
      //return res.forbidden('Record can not be deleted');
    }

    // site可能是 Object
    let siteID = (typeof record.site === 'object') ? record.site.id : +record.site;

    // 非超级管理员和非站点管理员，不允许删除该站点下的ship/container/component
    if (siteID && !_.includes(req.session.sites, siteID) && !req.session.admin.isSuper) {
      sails.log('req.session.sites', req.session.sites);
      sails.log('record', record);
      return res.forbidden('You are not the manager of the site');
    }

    Model.destroy(pk).exec(function destroyedRecord(err) {
      if (err) return res.negotiate(err);

      // action log
      ActionLog.create({
        model: Model.identity,
        action: 'destroy',
        target: record.id,
        data: { id: pk },
        before: record,
        admin: req.session.user,
      }).catch(err => {
        sails.log.error(err);
      });

      return res.ok(record);
    });
  });
};
