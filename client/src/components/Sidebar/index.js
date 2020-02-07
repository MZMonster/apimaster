import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
import { updateNavPath } from '../../actions/menu';

const SubMenu = Menu.SubMenu;

import './index.less';

const defaultProps = {
  items: [],
  current: 0,
};

const propTypes = {
  items: PropTypes.array,
  current: PropTypes.number,
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.menuClickHandle = this.menuClickHandle.bind(this);
  }

  menuClickHandle(item) {
    this.props.updateNavPath(item.keyPath, item.key);
  }

  render() {
    const { items } = this.props;
    const menu = items.map(item => (
      <SubMenu
        key={`sub${item.key}`}
        title={<span><Icon type={item.icon} />{item.name}</span>}
      >
        {item.child.map((node) => {
          return (
            <Menu.Item key={'menu' + node.key}>
              <Link to={node.path || '/home'}>{node.name}</Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    ));

    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">接口大师</div>
        <Menu
          mode="inline"
          theme="dark"
          onClick={this.menuClickHandle}
        >
          {menu}
        </Menu>
      </aside>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    items: state.menu.items,
    current: state.menu.current,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getAllMenu: bindActionCreators(getAllMenu, dispatch),
    updateNavPath: bindActionCreators(updateNavPath, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
