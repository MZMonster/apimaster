/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  5/8/16
 * @description
 */


import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Table, Modal, message, Alert } from 'antd';

import { searchAdmins, setAdmin } from '../../actions/admin';

const confirm = Modal.confirm;
const FormItem = Form.Item;

class SetAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.model = 'Admin';
    this.params = {body: {}, where: {}};
    this.tableOpts = getTableOpts.apply(this);
  }

  componentWillReceiveProps(nextProps) {
    const resMessage = this.props.message;

    if (nextProps.message !== resMessage && nextProps.message) {
      if (nextProps.hasError) {
        message.error(nextProps.message);
      } else {
        message.success('添加成功');
      }
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    let formValue = this.props.form.getFieldsValue();
    
    if (formValue) {
      this.props.actions.searchAdmins(formValue.email);
    }
  };

  add(text, record, index) {
    let _this = this;
    confirm({
      title: `您是否确认添加管理员「${record.username}」`,
      onOk: function () {
        _this.props.actions.setAdmin(_this.props.selectedSite.domain, record.uuid, record);
      },

      onCancel() {
      },
    });
  }

  render() {
    let { searchAdmins } = this.props;
    const { getFieldProps } = this.props.form;

    searchAdmins = searchAdmins && searchAdmins.filter(x => x.isSuper == false) || [];
    return (
      <div>
        <Alert message="不能超过 25 个管理员哦~" type="warning" showIcon />
        <div className="table-search-from">
          <Form inline onSubmit={this.handleSearch}>
            <FormItem
              label="用户邮箱"
            >
              <Input placeholder="用户邮箱"
                     {...getFieldProps('email')}
              />
            </FormItem>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form>
        </div>
        <Table
          columns={this.tableOpts.columns}
          scroll={this.tableOpts.scroll}
          rowKey={record => record.id}
          dataSource={searchAdmins}
        />
      </div>
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
            <a href="javascript:void(0)" onClick={() => this.add(text, record, index) }>添加为管理员</a>
          </div>
        );
      },
    }]
  };
}

SetAdmin = Form.create()(SetAdmin);

const mapStateToProps = state => ({
  selectedSite: state.site.selectedSite,
  ...state.admin,
});

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ searchAdmins, setAdmin }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetAdmin);