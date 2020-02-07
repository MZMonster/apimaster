import React, { PropTypes } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';

import './index.less';

const NavPath = ({ navpath }) => {
  const bread = navpath.map(item => {
    return <Breadcrumb.Item key={'bc-' + item.key}>{item.name}</Breadcrumb.Item>;
  });
  return (
    <div className="ant-layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
        {bread}
      </Breadcrumb>
    </div>
  );
};

NavPath.propTypes = {
  navpath: PropTypes.array,
};
NavPath.defaultProps = {
  navpath: [],
};

const mapStateToProps = state => ({
  navpath: state.menu.navpath,
});

export default connect(mapStateToProps)(NavPath);
