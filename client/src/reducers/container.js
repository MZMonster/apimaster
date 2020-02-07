/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/5
 * @description
 *
 */

import {
  CREATE_CONTAINER_PENDING,
  CREATE_CONTAINER_SUCCESS,
  CREATE_CONTAINER_ERROR,

  FETCH_CONTAINER_SUCCESS,

  UPDATE_CONTAINER_PENDING,
  UPDATE_CONTAINER_SUCCESS,
  UPDATE_CONTAINER_ERROR,

  MODIFY_COVER,
} from '../actions/container';

import { FETCH_SHIP_LIST_SUCCESS } from '../actions/ship';

import { FETCH_UPLOAD_PARAMS_SUCCESS } from '../actions/upload';

const initialState = {
  isCreating: false,
  createSuccess: false,
  hasError: false,
  errorMessage: '',
  containerData: {},
  shipList: [],
  uploadParams: {},
};

const container = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_CONTAINER_PENDING:
      return {
        ...initialState,
        isCreating: true,
      };
    case CREATE_CONTAINER_SUCCESS:
      return {
        ...initialState,
        createSuccess: true,
      };
    case CREATE_CONTAINER_ERROR:
      return {
        ...initialState,
        hasError: true,
        errorMessage: action.payload.message.summary || action.payload.message,
      };
    case FETCH_CONTAINER_SUCCESS:
      return {
        ...state,
        containerData: action.payload.data,
      };
    case FETCH_SHIP_LIST_SUCCESS:
      return {
        ...state,
        shipList: action.payload.data.map((e) => {
          const { id, domain, createBy, site } = e;
          return {
            id,
            domain,
            createBy,
            site,
          };
        }),
      };
    case FETCH_UPLOAD_PARAMS_SUCCESS:
      return {
        ...state,
        uploadParams: action.payload.data,
      };
    case UPDATE_CONTAINER_PENDING:
      return {
        ...state,
        isCreating: true,
        createSuccess: false,
        hasError: false,
      };
    case UPDATE_CONTAINER_SUCCESS:
      return {
        ...state,
        isCreating: false,
        createSuccess: true,
        hasError: false,
      };
    case UPDATE_CONTAINER_ERROR:
      return {
        ...state,
        isCreating: false,
        createSuccess: false,
        hasError: true,
        errorMessage: action.payload.message.summary || action.payload.message,
      };
    case MODIFY_COVER:
      return {
        ...state,
        containerData: {
          ...state.containerData,
          cover: action.coverUrl,
        },
      };
    default:
      return state;
  }
};

export default container;
