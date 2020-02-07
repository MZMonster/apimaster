/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/6/29
 * @description
 *
 */

/**
 * 获取容器下的所有组件
 * @param site  站点ID
 * @param uuidOrDomain  容器uuid或域名
 * @returns {Array}
 */
function getContainer(site, uuidOrDomain) {
  return Container.findOne({
    site,
    publish: true,
    or: [
      { uuid: uuidOrDomain },
      { domain: uuidOrDomain },
    ],
  });
}

/**
 * 模糊搜索容器下的组件
 * @param site 站点ID
 * @param uuidOrDomain 容器uuid或域名
 * @param keyword 搜索组件的关键字
 * @param page  页码
 * @param limit  每页多少条
 * @returns {Object}
 *  {
 *    limit: 10,
 *    page: 1,
 *    hasMorePage: true,
 *    list: [components],
 *  }
 */
function search(site, uuidOrDomain, keyword, page = 1, limit = 20) {
  let query = null;
  return getContainer(site, uuidOrDomain).then(container => {
    if (!container) {
      return 0;
    }

    query = {
      container: container.id,
      publish: true,
      or: [
        { title: { contains: keyword } },
        { description: { contains: keyword } },
      ],
      sort: { weight: 0 },
      limit: limit,
      skip: (page - 1) * limit,
    };

    return Component.find(query);
  }).then(components => {
    let result = {
      limit,
      page,
      hasMorePage: limit == components.length,
      components: components || [],
    };
    return result;
  });
}

export default {
  getContainer,
  search,
};
