/**
 * Created by liuxing on 16/6/28.
 */

let { count } = ModelService;
let { bannedAction } = UtilService;
const ALLOW_ACTIONS = ['add', 'remove'];

/**
 * 创建Site
 * @param req
 * @param res
 */
function create(req, res) {
  let data = req.body;
  data.createBy = req.session.user; // 当前登录用户

  Site.create(data).then((site) => {
    req.session.sites.push(site.id); // 当前站点设置到登录用户系统.
    site.admins.add(req.session.user);

    return site.save().then(() => res.json(site));
  }).catch(err => {
    sails.log.error(err);
    res.serverError();
  });
}

/**
 * @api {PUT} /api2/site/admins/:action manageAdmins
 * @apiName manageAdmins
 * @apiGroup Admin
 * @apiDescription 为站点添加或移除管理员
 *
 * @apiParam {string="add", "remove"} action 操作
 * @apiParam {string} site 站点域名
 * @apiParam {string} adminUUID 管理员UUID
 * @apiParamExample Example:
 *  put /api2/site/admins/add
 *  put /api2/site/admins/remove
 *  body {
 *    "site": "mcare",
 *    "adminUUID": "f858f974-03ea-4327-9e36-b87c3ddbe8c3"
 *  }
 *
 * @apiSuccess {Object} response
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "code": 200,
 *    "data": {
 *      "result": true
 *    }
 *  }
 *
 * @apiPermission Admin
 *
 */
function manageAdmins(req, res) {
  let site = req.site.id;
  let adminUUID = req.body.adminUUID; //被移除用户UUID
  let operator = req.session.admin;
  let action = req.params.action;

  if (!adminUUID) {
    return res.badRequest('adminUUID is required');
  }

  if (!_.includes(ALLOW_ACTIONS, action)) {
    return res.badRequest(`${action}: action type not allowed`);
  }

  SiteService.manageAdmins(action, operator, site, adminUUID).then((result) => {
    res.ok({ result });
  }).catch(err => {
    if (err.code === 403) {
      return res.forbidden(err.message);
    }

    if (err.code === 400) {
      return res.badRequest(err.message);
    }

    sails.log.error(err);
    res.serverError();
  });
}

/**
 * @api {GET} /api2/site/checkDomain checkDomain
 * @apiName checkDomain
 * @apiGroup Admin
 * @apiDescription 检查站点域名是否已存在
 *
 * @apiParam {string} domain 站点域名
 * @apiParamExample: Example
 *  get /api2/site/checkDomain?domain=wan
 *
 * @apiSuccess {Object} response
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "code": 200,
 *    "data": {
 *      "isExist": true
 *    }
 *  }
 */
function checkDomain(req, res) {
  let domain = req.query.domain;

  if (!domain) {
    return res.badRequest('domain is required');
  }

  Site.findOne({ domain }).then(site => {
    return res.ok({ isExist: !!site });
  }).catch(err => {
    sails.log.error(err);
    res.serverError();
  });
}

export default {
  count,
  manageAdmins,
  remove: bannedAction,
  add: bannedAction,
  checkDomain,
};
