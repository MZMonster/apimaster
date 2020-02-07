import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavPath from '../../components/NavPath';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

import 'antd/dist/antd.min.css';
import './index.less';
import { fetchSites, selectSite } from '../../actions/site';

const App = ({actions, site, children }) => (
  <div className="ant-layout-aside">
    <Sidebar />
    <div className="ant-layout-main">
      <Header {...site} actions={actions} />
      <NavPath />
      <div className="ant-layout-container">
        <div className="ant-layout-content">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  </div>
);

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
};

App.contextTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = ({ site }) => ({ site });

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchSites, selectSite }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
