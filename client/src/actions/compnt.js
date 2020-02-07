/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/7
 * @description
 *
 */

import api from '../api';

export const CREATE_COMPONENT = 'CREATE_COMPONENT';
export const CREATE_COMPONENT_PENDING = 'CREATE_COMPONENT_PENDING';
export const CREATE_COMPONENT_SUCCESS = 'CREATE_COMPONENT_SUCCESS';
export const CREATE_COMPONENT_ERROR = 'CREATE_COMPONENT_ERROR';

export const FETCH_COMPONENT = 'FETCH_COMPONENT';
export const FETCH_COMPONENT_SUCCESS = 'FETCH_COMPONENT_SUCCESS';

export const UPDATE_COMPONENT = 'UPDATE_COMPONENT';
export const UPDATE_COMPONENT_PENDING = 'UPDATE_COMPONENT_PENDING';
export const UPDATE_COMPONENT_SUCCESS = 'UPDATE_COMPONENT_SUCCESS';
export const UPDATE_COMPONENT_ERROR = 'UPDATE_COMPONENT_ERROR';

export const createComponent = (formData) => {
  return {
    type: CREATE_COMPONENT,
    payload: {
      promise: api.post('/api2/component', {
        data: formData,
      }),
    },
  };
};

export const fetchComponent = (id) => {
  return {
    type: FETCH_COMPONENT,
    payload: {
      promise: api.get(`/api2/component/${id}`),
    },
  };
};

export const updateComponent = (id, formData) => {
  return {
    type: UPDATE_COMPONENT,
    payload: {
      promise: api.put(`/api2/component/${id}`, {
        data: formData,
      }),
    },
  };
};
