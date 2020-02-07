/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/6
 * @description
 *
 */

import api from '../api';

export const CREATE_SHIP = 'CREATE_SHIP';
export const CREATE_SHIP_PENDING = 'CREATE_SHIP_PENDING';
export const CREATE_SHIP_SUCCESS = 'CREATE_SHIP_SUCCESS';
export const CREATE_SHIP_ERROR = 'CREATE_SHIP_ERROR';

export const FETCH_SHIP = 'FETCH_SHIP';
export const FETCH_SHIP_SUCCESS = 'FETCH_SHIP_SUCCESS';

export const FETCH_SHIP_LIST = 'FETCH_SHIP_LIST';
export const FETCH_SHIP_LIST_SUCCESS = 'FETCH_SHIP_LIST_SUCCESS';

export const UPDATE_SHIP = 'UPDATE_SHIP';
export const UPDATE_SHIP_PENDING = 'UPDATE_SHIP_PENDING';
export const UPDATE_SHIP_SUCCESS = 'UPDATE_SHIP_SUCCESS';
export const UPDATE_SHIP_ERROR = 'UPDATE_SHIP_ERROR';

export const createShip = formData => ({
  type: CREATE_SHIP,
  payload: {
    promise: api.post('/api2/ship', {
      data: formData,
    }),
  },
});

export const fetchShip = id => ({
  type: !id.match(/=/) ? FETCH_SHIP : FETCH_SHIP_LIST,
  payload: {
    promise: api.get(`/api2/ship${!id.match(/=/) ? `/${id}` : `?${id}`}`),
  },
});

export const updateShip = (id, formData) => ({
  type: UPDATE_SHIP,
  payload: {
    promise: api.put(`/api2/ship/${id}`, {
      data: formData,
    }),
  },
});

