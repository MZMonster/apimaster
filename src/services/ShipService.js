/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/6/29
 * @description
 *
 */

import _ from 'lodash';

/**
 * 获取页面下面的所有容器
 * @param site  站点ID
 * @param uuidOrDomain  页面uuid或域名
 * @returns {Object}
 */
function getShip(site, uuidOrDomain) {
  return Ship.findOne({
    site,
    publish: true,
    or: [
      { uuid: uuidOrDomain },
      { domain: uuidOrDomain },
    ],
  }).then(ship => {
    if (!ship) {
      return null;
    }

    return Container.find({ ship: ship.id }).populate('components').then(containers => {
      containers = _.keyBy(containers, 'domain');
      const result = {};
      _.map(Object.keys(containers), function (container) {
        const obj = containers[container];
        let data = []
        _.map(obj.components, function (com) {
          if (com.publish) data.push(com)
        })
        data = _.reverse(_.sortBy(data, ['weight']))
        result[container] = {
          components: data
        }
      })
      return result;
    });
  });
}

export default {
  getShip,
};
