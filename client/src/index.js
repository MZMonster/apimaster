import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

import configureStore from './store/configureStore';

import App from './views/App';
import SiteList from './views/Site/List';
import SiteEdit from './views/Site/Edit';
import Ship from './views/Ship';
import Container from './views/Container';
import Compnt from './views/Compnt';
import ContainerList from './views/Container/lists';
import ComponentList from './views/Compnt/lists';
import ShipList from './views/Ship/lists';
import Admins from './views/Admin/admins';
import SetAdmin from './views/Admin/set';
import Admin from './views/Admin/create';

const history = useRouterHistory(createHistory)({ basename: '/admin' });
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="/sites" />
        <Route component={App}>
          <Route path="/sites" component={SiteList} />
          <Route path="/add-site" component={SiteEdit} />
          <Route path="/site/:id" component={SiteEdit} />

          <Route path="ship" component={Ship} />
          <Route path="ship/:id" component={Ship} />
          <Route path="ships" component={ShipList} />

          <Route path="container" component={Container} />
          <Route path="container/:id" component={Container} />
          <Route path="containers" component={ContainerList} />
          <Route path="ship/:shipID/containers" component={ContainerList} />

          <Route path="compnt" component={Compnt} />
          <Route path="compnt/:id" component={Compnt} />
          <Route path="compnts" component={ComponentList} />
          <Route path="container/:containerID/compnts" component={ComponentList} />

          <Route path="admin" component={Admin}/>
          <Route path="set-admin" component={SetAdmin}/>
          <Route path="admins" component={Admins}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
