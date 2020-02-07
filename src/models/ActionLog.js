/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/18
 * @description
 *
 */

export default {
  schema: true,
  tableName: 'actionLog',
  identity: 'ActionLog',

  attributes: {
    model: { type: 'string' },    // 模块名
    action: { type: 'string' },   // 操作 create/update/destroy
    target: { type: 'int' },      // 目标ID
    data: { type: 'json' },       // 请求数据 req.body
    before: { type: 'json' },     // 操作之前记录
    after: { type: 'json' },      // 操作之后记录
    admin: { model: 'Admin' },    // 操作人
  },

};
