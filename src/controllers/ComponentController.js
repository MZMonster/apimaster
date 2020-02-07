/**
 * Created by liuxing on 16/6/28.
 */

let { count } = ModelService;

/**
 * @api {GET} /api/:site/component/:uuidOrDomain getComponent
 * @apiName getComponent
 * @apiGroup Client
 * @apiDescription 获取组件的详情
 *
 * @apiParam {string} site 站点域名
 * @apiParam {string} uuidOrDomain 组件uuid或域名
 * @apiParamExample Example:
 *  /api/mcare/component/support
 *
 * @apiSuccess (200) {Object} Component
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  ￼{
 *     "title": "售后支持",
 *     "domain": "image1",
 *     "weight": 100,
 *     "container": 1,
 *     "uuid": "f8b5feff-203d-42cd-bab7-871070ef46fb",
 *     "publish": true,
 *     "expire": 0,
 *     "createdAt": "2016-06-28T06:21:24.961Z",
 *     "updatedAt": "2016-06-28T06:21:24.961Z",
 *     "id": 2
 *   }
 *
 * @apiPermission Anyone
 */
function getComponent(req, res) {
  let site = req.site.id;
  let uuidOrDomain = req.params.uuidOrDomain;

  return ComponentService.getComponent(site, uuidOrDomain).then((result) => {
    res.ok(result);
  }).catch(err => {
    sails.log.error(err);
    res.serverError();
  });
}

/**
 * @api {Post} /api2/component/copy copycomponent
 * @apiName copycomponent
 * @apiGroup Admin
 * @apiDescription 复制组件到其他容器中
 *
 * @apiParam {string} uuid 被复制的目标uuid
 * @apiParam {int} toSite 复制到哪个站点的ID
 * @apiParam {int} toShip 复制到哪个页面的ID
 * @apiParam {int} toContainer 复制到哪个容器的ID
 *
 * @apiParamExample Example:
 *  post /api2/component/copy
 *  body: {
 *    "uuid": "83ccfb31-030b-412c-a917-073ba059fcfb",
 *    "toSite": 5,
 *    "toShip": 42,
 *    "toContainer": 68
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
  getComponent,
  count,
  copy,
};
