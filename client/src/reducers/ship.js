/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/6
 * @description
 *
 */

import {
  CREATE_SHIP_PENDING,
  CREATE_SHIP_SUCCESS,
  CREATE_SHIP_ERROR,

  FETCH_SHIP_SUCCESS,

  UPDATE_SHIP_PENDING,
  UPDATE_SHIP_SUCCESS,
  UPDATE_SHIP_ERROR } from '../actions/ship';

const initialState = {
  isCreating: false,
  createSuccess: false,
  hasError: false,
  errorMessage: '',
  shipData: {},
};

const ship = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_SHIP_PENDING:
      return {
        ...initialState,
        isCreating: true,
      };
    case CREATE_SHIP_SUCCESS:
      return {
        ...initialState,
        createSuccess: true,
      };
    case CREATE_SHIP_ERROR:
      return {
        ...initialState,
        hasError: true,
        errorMessage: action.payload.message.summary || action.payload.message,
      };
    case FETCH_SHIP_SUCCESS: {
      const { domain, description, publish, expire, site, canDelete, title } = action.payload.data;
      return {
        ...initialState,
        shipData: {
          title,
          domain,
          description,
          publish,
          expire,
          canDelete,
          site,
        },
      };
    }
    case UPDATE_SHIP_PENDING:
      return {
        ...state,
        isCreating: true,
        createSuccess: false,
        hasError: false,
      };
    case UPDATE_SHIP_SUCCESS:
      return {
        ...state,
        isCreating: false,
        createSuccess: true,
        hasError: false,
      };
    case UPDATE_SHIP_ERROR:
      return {
        ...state,
        isCreating: false,
        createSuccess: false,
        hasError: true,
        errorMessage: action.payload.message.summary || action.payload.message,
      };

    default:
      return state;
  }
};

export default ship;

