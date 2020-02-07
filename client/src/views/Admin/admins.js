/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  5/8/16
 * @description
 */


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Table, Modal, message } from 'antd';

import { removeAdmin, fetchAdmins } from '../../actions/admin';

const confirm = Modal.confirm;

class Admins extends React.Component {
  constructor(props) {
    super(props);
    this.model = 'Admin';
    this.tableOpts = getTableOpts.apply(this);
  }

  componentDidMount() {
    if (this.props.selectedSite) {
      this.props.actions.fetchAdmins(this.props.selectedSite.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedSite, actions } = this.props;
    const resMessage = this.props.message;
    const nextMessage = nextProps.message;

    if (nextProps.selectedSite !== selectedSite) {
      actions.fetchAdmins(nextProps.selectedSite.id);
    }
    if (nextMessage !== resMessage) {
      nextProps.hasError ? message.error(nextMessage, 5) : message.success(nextMessage);
    }
  }

  destroy(text, record, index) {
    let _this = this;
    confirm({
      title: `您是否确认移除管理员「${record.username}」`,
      onOk: function () {
        _this.props.actions.removeAdmin(_this.props.selectedSite.domain, record.uuid, record.id);
      },

      onCancel() {
      },
    });
  }

  render() {
    let { admins, loading } = this.props;

    admins = admins && admins.filter(x => x.isSuper == false) || [];

    return (
      <Table
        columns={this.tableOpts.columns}
        scroll={this.tableOpts.scroll}
        rowKey={record => record.id}
        dataSource={admins}
        loading={loading}
      />
    );
  }
}

function getTableOpts() {
  return {
    columns: [{
      title: '用户名',
      dataIndex: 'username',
      width: 130,
    }, {
      title: '联系电话',
      dataIndex: 'tel',
      width: 150,
    }, {
      title: '邮箱',
      dataIndex: 'email',
      width: '20%',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => {
        return (
          <div>
            <a href="javascript:void(0)" onClick={() => this.destroy(text, record, index) }>移除</a>
          </div>
        );
      },
    }]
  };
}

const mapStateToProps = state => ({
  selectedSite: state.site.selectedSite,
  ...state.admin,
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ removeAdmin, fetchAdmins }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
