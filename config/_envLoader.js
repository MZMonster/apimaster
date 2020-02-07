/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/1
 * @description
 *
 */

require('dotenv').config();

if (!process.env.UPYUN_BUCKET || !process.env.UPYUN_SECRET_KEY) {
  console.warn('又拍云配置缺失, 将无法生成正确的上传签名');
}
