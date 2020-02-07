import config from 'config'; // eslint-disable-line import/no-unresolved

export const GET_ALL_MENU = 'GET_ALL_MENU';
export const GET_ALL_MENU_SUCCESS = 'GET_ALL_MENU_SUCCESS';
export const UPDATE_NAVPATH = 'UPDATE_NAVPATH';

export const updateNavPath = (path, key) => ({
  type: UPDATE_NAVPATH,
  payload: {
    data: path,
    key,
  },
});

export const getAllMenu = () => ({
  type: GET_ALL_MENU,
  payload: {
    menu: config.menu,
  },
});

