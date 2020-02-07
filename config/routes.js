/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  // '/': {

  //   // /api2/xxx 为 sails 自带的 rest 风格 api
  //   // /api/xxx 为给客户端提供的接口
  //   view: 'homepage',
  // },

  // 客户端API
  '/api/:site/container/:uuidOrDomain': {
    controller: 'ContainerController',
    action: 'getContainer',
    cors: true,
  },
  '/api/:site/container/:uuidOrDomain/search': {
    controller: 'ContainerController',
    action: 'search',
    cors: true,
  },
  '/api/:site/component/:uuidOrDomain': {
    controller: 'ComponentController',
    action: 'getComponent',
    cors: true,
  },
  '/api/:site/ship/:uuidOrDomain': {
    controller: 'ShipController',
    action: 'getShip',
    cors: true,
  },

  //**************
  // Admin 路由
  //**************

  // admin login
  'get /admin/login.html': 'AdminController.loginPage',
  'post /admin/login': 'AdminController.login',
  'get /admin/logout': 'AdminController.logout',
  'get /admin/loginVerify': 'AdminController.loginVerify',

  // admin upload
  'get /api2/upload/params': 'UploadController.getUploadParams',
  'post /api2/upload/image': 'UploadController.uploadImage',

  // 添加或移除站点管理员
  'put /api2/site/admins/:action': 'SiteController.manageAdmins',

  // 检查站点域名是否已存在
  'get /api2/site/checkDomain': 'SiteController.checkDomain',

  // 后台UI
  '/admin': 'AuthController.admin',
  '/admin/*': 'AuthController.admin',
};
