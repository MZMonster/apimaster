/**
 * Created by liuxing on 16/6/29.
 */

var	path = require('path');
var viewPath = path.join(__dirname, '../../client/dist/');
var devViewPath = path.join(__dirname, '../../client/src/');

var fs = require('fs'),
    _  = require('lodash'),
    emberApp = path.resolve(__dirname, '../../client/dist/assets/index.html');

function test(req,res) {
  const credentials = req.body;
  console.log(credentials);
  if(credentials.user==='admin' && credentials.password==='123456'){
    res.cookie('uid', '1', {domain:'localhost'});
    res.json({'user': credentials.user, 'role': 'ADMIN', 'uid': 1});
  }else{
    res.status('500').send({'message' : 'Invalid user/password'});
  }
}



/**
 * 后台 /admin 渲染
 * @param req
 * @param res
 */
function admin(req, res) {
  if (!req.session.admin) {
    return res.redirect('/admin/login.html');
  }

  fs.exists(emberApp + '', function (exists) {
    if (!exists) {
      return res.notFound('The requested file does not exist.');
    }
    fs.createReadStream(emberApp).pipe(res);
  });
}

export default {
  test: test,
  admin: admin
}