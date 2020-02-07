/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/7/5
 * @description
 *
 */

import crypto from 'crypto';
import path from 'path'
let dirPattern = /(?=^[\/])?\w+(\/?\w+)*(?=[\/]$)?/g; // 提取目录名,去掉前后'/'
const BUCKET = process.env.UPYUN_BUCKET;
const SECRET_KEY = process.env.UPYUN_SECRET_KEY;
const OSS = require('ali-oss');
let client = new OSS({
  region: 'oss-cn-hangzhou',
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
  accessKeyId: 'xx',
  accessKeySecret: 'xx',
  bucket: 'xxx',
  secure: true
});

/**
 * @api {get} /api2/upload/params uploadParams
 * @apiName uploadParams
 * @apiGroup Admin
 * @apiDescription 根据需要上传的文件名获取又拍云的policy和signature
 *
 * @apiParam {String} dir 上传目标目录, 为空则默认为当前日期(年月日)目录
 * @apiParamExample
 *  /api2/upload/params?dir=/images/20160706
 *
 * @apiSuccess (200) {Object} Container
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "code": 200,
 *    "data": {
 *      "policy": "eyJidWNrZXQiOiJ3YW4tcHJvIiwiZXhwaXJhdGlvbiI6MTQ2Nzc3NTI0OSwic2F2ZS1rZXkiOiIvaW1hZ2UvMjAxMjM0Ni9jYjhjMDUwMi02YmIyLTQ1NzItYTA5NC1mYjdlNjBlOThiZDQuanBnIn0=",
 *      "signature": "ae7b27239a80261b0b7109ec4e99132e"
 *    }
 *  }
 *
 * @apiPermission Admin
 */
function getUploadParams(req, res) {
  let dir = req.param('dir') || ''; // 保存文件夹

  // 规范化文件夹前缀, 未定义文件夹则默认为日期文件夹
  let match = dir.match(dirPattern);
  if (match) {
    dir = `/${match[0]}`;
  } else {
    dir = `/{year}{mon}{day}`;
  }

  // 计算 policy 和 signature 所需的参数
  // 详情见： http://docs.upyun.com/api/form_api/#表单API接口简介
  let options = {
    bucket: BUCKET,
    expiration: Math.floor(Date.now() / 1000) + 600,  // 过期时间10分钟
    'save-key': `${dir}/{filemd5}{.suffix}`,  // 详情见: http://docs.upyun.com/api/form_api/#1save-key
  };
  let policy = new Buffer(JSON.stringify(options)).toString('base64');
  let signature = crypto.createHash('md5').update(`${policy}&${SECRET_KEY}`).digest('hex');

  return res.ok({
    bucket: BUCKET,
    policy,
    signature,
  });
}
 function uploadImage(req, res) {
  var dir = req.param('dir') || ''; // 保存文件夹

  // 规范化文件夹前缀, 未定义文件夹则默认为日期文件夹
  var match = dir.match(dirPattern);
  if (match) {
    dir = '/' + match[0];
  } else {
    dir = '/{year}{mon}{day}';
  }

  var img = dir + '/{filemd5}{.suffix}';


  req.file('file').upload(function (err, uploadedFiles) {
    if (err) return res.serverError(err);
    console.log(uploadedFiles);
    if (!uploadedFiles[0] || !uploadedFiles[0].fd){
      return res.json({
        code: 400,
        data: 'no file found'
      })
    }
    let filename = uploadedFiles[0].fd;
    let osspath = 'apimaster/' + new Date().getMonth()+new Date().getDay() + '/' + filename;
    
    // save to oss
    const filepath = path.resolve(__dirname, '../../.tmp/uploads/' + filename);

    client.put(osspath, filepath).then((result) => {
      let url = result && result.url || ''
      url = url.replace('https://xxxx-public-files.oss-cn-hangzhou.aliyuncs.com','https://downloads.xxxx.com')   // todo
      return res.json({
        code:200,
        url
      });
    }).catch(function(err){
      return res.json({
        code: 500,
        err: err.stack
      })
    });

  });
}





export default {
  getUploadParams,
  uploadImage
};
