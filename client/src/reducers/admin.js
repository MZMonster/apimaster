/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  3/8/16
 * @description
 */


import * as types from '../constants/admin';

export const initialState = {
  message: '',
  loading: false,
  selected: {},
  hasError: false,
  isCreating: false,
  adminData: {},
  createSuccess: false,
  searchAdmins: [],
  admins: [],
};

export default function model(state = initialState, action = {}) {
  state.message = '';

  if (action.type.match(/.*\_PENDING(.*?)$/)) {
    state.hasError = false;
    state.loading = true;
  }

  if (action.type.match(/.*\_SUCCESS(.*?)$/)) {
    state.hasError = false;
    state.loading = false;
  }

  if (action.type.match(/.*\_ERROR(.*?)$/)) {
    state.hasError = true;
    state.loading = false;
  }

  switch (action.type) {
    case `${types.FETCH_ADMINS}_PENDING`:
      return {
        ...state,
      };
    case `${types.FETCH_ADMINS}_SUCCESS`:
      return {
        ...state,
        admins: action.payload.data.admins
      };
    case `${types.FETCH_ADMINS}_ERROR`:
      return {
        ...state,
        message: action.payload.message || '出错了,请重试'
      };

    case `${types.CREATE_ADMIN}_PENDING`:
      return {
        ...state,
        isCreating: true,
      };
    case `${types.CREATE_ADMIN}_SUCCESS`:
      return {
        ...state,
        isCreating: false,
        hasError: false,
        createSuccess: true,
        adminData: action.payload,
      };
    case `${types.CREATE_ADMIN}_ERROR`: {
      let message = '';
      let error = action.payload;

      if (typeof error.message == 'string') {
        message = error.message;
      } else {
        if (error.code == 400) {
          message = '400! 是否邮箱已存在';
        }
      }

      return {
        ...state,
        isCreating: false,
        hasError: true,
        errorMessage: message,
      };
    }
    case `${types.REMOVE_ADMIN}_PENDING`:
      return {
        ...state,
      };
    case `${types.REMOVE_ADMIN}_SUCCESS`: {
      let admins = state.admins;

      admins = admins.filter(x => x.id !== action.meta.id);

      return {
        ...state,
        message: '移除成功',
        admins: admins
      }
    }
    case `${types.REMOVE_ADMIN}_ERROR`:
      return {
        ...state,
        message: action.payload.message || '失败,请重新尝试',
      };

    case `${types.SET_ADMIN}_SUCCESS`: {
      return {
        ...state,
        message: '添加成功',
      }
    }
    case `${types.SET_ADMIN}_ERROR`: {
      return {
        ...state,
        message: action.payload.message || '失败,请重新尝试',
      }
    }

    case `${types.SEARCH_ADMINS}_PENDING`: {
      return {
        ...state,
      };
    }
    case `${types.SEARCH_ADMINS}_SUCCESS`: {
      return {
        ...state,
        searchAdmins: action.payload.data
      };
    }
    case `${types.SEARCH_ADMINS}_ERROR`: {
      return {
        ...state,
        message: '出错了,请重试',
      };
    }
    default:
      return state;
  }
}
