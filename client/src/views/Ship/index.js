/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  4/7/16
 * @description
 */

import React, { PropTypes, Component } from 'react';
import { Form, Input, Button, InputNumber, Switch, Spin, message, Table, Select } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createShip, fetchShip, updateShip } from '../../actions/ship';
import { fetchSites } from '../../actions/site';
// import { getCookie } from '../../utils';

const FormItem = Form.Item;
const Option = Select.Option;

class Ship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSite: 0,
    };
  }

  componentDidMount() {
    const { form, params, fetchShip, fetchSites } = this.props;

    if (!!params.id) {
      fetchShip(params.id);
    } else {
      form.resetFields();
      this.props.form.setFieldsValue({
        canDelete: true,
        publish: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { form, isCreating, shipData, params, fetchShip, fetchSites } = this.props;
    if (nextProps.isCreating !== isCreating) {
      if (nextProps.hasError) {
        message.error(nextProps.errorMessage);
      } else if (nextProps.createSuccess) {
        message.success(!!params.id ? '更新成功！' : '添加成功！');
        if (!params.id) {
          this.props.form.resetFields();
          this.props.form.setFieldsValue({
            canDelete: true,
            publish: true,
            expire: 0,
          });
        }
      }
    }
    if (!!params.id && nextProps.shipData !== shipData) {
      const formField = () => {
        const { domain, description, publish, expire, canDelete, title, site } = nextProps.shipData;

        return {
          domain,
          description,
          publish,
          expire,
          canDelete,
          title,
          site: site.domain,
        };
      };
      form.setFieldsValue(formField());
    }
    if (nextProps.params.id !== params.id) {
      if (!!nextProps.params.id) {
        fetchShip(nextProps.params.id);
      } else {
        form.resetFields();
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { createShip, form, params, updateShip, site, shipData } = this.props;
    const { selectSite } = this.state;
    let formValue = form.getFieldsValue();

    if (!!params.id) {
      formValue = {
        ...formValue,
        site: selectSite > 0 ? selectSite : shipData.site.id,
      };
    }

    form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('error');

        return;
      } else {
        !!params.id ? updateShip(params.id, formValue) : createShip({
          ...formValue,
          site: +formValue.site,
          // createBy: getCookie('user'),
        });
      }
    });
  };

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleUpload = (e) => {

  };

  testDomain = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (value.match(/\s/)) {
      callback([new Error('域名中不得包含空格！')]);
    } else {
      callback();
    }
  }

  render() {
    const { form, params, site, shipData, isCreating, contain } = this.props;
    const { getFieldProps, getFieldError } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const domainProps = getFieldProps('domain', {
      rules: [
        { required: true, message: '必须填写域名' },
        { min: 3, message: '长度不得小于 3' },
        { max: 50, message: '长度不得超过 50' },
        { validator: this.testDomain },
      ],
    });

    const titleProps = getFieldProps('title', {
      rules: [
        { max: 100, message: '长度不得大于 100' },
      ],
    });

    const descProps = getFieldProps('description', {
      rules: [
        { max: 300, message: '长度不得大于 300' },
      ],
    });

    const siteProps = getFieldProps('site', {
      rules: [
        { required: true, message: '必须选择一个站点' },
      ],
      onChange: (e) => {
        this.setState({
          selectSite: e,
        });
      },
    });

    const siteOption = site.sites.map((e) => <Option value={e.id + ''}>{e.domain}</Option>);

    return (
      <Spin spinning={isCreating}>
        <Form horizontal onSubmit={this.handleSubmit} form={form}>
          <FormItem
            {...formItemLayout}
            label="域名"
            hasFeedback
          >
            <Input id="domain" placeholder="长度不得小于 3，大于 50"
              {...domainProps}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="标题"
          >
            <Input id="domain" placeholder="长度不得大于 100"
              {...titleProps}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            <Input type="textarea" id="description" placeholder="长度不得大于 300" rows="3"
              {...descProps}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="是否可以删除" >
            <Switch {...getFieldProps('canDelete', { valuePropName: 'checked' })} />
            {/* disabled={componentData.canDelete !== undefined && !componentData.canDelete} */}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="发布"
          >
            <Switch {...getFieldProps('publish', { valuePropName: 'checked' })} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="过期时间"
            help="单位：秒"
          >
            <InputNumber id="expire"
              {...getFieldProps('expire')}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="所属站点">
            <Select
              showSearch
              id="container"
              size="large"
              placeholder="请选择站点"
              optionFilterProp="children"
              notFoundContent="无法找到"
              {...siteProps}
            >
              {siteOption}
            </Select>
          </FormItem>
          <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit">{params.id ? '更新' : '确定'}</Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}


Ship.propTypes = {
  isCreating: PropTypes.bool,
  hasError: PropTypes.bool,
};

const _Ship = Form.create()(Ship);

function mapStateToProps(state) {
  const { site } = state;
  const { isCreating, createSuccess, hasError, errorMessage, shipData, containerData } = state.ship;
  return {
    isCreating,
    createSuccess,
    hasError,
    errorMessage,
    shipData,
    containerData,
    site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createShip: bindActionCreators(createShip, dispatch),
    fetchShip: bindActionCreators(fetchShip, dispatch),
    updateShip: bindActionCreators(updateShip, dispatch),
    fetchSites: bindActionCreators(fetchSites, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(_Ship);
