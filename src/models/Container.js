/**
 * Container.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

import { v4 } from 'node-uuid';

export default {
  schema: true,
  identity: 'container',
  globalId: 'Container',
  attributes: {
    uuid: { type: 'string', defaultsTo: v4, unique: true, required: true, index: true },
    title: { type: 'string', size: 100 },
    domain: { type: 'string', size: 50, defaultsTo: v4, minLength: 3 },
    cover: { type: 'string', size: 300 }, // 封面图片
    description: { type: 'string', size: 300 },
    publish: { type: 'boolean', defaultsTo: true },
    expire: { type: 'integer', defaultsTo: 0 },  // 0 表示不过期,过期时间的秒数
    createBy: { model: 'Admin' },
    site: { model: 'Site' },
    ship: { model: 'Ship' },
    canDelete: { type: 'boolean', defaultsTo: true }, // 是否可以删除.
    components: { collection: 'component', via: 'container' },
  },

  beforeCreate: function (values, next) {
    ModelService.createCheck(Container, values, next);
  },

  beforeDestroy: function (query, next) {
    ModelService.destroyCheck(Container, query, next);
  },
};

