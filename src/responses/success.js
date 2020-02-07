/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String} view
 *          - pass string to render specified view
 */

module.exports = function success(data, view) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.success() :: Sending 200 ("OK") response');

  // Set status code
  res.status(200);

  // If appropriate, serve data as JSON(P)
  if (req.wantsJSON) {
    return res.jsonx(data);
  }

  // work, just send JSON.
  if (typeof view === 'string') {
    return res.view(view, data);
  }

  // If no second argument provided, try to serve the implied view,
  // but fall back to sending JSON(P) if no view can be inferred.
  else return res.guessView({ data: data }, function couldNotGuessView() {
    return res.jsonx(data);
  });

};
