/**
 * Created by liuxing on 16/6/28.
 */

let { count } = ModelService;
const PAGE_NUMBER = 20; // 每页默认数量

/**
 * @api {GET} /api/:site/container/:uuidOrDomain getContainer
 * @apiName getContainer
 * @apiGroup Client
 * @apiDescription 获取容器及其下属的所有组件
 *
 * @apiParam {string} site 站点域名
 * @apiParam {string} uuidOrDomain 容器uuid或域名
 * @apiParam {int} page=1 组件分页页码
 * @apiParam {int} limit=20 组件分页每页条数
 * @apiParamExample Example:
 *  /api2/mcare/container/menus
 *
 * @apiSuccess (200) {string} title  容器标题
 * @apiSuccess (200) {int} limit  组件分页每页条数
 * @apiSuccess (200) {int} page  组件分页页码
 * @apiSuccess (200) {bool} hasMorePage  是否有下一页
 * @apiSuccess (200) {Array} components  组件列表
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "uuid": "e1aa3b18-2473-4455-a997-bb2d4682cf45",
 *    "title": "主页banner",
 *    "domain": "index1",
 *    "cover": null,
 *    "description": null,
 *    "publish": true,
 *    "expire": 0,
 *    "weight": 0,
 *    "images": null,
 *    "data": {JSON Object},
 *    "id": 1,
 *    "createdAt": "2016-06-28T06:07:48.000Z",
 *    "updatedAt": "2016-06-28T06:07:48.000Z",
 *    "limit": 20,
 *    "page": 1,
 *    "hasMorePage": true,
 *    "components": [
 *      {Component},
 *      {Component},
 *      {Component}
 *    ]
 *  }
 *
 * @apiPermission Anyone
 */
function getContainer(req, res) {
  let site = req.site.id;
  let page = req.query.page || 1;  // component 分页
  let limit = +req.query.limit || PAGE_NUMBER;
  let uuidOrDomain = req.params.uuidOrDomain;
  let result = {};
  ContainerService.getContainer(site, uuidOrDomain).then((container) => {
    if (!container) {
      throw new Error('NotFound');
    }

    let query = {
      where: {
        site: site,
        container: container.id,
        publish: true,
      },
      sort: { weight: 0 },
      skip: (page - 1) * limit,
      limit: limit,
    };
    Object.assign(result, container);
    return Component.find(query);
  }).then((components) => {
    result.components = components;
    result.page = page;
    result.limit = limit;
    result.hasMorePage = limit == components.length;
    return res.ok(result);
  }).catch(err => {
    sails.log.error(err);
    res.json({});
  });
}

/**
 * @api {Post} /api2/container/copy copycontainer
 * @apiName copycontainer
 * @apiGroup Admin
 * @apiDescription 复制容器及其下的组件到其他页面中
 *
 * @apiParam {string} uuid 被复制的目标uuid
 * @apiParam {int} toSite 复制到哪个站点的ID
 * @apiParam {int} toShip 复制到哪个页面的ID
 *
 * @apiParamExample Example:
 *  post /api2/container/copy
 *  body: {
 *    "uuid": "83ccfb31-030b-412c-a917-073ba059fcfb",
 *    "toSite": 5,
 *    "toShip": 42
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

/**
 * @api {get} /api/site/:site/container/:uuidOrDomain/search?keyword=:keyword searchComponent
 * @apiName searchComponent
 * @apiGroup Client
 * @apiDescription 搜索容器下的组件
 *
 * @apiParam {string} site 站点域名
 * @apiParam {string} uuidOrDomain 容器uuid或域名
 * @apiParam {string} keyword 关键字
 * @apiParam {int} page=1 页码
 * @apiParam {int} limit=20 每页条数
 * @apiParamExample Example:
 *  /api2/mcare/container/issues/search?keyword=爆屏&page=1&limit=20
 *
 * @apiSuccess (200) {int} limit  组件分页每页条数
 * @apiSuccess (200) {int} page  组件分页页码
 * @apiSuccess (200) {bool} hasMorePage  是否有下一页
 * @apiSuccess (200) {Array} components  组件列表
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "limit": 10,
 *    "page": 1,
 *    "hasMorePage": true,
 *    "components": [components],
 *  }
 *
 * @apiPermission Anyone
 */
function search(req, res) {
  let site = req.site.id;
  let uuidOrDomain = req.params.uuidOrDomain;
  let keyword = req.query.keyword || '';
  let page = +req.query.page || 1;  // 搜索结果分页
  let limit = +req.query.limit || PAGE_NUMBER;

  keyword = keyword.trim();
  if (!keyword || keyword.length < 2) { // 不接受小于2个字符的搜索
    return res.ok({
      limit, page,
      hasMorePage: false,
      components: [],
    });
  }

  return ContainerService.search(site, uuidOrDomain, keyword, page, limit).then(result => {
    res.ok(result);
  }).catch(err => {
    sails.log.error(err);
    res.json({});
  });
}

export default {
  getContainer,
  count,
  copy,
  search,
};
