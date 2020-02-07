/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  3/8/16
 * @description
 */

import api from '../api';
import * as types from '../constants/admin';

export const fetchAdmins = id => ({
  type: types.FETCH_ADMINS,
  payload: {
    promise: api.get(`/api2/site/${id}`, {
      params: {
        populate: 'admins',
      },
    })
  },
});

export const createAdmin = formData => ({
  type: types.CREATE_ADMIN,
  payload: {
    promise: api.post(`/api2/admin`, {
      data: formData
    })
  }
});

export const setAdmin = (siteDomain, adminUUID, admin) => ({
  type: types.SET_ADMIN,
  payload: {
    promise: api.put(`/api2/site/admins/add`, {
      data: {
        adminUUID,
        site: siteDomain,
      },
    }),
  },
  meta: {
    admin: admin
  }
});

export const removeAdmin = (siteDomain, adminUUID, id) => ({
  type: types.REMOVE_ADMIN,
  payload: {
    promise: api.put(`/api2/site/admins/remove`, {
      data: {
        adminUUID,
        site: siteDomain
      },
    }),
  },
  meta: {
    id: id
  }
});

export const searchAdmins = (email) => ({
  type: `${types.SEARCH_ADMINS}`,
  payload: api.get(`/api2/admin`, {
    params: {
      where: `{"email": {"contains": "${email}"}}`
    }
  })
});
