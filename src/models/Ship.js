/**
 * Ship.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

import { v4 } from 'node-uuid';

export default {
  schema: true,
  identity: 'ship',
  globalId: 'Ship',
  attributes: {
    uuid: { type: 'string', defaultsTo: v4, unique: true, required: true },
    domain: { type: 'string', size: 50, defaultsTo: v4, minLength: 3 },
    title: { type: 'string', size: 100 },
    description: { type: 'string', size: 300 },
    publish: { type: 'boolean', defaultsTo: true },
    expire: { type: 'integer', defaultsTo: 0 },  // 0 表示不过期,过期时间的秒数
    createBy: { model: 'Admin' },
    canDelete: { type: 'boolean', defaultsTo: true }, // 是否可以删除.
    site: { model: 'Site' },
    containers: { collection: 'container', via: 'ship' },
  },

  beforeCreate: function (values, next) {
    // site + domain
    ModelService.createCheck(Ship, values, next);
  },

  beforeDestroy: function (query, next) {
    ModelService.destroyCheck(Ship, query, next);
  },
};

