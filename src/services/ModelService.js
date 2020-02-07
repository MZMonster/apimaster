/**
 * Created by liuxing on 16/6/30.
 */

import _ from 'lodash';
let actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

/**
 * 处理禁止删除项, 如果设置成 canDelete 为 false,则不能直接删除
 * @param Model
 * @param query
 * @param next
 */
function destroyCheck(Model, query, next) {
  if (query.where.id) {
    Model.findOne(query.where.id, { select: 'canDelete' }).then((model) => {
      if (model && model.canDelete) {
        return next();
      }

      throw new Error('请联系管理员删除!');
    }).catch(next);
  }else {
    next();
  }
}

function createCheck(Model, values, next){
  if (!values.site) { // 必须属于一个 site
    return next('siteID is required!');
  }

  let siteID = (typeof values.site === 'object') ? values.site.id : +values.site; // 可能是 Object { site }

  if (!values.domain) {  // 没有 domain ,则值为 uuid,不需要继续校验
    return next();
  }

  // site 和 domain 唯一
  Model.findOne({ domain: values.domain, site: siteID }).then((model) => {
    if (!model) {
      return next();
    }

    sails.log(model, 'domain is not unique!');
    next('domain is not unique!');
  }).catch(next);
}

/**
 * 提供给后台查询数量(用于翻页)的接口
 * @param req
 * @param res
 */
function count(req, res) {
  let Model = actionUtil.parseModel(req);
  let query = {};

  if (typeof req.param('where') !== 'undefined') {
    query.where = JSON.parse(req.param('where'));
  }

  Model.count(query, function (error, count) {
    if (error) {
      return res.serverError('database_error', error);
    }

    res.ok({ count });
  });
}

export default {
  destroyCheck: destroyCheck,
  createCheck: createCheck,
  count: count,
};
