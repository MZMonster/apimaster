/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/18
 * @description
 *
 */

import _ from 'lodash';

/**
 * 邀请或移除站点管理员
 * @param action  操作(add|remove)
 * @param operator  操作人
 * @param siteID  站点ID
 * @param adminUUID  被操作人
 * @returns {*}
 */
function manageAdmins(action, operator, siteID, adminUUID) {
  let query = { id: siteID };
  if (!operator.isSuper) {  // 非超级管理员必须是站点创建者
    query.createBy = operator.id;
  }

  return Site.findOne(query).populate('admins').then(site => {
    if (!site) {
      let err = new Error('您没有权限操作该站点');
      err.code = 403;
      throw err;
    }

    return [
      Admin.findOne({ uuid: adminUUID }),
      site,
    ];
  }).spread((admin, site) => {
    if (!admin) {
      let err = new Error('该管理员不存在');
      err.code = 400;
      throw err;
    }

    let wasAdmin = _.includes(_.map(site.admins, 'id'), admin.id);  // 已经是管理员
    if (action === 'add' && wasAdmin) {
      // 多这一步是因为已经存在该管理员之后,再添加会报500
      return true;
    }

    site.admins[action](admin.id);
    return site.save().then(() => {
      // action log
      ActionLog.create({
        model: 'site',
        action: `${action}Admin`,
        target: siteID,
        data: admin,
        admin: admin.id,
      }).catch(err => {
        sails.log.error(err);
      });

      return true;
    });
  });
}

export default {
  manageAdmins,
};
