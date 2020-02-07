/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Cheng Wang
 * @date 2016-07-04
 * @description
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { message } from 'antd';

import { fetchSites, selectSite, deleteSite } from '../../actions/site';
import SiteList from '../../components/SiteList';

// class Sites extends React.Component {

//   // componentDidMount() {
//   //   const { actions } = this.props;
//   //   // actions.fetchSites();
//   // }

//   render() {
//     return <SiteList {...this.props} />;
//   }
// }

const mapStateToProps = state => state.site;

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchSites, selectSite, deleteSite }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteList);
