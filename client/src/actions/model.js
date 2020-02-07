/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  6/7/16
 * @description
 */

import api from '../api';
import * as types from '../constants/model';

export const fetchModel = (model, pagination, params = {}) => ({
  type: types.FETCH_MODEL,
  payload: {
    promise: api.get(`/api2/${model}`, {
      params,
    }),
  },
  meta: {
    pagination,
  },
});

export const fetchModelCountAndData = (model, pagination, params = {}) => dispatch => dispatch({
  type: types.FETCH_MODEL_COUNT_AND_DATA,
  payload: {
    promise: Promise.all([
      api.get(`/api2/${model}`, {
        params,
      }),
      api.get(`/api2/${model}/count`, {
        params: {
          where: params.where,
        },
      }),
    ]).then(([first, second]) => ({
      items: first.data,
      pagination: Object.assign({}, pagination, {
        total: second.data.count,
      }),
    })),
  },
});

export const fetchModelCount = (model, pagination, params = {}) => ({
  type: types.FETCH_MODEL_COUNT,
  payload: {
    promise: api.get(`/api2/${model}/count`, {
      params: {
        where: params.where,
      },
    }),
  },
  meta: {
    pagination,
  },
});

export const deleteModel = (model, id, index) => ({
  type: types.DELETE_MODEL,
  payload: {
    promise: api.del(`/api2/${model}/${id}`),
  },
  meta: {
    index,
  },
});

export const refreshModel = state => ({
  type: 'REFRESH_MODEL',
  state,
});
