/**
 * Created by liuxing on 16/6/28.
 */

let { count } = ModelService;

/**
 * @api {GET} /api/:site/ship/:uuidOrDomain getShip
 * @apiName getShip
 * @apiGroup Client
 * @apiDescription 获取页面包含的所有容器
 *
 * @apiParam {string} site 站点域名
 * @apiParam {string} uuidOrDomain 页面uuid或域名
 * @apiParamExample Example:
 *  /api/mcare/ship/index
 *
 * @apiSuccess (200) {Object} Ship
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    containerDomain1: [component],
 *    containerDomain2: [component],
 *    ...
 *  }
 *
 * @apiPermission Anyone
 */
function getShip(req, res) {
  let site = req.site.id;
  let uuidOrDomain = req.params.uuidOrDomain;

  return ShipService.getShip(site, uuidOrDomain).then((result) => {
    if (!result) {
      return res.notFound('ship not found');
    }

    res.ok(result);
  }).catch(err => {
    sails.log.error(err);
    res.serverError();
  });
}

/**
 * @api {Post} /api2/ship/copy copyShip
 * @apiName copyShip
 * @apiGroup Admin
 * @apiDescription 复制页面到其他站点，及其下的容器和组件
 *
 * @apiParam {string} uuid 被复制的目标uuid
 * @apiParam {int} toSite 复制到哪个站点的ID
 *
 * @apiParamExample Example:
 *  post /api2/ship/copy
 *  body: {
 *    "uuid": "83ccfb31-030b-412c-a917-073ba059fcfb",
 *    "toSite": 5
 *  }
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    result: true
 *  }
 *
 * @apiPermission Admin
 */
function copy(req, res) {
  return ModelService.genCopyAction(req, res);
}

export default {
  getShip,
  count,
  copy,
};
