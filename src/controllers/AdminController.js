/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/6/30
 * @description
 *
 */

let { bannedAction } = UtilService;

function loginPage(req, res) {
  res.view('partials/login', { layout: 'login' });
}

function login(req, res) {
  AdminService.login(req).then(() => {
    res.ok(`请查看您的邮箱${req.param('email')}, 并通过邮件中的链接登录. (注意: 邮件有可能会被您的邮件服务商放垃圾箱)`);
  }).catch(err => {
    sails.log.error(err);

    if (err.code === 400) {
      return res.badRequest(err.message);
    }

    if (err.code === 404) {
      return res.notFound(err.message);
    }

    if (err.name === 'EmailSendError') {
      return res.serverError(err.message);
    }

    res.serverError();
  });
}

function loginVerify(req, res) {
  return AdminService.loginVerify(req, res);
}

function logout(req, res) {
  if (!req.session.admin) {
    return res.redirect('/admin/login.html');
  }

  delete req.session.admin;
  res.redirect('/admin/login.html');
}

/**
 * 软删除
 * @param req
 * @param res
 * @returns {*}
 */
function destroy(req, res) {
  if (!req.body.id) {
    return res.badRequest('id is required');
  }

  Admin.update({ id: req.body.id }, { status: Admin.constant.status.DELETE }).then(() => {
    res.ok();
  }).catch(err => {
    sails.log.error(err);
    res.serverError();
  });
}

export default {
  loginPage,
  login,
  loginVerify,
  logout,
  destroy,
  add: bannedAction,
  remove: bannedAction,
};
