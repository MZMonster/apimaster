import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import promiseMiddleware from 'redux-promise-middleware';

import createLogger from 'redux-logger';

import menu from '../reducers/menu';
import site from '../reducers/site';
import model from '../reducers/model';
import admin from '../reducers/admin';

import container from '../reducers/container';
import ship from '../reducers/ship';
import component from '../reducers/compnt';

const reducer = combineReducers({
  menu,
  site,
  ship,
  container,
  component,
  model,
  admin,
});

const promise = promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR'] });
let enhancer;
if (process.env.NODE_ENV !== 'production') { // 开发环境
  enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      promise,
      createLogger()
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );
} else { // 生产环境
  const slicer = () => (state) => ({ // 只存储将当前选中的站点
    site: { selectedSite: state.site.selectedSite }
  });
  enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      promise,
    ),
    persistState('site', { slicer })
  );
}

export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer);
}
