/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/4
 * @description
 *
 */

import React, { PropTypes, Component } from 'react';
import { Form, Input, Button, Radio, Icon, Upload, InputNumber, Select, Switch, Spin, message } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createContainer, fetchContainer, updateContainer, modifyCover } from '../../actions/container';
import { fetchShip } from '../../actions/ship';
import { upyun } from '../../constants/upyun';
import { getCookie } from '../../utils';
import ImageUploader from '../../components/ImageUploader';

const FormItem = Form.Item;
const Option = Select.Option;

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectShip: 0,
    };
  }

  componentDidMount() {
    const { fetchShip, fetchContainer, form, params, site } = this.props;
    form.setFieldsValue({
      publish: true,
      canDelete: true,
    });

    if (!!params.id) {
      fetchContainer(params.id);
    }
    if (site.selectedSite) {
      fetchShip(`site=${site.selectedSite.id}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isCreating, form, fetchShip, params, containerData, site } = this.props;
    if (nextProps.isCreating !== isCreating) {
      if (nextProps.hasError) {
        message.error(nextProps.errorMessage);
      } else if (nextProps.createSuccess) {
        message.success(!!params.id ? '更新成功！' : '添加成功！');
        if (!params.id) {
          form.resetFields();
          form.setFieldsValue({
            publish: true,
            canDelete: true,
            expire: 0,
          });
          fetchShip(`site=${site.selectedSite.id}`);
        }
      }
    }

    if (!!params.id && nextProps.containerData !== containerData) {
      const formFields = () => {
        const { id, domain, title, cover, description, publish, expire, ship, canDelete } = nextProps.containerData;

        return {
          domain,
          title,
          description,
          publish,
          expire,
          canDelete,
          ship: ship ? ship.domain : '',
          cover,
        };
      };

      form.setFieldsValue(formFields());
    }

    if (nextProps.params.id !== params.id) {
      if (!!nextProps.params.id) {
        fetchContainer(nextProps.params.id);
      } else {
        form.resetFields();
        form.setFieldsValue({
          publish: true,
          canDelete: true,
        });
      }
    }

    if (nextProps.site.selectedSite !== site.selectedSite) {
      fetchShip(`site=${nextProps.site.selectedSite.id}`);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { createContainer, updateContainer, form, params, containerData, site } = this.props;
    const { coverList, selectShip } = this.state;
    let formValue = form.getFieldsValue();
    if (!!params.id) {
      formValue = {
        ...formValue,
      };
      if (selectShip > 0 || containerData.ship) {
        formValue.ship = selectShip || containerData.ship.id;
      } else {
        delete formValue.ship;
      }
    }

    formValue = {
      ...formValue,
      createBy: getCookie('user'),
    };

    form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('error');

        return;
      } else {
        !!params.id ? updateContainer(params.id, formValue) : createContainer({
          ...formValue,
          site: site.selectedSite,
          ship: +formValue.ship,
        });
      }
    });
  }

  testDomain = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (value.match(/\s/)) {
      callback([new Error('域名中不得包含空格！')]);
    } else {
      callback();
    }
  }

  handleUpload = (url) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      cover: url,
    });
  }

  render() {
    const { getFieldProps, getFieldValue } = this.props.form;
    const { containerData } = this.props;
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

    const shipProps = getFieldProps('ship', {
      rules: [

      ],
      onChange: (e) => {
        this.setState({
          selectShip: e,
        });
      },
    });

    const shipOption = this.props.shipList.map((e) => <Option value={e.id + ''}>{e.domain}</Option>);

    const _upload = this.handleUpload;

    return (
      <Spin spinning={this.props.isCreating}>
        <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
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
            <Input id="title" placeholder="长度不得大于 100"
              {...titleProps}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="封面图片"
            help="图片尺寸不得超过 xxx KB"
          >
            <Input {...getFieldProps('cover')} style={{ display: 'none' }} />
            <ImageUploader handleUrl={_upload} fileList={getFieldValue('cover') ? [{ uid: 0, url: getFieldValue('cover') }] : []} />
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
          <FormItem
            {...formItemLayout}
            label="所属页面"
          >
            <Select showSearch
              id="ship"
              size="large"
              placeholder="请选择页面"
              optionFilterProp="children"
              notFoundContent="无法找到"
              {...shipProps}
            >
              {shipOption}
            </Select>
          </FormItem>
          <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit">{this.props.params.id ? '更新' : '确定'}</Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

Container.propTypes = {
  isCreating: PropTypes.bool,
  hasError: PropTypes.bool,
};

const _Container = Form.create({})(Container);

function mapStateToProps(state) {
  const { site } = state;
  const { isCreating, createSuccess, hasError, errorMessage, shipList, containerData, uploadParams } = state.container;
  return {
    isCreating,
    createSuccess,
    hasError,
    errorMessage,
    shipList,
    containerData,
    uploadParams,
    site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createContainer: bindActionCreators(createContainer, dispatch),
    fetchContainer: bindActionCreators(fetchContainer, dispatch),
    updateContainer: bindActionCreators(updateContainer, dispatch),
    modifyCover: bindActionCreators(modifyCover, dispatch),
    fetchShip: bindActionCreators(fetchShip, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(_Container);
