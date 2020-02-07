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
import { fetchSite, saveSite, deleteSite } from '../../actions/site';
import { message } from 'antd';

import SiteForm from '../../components/SiteForm';

class Site extends React.Component {

  componentDidMount() {
    const { actions, routeParams } = this.props;
    if (this.isEdit()) {
      actions.fetchSite(routeParams.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, errorMessage, routeParams } = this.props;
    const isEdit = this.isEdit();
    const doneFetching = !nextProps.isFetching && isFetching;
    const needMessage = typeof errorMessage !== 'undefined'; // 第一次载入完数据的时候 errorMessage 是 undefined，不显示提示
    if ( doneFetching && needMessage) {
      if (nextProps.errorMessage) {
        message.error(nextProps.errorMessage);
      } else {
        message.success(!!isEdit ? '更新成功！' : '添加成功！');
      }
    }
  }

  isEdit() {
    return !!this.props.routeParams.id;
  }

  render() {
    const isEdit = this.isEdit();
    const props = {
      ...this.props,
      id: this.props.routeParams.id,
    };
    if (!isEdit) {
      props.site = {};
    }

    return props.site ? <SiteForm {...props} /> : null;
  }
}

const mapStateToProps = state => ({ ...state.site });

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchSite, saveSite, deleteSite }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Site);
