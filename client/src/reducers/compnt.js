/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/7
 * @description
 *
 */

import {
  CREATE_COMPONENT_PENDING,
  CREATE_COMPONENT_SUCCESS,
  CREATE_COMPONENT_ERROR,

  FETCH_COMPONENT_SUCCESS,

  UPDATE_COMPONENT_PENDING,
  UPDATE_COMPONENT_SUCCESS,
  UPDATE_COMPONENT_ERROR,
} from '../actions/compnt';

import { FETCH_CONTAINER_LIST_SUCCESS } from '../actions/container';
import { FETCH_UPLOAD_PARAMS_SUCCESS } from '../actions/upload';

const initialState = {
  isCreating: false,
  createSuccess: false,
  hasError: false,
  errorMessage: '',
  containerList: [],
  componentData: {},
  uploadParams: {},
};

const component = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_COMPONENT_PENDING:
      return {
        ...initialState,
        isCreating: true,
      };
    case CREATE_COMPONENT_SUCCESS:
      return {
        ...initialState,
        createSuccess: true,
      };
    case CREATE_COMPONENT_ERROR:
      return {
        ...initialState,
        hasError: true,
        errorMessage: action.payload.message.summary || action.payload.message,
      };
    case UPDATE_COMPONENT_PENDING:
      return {
        ...state,
        isCreating: true,
        createSuccess: false,
        hasError: false,
      };
    case UPDATE_COMPONENT_SUCCESS:
      return {
        ...state,
        isCreating: false,
        createSuccess: true,
        hasError: false,
      };
    case UPDATE_COMPONENT_ERROR:
      return {
        ...state,
        isCreating: false,
        createSuccess: false,
        hasError: true,
        errorMessage: action.payload.message.summary || action.payload.message,
      };
    case FETCH_COMPONENT_SUCCESS:
      return {
        ...state,
        componentData: action.payload.data,
      };
    case FETCH_CONTAINER_LIST_SUCCESS:
      return {
        ...state,
        containerList: action.payload.data.map((e) => {
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
    default:
      return state;
  }
};

export default component;

