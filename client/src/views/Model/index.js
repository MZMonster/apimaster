/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  4/7/16
 * @description
 */

import React, { PropTypes } from 'react';
import { Form, Input, Button, Table, Modal, message } from 'antd';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchModel, deleteModel, fetchModelCountAndData, refreshModel } from '../../actions/model.js';
import { getParams, formatDate } from '../../utils';
import immutable from 'immutable';
import { initialState } from '../../reducers/model';

const confirm = Modal.confirm;
const FormItem = Form.Item;

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.showConfirm = this.showConfirm.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.tableOpts = props.getTableOpts.apply(this);
    this.params = props.params;
    this.filters = {};
    this.sorter = {};
    this.model = props.modelName;
  }

  componentDidMount() {
    if (this.props.site.selectedSite) {
      this.params.where.site = this.props.site.selectedSite.id;
      this.fetchInitData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const des = nextProps.message;
    const props = this.props;

    if (nextProps.site.selectedSite !== props.site.selectedSite) {
      this.params.where.site = nextProps.site.selectedSite.id;  
      this.fetchInitData();
    }

    if (des) {
      nextProps.error ? message.error(des, 5) : message.success(des);
    }
  }

  showConfirm(text, record, index) {
    let _this = this;
    confirm({
      title: '您是否确认要删除这项内容',
      onOk: function () {
        _this.props.deleteModel(_this.model, record.id, index);
      },

      onCancel() {
      },
    });
  }

  componentWillUnmount() {
    this.props.refreshModel();
  }

  fetchInitData() {
    const params = getParams(initialState.pagination, {}, {}, this.params);
    this.props.fetchModelCountAndData(this.model, initialState.pagination, params);
  }

  handleSearch(e) {
    e.preventDefault();
    let params;
    let formValue = this.props.form.getFieldsValue();
    let pagination = immutable.fromJS(this.props.pagination).mergeDeep({
      current: 1,
    }).toJS();

    // this.params.where = { site: this.props.site.selectedSite.id };
    if (formValue.title) {
      this.params.where.title = { contains: formValue.title };
    } else {
      delete this.params.where.title;
    }

    params = getParams(pagination, this.filters, this.sorter, this.params);
    this.props.fetchModelCountAndData(this.model, pagination, params);
  }

  handleTableChange(pagination, filters, sorter) {
    const params = getParams(pagination, filters, sorter, this.params);

    if (immutable.fromJS(this.filters).equals(immutable.fromJS(filters)) === false) {
      this.props.fetchModelCountAndData(this.model, {}, params);
    } else {
      this.props.fetchModel(this.model, pagination, params);
    }

    this.filters = filters;
    this.sorter = sorter;
  }

  render() {
    const { items, loading, pagination } = this.props;
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <div className="table-search-from">
          <Form inline onSubmit={this.handleSearch}>
            <FormItem
              label="标题"
            >
              <Input placeholder="请输入标题"
                {...getFieldProps('title')}
              />
            </FormItem>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form>
        </div>
        <Table columns={this.tableOpts.columns}
          scroll={this.tableOpts.scroll}
          rowKey={record => record.id}
          dataSource={items}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

Model.propTypes = {
  message: PropTypes.string,
  items: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  error: PropTypes.bool,
};

Model = Form.create()(Model);

function mapStateToProps(state) {
  return {
    message: state.model.message,
    loading: state.model.loading,
    items: state.model.items,
    pagination: state.model.pagination,
    error: state.model.error,
    site: state.site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchModel: bindActionCreators(fetchModel, dispatch),
    deleteModel: bindActionCreators(deleteModel, dispatch),
    refreshModel: bindActionCreators(refreshModel, dispatch),
    fetchModelCountAndData: bindActionCreators(fetchModelCountAndData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Model);
