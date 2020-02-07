/**
 * size.js
 *
 * @description :: T
 * * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

import { v4 } from 'node-uuid';

export default {
  schema: true,
  identity: 'site',
  globalId: 'Site',
  attributes: {
    uuid: { type: 'string', defaultsTo: v4, unique: true, required: true },
    title: { type: 'string', size: 100 },
    domain: { type: 'string', size: 50, unique: true, required: true, minLength: 3 },
    cover: { type: 'string', size: 300 }, // 封面图片
    images: { type: 'array' },
    description: { type: 'string', size: 300 },
    publish: { type: 'boolean', defaultsTo: true },
    expire: { type: 'integer', defaultsTo: 0 },  // 0 表示不过期,过期时间的秒数
    data: { type: 'json' },
    createBy: { model: 'Admin' },
    ships: { collection: 'ship', via: 'site' },
    admins: { collection: 'admin', via: 'sites' },
  },
  beforeCreate: function (values, next) {
    if (!values.createBy) {
      return next(new Error('Site\'owner is required!'));
    }

    // 可能是 Object { User }
    let userID = (typeof values.createBy === 'number') ? values.createBy : values.createBy.id;
    Site.findOne({ domain: values.domain, createBy: userID }).then((model) => {
      if (model) {
        return next(new Error('site domain is not unique!'));
      }

      return next();
    }).catch(next);
  },
};

