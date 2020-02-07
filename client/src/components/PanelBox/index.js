import React from 'react';

import './index.less';

const PanelBox = ({ title, children }) => (
  <div className="panel-box ant-collapse">
    <div className="ant-collapse-item">
      <div className="ant-collapse-header">
        <span>{title}</span>
      </div>
      <div className="ant-collapse-content ant-collapse-content-active">
        <div className="ant-collapse-content-box">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default PanelBox;
