import React from 'react';
import { Form, Icon, Menu, Button } from 'antd';
import SiteSelector from '../SiteSelector';

import './index.less';

const FormItem = Form.Item;

const Header = (props) => (
  <div className="ant-layout-header">
    <div className="site-selector">
      <label>当前站点：</label>
      <SiteSelector {...props} />
    </div>
    <Menu className="header-menu" mode="horizontal">
      <Menu.Item key="logout">
        <Icon type="logout" /><a href="/admin/logout">注销</a>
      </Menu.Item>
    </Menu>
  </div>
);

export default Header;
