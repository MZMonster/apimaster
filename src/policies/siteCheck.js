/**
 * Copyright (c) 2016 Meizu MeiWanBang, All rights reserved.
 * http://wan.meizu.com/
 * @author wuyanxin
 * @date  16/6/29
 * @description
 *
 */

export default function (req, res, next) {
  let domain = req.param('site');

  if (!domain) {
    return res.badRequest('site domain is required');
  }

  Site.findOne({ domain }).then((site) => {
    if (!site) {
      return res.badRequest('site no found');
    }

    req.site = site;
    next();
  });
}
