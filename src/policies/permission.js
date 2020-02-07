/**
 * Created by liuxing on 16/6/30.
 */

import _ from 'lodash';

/**
 * 拥有网站权限的人,才能 修改和删除,添加本网站的记录
 * 管理员 查询所有站点记录的权限
 *
 * 1. 添加站点 和 更新站点,必须是该站点所有者
 * 3. 管理站点的 Ship,Container,Compoent 只能是站点的所有者
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
  if (!req.session.admin) {
    return res.forbidden('sorry, you can not access this url');
  }

  if (req.session.admin.isSuper) {
    return next();
  }

  // put, delete 请求的格式均为 /api2/:model/:id
  if (req.method !== 'PUT' && req.method !== 'DELETE') {
    return next();
  }

  let path = req.path.split('/');
  if (path.length !== 4) {  // /api2/ship/1   变成 [ '', 'api2', 'ship', '1' ]

    return next();
  }

  let id = path[3];
  let Model = sails.models[path[2]];

  if (!Model) {
    return next();  // 没有这个 Model 也不符合规格
  }

  Model.findOne({ where: { id: id }, select: ['site'] }).then((model) => {
    if (_.includes(req.session.sites, model.site)) {  // 创建人就是当前登录用户
      return next();
    }

    return res.forbidden('You are not the manager of the object!');
  }).catch(err => {
    sails.log.error(err);
    return res.forbidden(err);
  });
};
