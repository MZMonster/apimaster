import _ from 'lodash';

import {
  GET_ALL_MENU,
  GET_ALL_MENU_SUCCESS,
  UPDATE_NAVPATH,
} from '../actions/menu';

import config from 'config'; // eslint-disable-line import/no-unresolved

const initialState = {
  current: 0,
  items: config.menu,
  navpath: [],
};

export default function menu(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ALL_MENU_SUCCESS:
      return Object.assign({}, initialState, { items: action.payload });
    case UPDATE_NAVPATH: {
      const navpath = [];
      let tmpOb;
      let tmpKey;
      let child;

      if (action.payload.data) {
        action.payload.data.reverse().map((item) => {
          if (item.indexOf('sub') != -1) {
            tmpKey = item.replace('sub', '');
            tmpOb = _.find(state.items, o => (o.key == tmpKey));

            child = tmpOb.child;
            navpath.push({
              key: tmpOb.key,
              name: tmpOb.name,
            });
          }

          if (item.indexOf('menu') != -1) {
            tmpKey = item.replace('menu', '');
            if (child) {
              tmpOb = _.find(child, o => (o.key == tmpKey));
            }

            navpath.push({
              key: tmpOb.key,
              name: tmpOb.name,
            });
          }
        });
      }

      return Object.assign({}, state, {
        current: action.payload.key * 1,
        navpath,
      });
    }
    default:
      return state;
  }
}
