/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/6/30
 * @description
 *
 */

import { v4 } from 'node-uuid';

export default {
  schema: true,
  tableName: 'admin',
  identity: 'Admin',

  attributes: {
    uuid: { type: 'string', size: 36, unique: true, index: true, defaultsTo: v4, },
    username: { type: 'string', size: 50, required: true },
    avatar: { type: 'string', size: 255 },
    tel: { type: 'string', numeric: true },
    email: { type: 'email', size: 50, unique: true, required: true },
    status: { type: 'integer', enum: [0, 1], defaultsTo: 1 }, // 1:正常; 0:冻结
    isSuper: { type: 'boolean', defaultsTo: false }, // 是否为超级管理员
    sites: { collection: 'site', via: 'admins', dominant: true }, // 该管理员可管理哪些站点
  },

  constant: {
    status: {
      NORMAL: 1,
      DELETE: 0,
    },
  },
};
