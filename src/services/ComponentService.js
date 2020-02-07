/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/6/29
 * @description
 *
 */

/**
 * 获取具体组件内容
 * @param site  站点ID
 * @param uuidOrDomain  组件uuid或域名
 * @returns {Object}
 */
function getComponent(site, uuidOrDomain) {
  // TODO 暂时没考虑component.proxy
  return Component.findOne({
    site,
    publish: true,
    or: [
      { uuid: uuidOrDomain },
      { domain: uuidOrDomain },
    ],
  });
}

export default {
  getComponent,
};
