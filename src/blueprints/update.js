/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/18
 * @description
 *
 */

import _ from 'lodash';
import util from 'util';
import actionUtil from 'sails/lib/hooks/blueprints/actionUtil';

module.exports = function updateOneRecord(req, res) {

  var Model = actionUtil.parseModel(req);
  var pk = actionUtil.requirePk(req);

  // 黑名单字段不可修改
  req.options.values = req.options.values || {};
  req.options.values.blacklist = req.options.values.blacklist || ['id'];
  var values = actionUtil.parseValues(req);

  // Make sure the primary key is unchanged
  values[Model.primaryKey] = pk;

  var query = Model.findOne(pk);
  query = actionUtil.populateRequest(query, req);
  query.exec(function found(err, matchingRecord) {

    if (err) return res.serverError(err);
    if (!matchingRecord) return res.notFound();

    // 开启禁用删除后,domain不能编辑,canDelete不能修改为true, 不可以将已发布改为未发布
    if (!matchingRecord.canDelete && !req.session.admin.isSuper) {
      if ((values.domain && values.domain != matchingRecord.domain)
          || values.canDelete === 'true'
          || values.canDelete === true
          || values.publish === 'false'
          || values.publish === false
          ) {
        return res.forbidden('不可删除的记录不接受修改域名和状态');
      }
    }

    // site可能是 Object { site }
    let siteID = (typeof matchingRecord.site === 'object') ? matchingRecord.site.id : +matchingRecord.site;

    // 非超级管理员和非站点管理员，不允许修改该站点下的ship/container/component
    if (siteID && !_.includes(req.session.sites, siteID) && !req.session.admin.isSuper) {
      sails.log('req.session.sites', req.session.sites);
      sails.log('record', matchingRecord);
      return res.forbidden('You are not the manager of the site');
    }

    Model.update(pk, values).exec(function updated(err, records) {

      if (err) return res.negotiate(err);

      // Because this should only update a single record and update
      // returns an array, just use the first item.  If more than one
      // record was returned, something is amiss.
      if (!records || !records.length || records.length > 1) {
        req._sails.log.warn(
          util.format('Unexpected output from `%s.update`.', Model.globalId)
        );
      }

      var updatedRecord = records[0];

      // action log
      ActionLog.create({
        model: Model.identity,
        action: 'update',
        target: updatedRecord.id,
        data: values,
        before: matchingRecord,
        after: updatedRecord,
        admin: req.session.user,
      }).catch(err => {
        sails.log.error(err);
      });

      // Do a final query to populate the associations of the record.
      //
      // (Note: again, this extra query could be eliminated, but it is
      //  included by default to provide a better interface for integrating
      //  front-end developers.)
      var Q = Model.findOne(updatedRecord[Model.primaryKey]);
      Q = actionUtil.populateRequest(Q, req);
      Q.exec(function foundAgain(err, populatedRecord) {
        if (err) return res.serverError(err);
        if (!populatedRecord) return res.serverError('Could not find record after updating!');
        res.ok(populatedRecord);
      }); // </foundAgain>
    });// </updated>
  }); // </found>
};
