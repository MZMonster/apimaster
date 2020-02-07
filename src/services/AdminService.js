/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/6/30
 * @description
 *
 */

let _ = require('lodash');
let uuid = require('node-uuid');
let jwt = require('jsonwebtoken');
let Promise = require('bluebird');
let nodemailer = require('nodemailer');

let mailConfig = {
  host: process.env.EMAIL_HOST,
  user: process.env.EMAIL_USER,
  username: process.env.EMAIL_USERNAME,
  passwd: process.env.EMAIL_PASSWD,
  siteName: process.env.SITE_NAME,
  siteHost: process.env.SITE_HOST,
};

let email = `smtps://${mailConfig.user}:${mailConfig.passwd}@${mailConfig.host}`;
email = email.replace('@', '%40');
var transporter = nodemailer.createTransport(email);

/**
 * 登录
 * @param req
 * @returns {*}
 */
function login(req) {
  let email = req.param('email');

  if (!email) {
    let err = new Error('email is required');
    err.code = 400;
    throw err;
  }

  return Admin.findOne({
    email,
    status: Admin.constant.status.NORMAL,
  }).then(admin => {
    if (!admin) {
      let err = new Error('用户不存在');
      err.code = 404;
      throw err;
    }

    return [
      _createToken(admin, req),
      admin,
    ];
  }).spread((token, admin) => {

    return sendMail(admin.email, token);
  });
}

/**
 * 验证邮箱配置
 */
function verifyEmailConfig() {
  transporter.verify(error => {
    if (error) {
      sails.log.error('Email config fail. ');
      sails.log.error('Admin can not access the AdminUI through email, please fix it!');
      sails.log.error(error);
    } else {
      sails.log.info('Email config completed.');
    }
  });
}

/**
 *
 * @param email
 * @param token
 * @returns {bluebird|exports|module.exports}
 */
function sendMail(email, token) {
  return renderMailContent(token).then(content => {
    var mailOptions = {
      from: `"${mailConfig.username}"<${mailConfig.user}>`, // sender address
      to: email, // list of receivers
      subject: '管理员登录', // Subject line
      html: content,
    };

    return new Promise(function (resolve, reject) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          sails.log.error(error);
          let err = new Error('邮件发送失败,请重新登录或联系管理员!');
          err.name = 'EmailSendError';
          return reject(err);
        }

        sails.log(info);
        resolve({ success: true });
      });
    });
  });

}

/**
 * 渲染登录邮件内容
 * @param token
 * @returns {bluebird|exports|module.exports}
 */
function renderMailContent(token) {
  let data = {
    token,
    siteName: mailConfig.siteName,
    siteHost: mailConfig.siteHost,
  };

  return new Promise((resolve, reject) => {
    sails.renderView('partials/loginEmail', data, (err, html) => {
      if (err) {
        return reject(err);
      }

      return resolve(html);
    });
  });
}

/**
 * 生成token
 * @param admin
 * @param req
 * @returns {*}
 * @private
 */
function _createToken(admin, req) {
  let secretKey = uuid.v4();
  let data = { id: admin.id };
  let token = jwt.sign(data, secretKey, { expiresIn: 300 });

  if (req.session) {
    req.session.accessToken = token;
    req.session.secretKey = secretKey;
  } else {
    req.session = {
      accessToken: token,
      secretKey,
    };
  }

  return token;
}

/**
 * 验证token
 * @param req
 * @private
 */
function _verifyToken(req) {
  try {
    let decode = jwt.verify(req.session.accessToken, req.session.secretKey);
    delete req.session.accessToken;
    delete req.session.secretKey;
    return decode;
  } catch (e) {
    sails.log.error('accessToken', req.session.accessToken);
    sails.log.error('secretKey', req.session.secretKey);
    throw e;
  }
}

/**
 * 验证登录
 * @param req
 * @param res
 */
function loginVerify(req, res) {
  let token = req.query.token;

  if (!token || token !== req.session.accessToken) {
    let err = new Error('登录Token无效');
    err.code = 400;
    return res.badRequest(err);
  }

  let decode;
  try {
    decode = _verifyToken(req);
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      sails.log.error('登录Token超时');
      let err = new Error('登录Token超时,请重新登录');
      err.code = 400;
      return res.badRequest(err);
    }

    sails.log.error(e);
    return res.serverError('登录Token无效');
  }

  return Admin.findOne(decode.id).populate('sites').then(admin => {
    if (!admin) {
      return res.badRequest(new Error('登录失败, 用户不存在'));
    }

    req.session.admin = admin;
    req.session.user = admin.id;
    req.session.sites = _.map(admin.sites, 'id');

    // action log
    ActionLog.create({
      model: 'admin',
      action: 'login',
      target: admin.id,
      admin: admin.id,
    }).catch(err => {
      sails.log.error(err);
    });

    res.redirect('/admin');

  });
}

verifyEmailConfig();  // 启动时验证邮箱配置

export default {
  login,
  sendMail,
  loginVerify,
};
