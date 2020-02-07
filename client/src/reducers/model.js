/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  6/7/16
 * @description
 */

import * as types from '../constants/model';
import immutable from 'immutable';

export const initialState = {
  message: '',
  loading: false,
  items: [],
  pagination: {
    pageSize: 15,
    total: 0,
    current: 1,
  },
  error: false,
};

export default function model(state = initialState, action = {}) {
  if (action.type.match(/.*\_PENDING(.*?)$/)) {
    return immutable.fromJS(state).mergeDeep({
      loading: true,
    }).toJS();
  }

  // if (action.type.match(/.*\_ERROR(.*?)$/)) {
  //  return immutable.fromJS(state).mergeDeep({
  //    message: action.payload.message,
  //    loading: false,
  //    error  : true
  //  }).toJS();
  // }

  switch (action.type) {
    case `${types.FETCH_MODEL}_SUCCESS`:
      return immutable
        .fromJS(state)
        .updateIn(['items'], lists => action.payload.data)
        .mergeDeep({
          message: '',
          error: false,
          loading: false,
          pagination: action.meta.pagination,
        })
        .toJS();
    case `${types.FETCH_MODEL_COUNT}_SUCCESS`:
      return immutable.fromJS(state)
        .mergeDeep({
          message: '',
          error: false,
          pagination: {
            ...action.meta.pagination,
            total: action.payload.data.count,
          },
        })
        .toJS();
    case `${types.FETCH_MODEL_COUNT_AND_DATA}_SUCCESS`:
      return immutable.fromJS(state).updateIn(['items'], () => action.payload.items)
        .mergeDeep({
          message: '',
          error: false,
          loading: false,
          pagination: action.payload.pagination,
        })
        .toJS();
    case `${types.FETCH_MODEL_COUNT_AND_DATA}_ERROR`:
      return immutable.fromJS(state)
        .updateIn(['items'], () => [])
        .mergeDeep({
          message: action.payload.message,
          loading: false,
          error: true,
        })
        .toJS();
    case `${types.DELETE_MODEL}_SUCCESS`:
      return immutable.fromJS(state)
        .updateIn(['items'], list => list.splice(action.meta.index, 1))
        .mergeDeep({
          message: '删除成功',
          error: false,
          loading: false,
          pagination: {
            total: state.pagination.total - 1,
          },
        }).toJS();
    case `${types.DELETE_MODEL}_ERROR`:
      return immutable.fromJS(state)
        .mergeDeep({
          message: action.payload.message,
          loading: false,
          error: true,
        }).toJS();
    case 'REFRESH_MODEL':
      return initialState;
    default:
      return state;
  }
}
