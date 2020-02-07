/* eslint-disable */

export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
}

export function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length == 2) return parts.pop().split(';').shift();
}

export function getParams(pagination, filters = {}, sorter = {}, params = {}) {
  let where = params.where || {};
  let body = params.body;
  console.debug('util', params);
  params = {
    where: { ...where },
    ...body,
    limit: pagination.pageSize || 2,
    skip: ((pagination.current || 1) - 1) * (pagination.pageSize || 1),
  };

  if (sorter.field) {
    let order = sorter.order == 'descend' ? 'desc' : 'asc';
    params.sort = sorter.field + ' ' + order;
  }

  for (let key in filters) {
    if (filters.hasOwnProperty(key) && filters[key].length) {
      params.where[key] = [...filters[key]];
    }
  }

  params.where = JSON.stringify(params.where);
  return params;
}

export function formatDate(dateString) {
  var date = new Date(dateString);
  var day = date.getFullYear() + '-' + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-'
    + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()) + ' ';
  var time = (date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()) + ':'
    + (date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) + ':'
    + date.getSeconds();
  return day + time;
}

export function isPhoneNumber(phone) {
  return !!/^1[3|4|5|7|8][0-9]{9}$/.test(phone);
}

export function isEmail(email) {
  return !!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email);
}
