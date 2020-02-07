/**
 * Component.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

import { v4 } from 'node-uuid';

export default {
  schema: true,
  identity: 'component',
  globalId: 'Component',
  attributes: {
    uuid: { type: 'string', defaultsTo: v4, unique: true, required: true, index: true },
    title: { type: 'string', size: 100 },
    domain: { type: 'string', size: 50, defaultsTo: v4, minLength: 3 },
    cover: { type: 'string', size: 300 }, // 封面图片
    url: { type: 'string', size: 300 }, // 链接地址
    description: { type: 'string', size: 1000 },
    description_en: { type: 'string', size: 1000 },
    url_en: { type: 'string', size: 300 }, // 链接地址
    publish: { type: 'boolean', defaultsTo: true },
    canDelete: { type: 'boolean', defaultsTo: true }, // 是否可以删除.
    expire: { type: 'integer', defaultsTo: 0 },  // 0 表示不过期,过期时间的秒数
    weight: { type: 'integer', defaultsTo: 0 },  // 排序权重,越大越靠前
    images: { type: 'array' },
    data: { type: 'json' },
    proxy: { type: 'string', size: 300 },  // 代理请求url 地址, 数据在站外. 请求会数据绑定到 proxy
    createBy: { model: 'Admin' },
    site: { model: 'Site' },
    container: { model: 'Container' },
  },

  // 删除前,检查 是否可以删除
  beforeDestroy: function (query, next) {
    ModelService.destroyCheck(Component, query, next);
  },

  beforeCreate: function (values, next) {    
    ModelService.createCheck(Component, values, next);
  }
};
