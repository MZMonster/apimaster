/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/5
 * @description
 *
 */

import api from '../api';

export const CREATE_CONTAINER = 'CREATE_CONTAINER';
export const CREATE_CONTAINER_PENDING = 'CREATE_CONTAINER_PENDING';
export const CREATE_CONTAINER_SUCCESS = 'CREATE_CONTAINER_SUCCESS';
export const CREATE_CONTAINER_ERROR = 'CREATE_CONTAINER_ERROR';

export const FETCH_CONTAINER = 'FETCH_CONTAINER';
export const FETCH_CONTAINER_SUCCESS = 'FETCH_CONTAINER_SUCCESS';

export const FETCH_CONTAINER_LIST = 'FETCH_CONTAINER_LIST';
export const FETCH_CONTAINER_LIST_SUCCESS = 'FETCH_CONTAINER_LIST_SUCCESS';

export const UPDATE_CONTAINER = 'UPDATE_CONTAINER';
export const UPDATE_CONTAINER_PENDING = 'UPDATE_CONTAINER_PENDING';
export const UPDATE_CONTAINER_SUCCESS = 'UPDATE_CONTAINER_SUCCESS';
export const UPDATE_CONTAINER_ERROR = 'UPDATE_CONTAINER_ERROR';

export const MODIFY_COVER = 'MODIFY_COVER';

export const createContainer = formData => ({
  type: CREATE_CONTAINER,
  payload: {
    promise: api.post('/api2/container', {
      data: formData,
    }),
  },
});

export const fetchContainer = id => ({
  type: !id.match(/=/) ? FETCH_CONTAINER : FETCH_CONTAINER_LIST,
  payload: {
    promise: api.get(`/api2/container${!id.match(/=/) ? `/${id}` : `?${id}`}`),
  },
});

export const updateContainer = (id, formData) => ({
  type: UPDATE_CONTAINER,
  payload: {
    promise: api.put(`/api2/container/${id}`, {
      data: formData,
    }),
  },
});

export const modifyCover = (coverUrl) => ({
  type: MODIFY_COVER,
  coverUrl,
});
