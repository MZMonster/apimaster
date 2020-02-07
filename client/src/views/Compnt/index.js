/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Chester
 * @date  16/7/7
 * @description
 *
 */

import React from 'react';
import { Form, Input, Button, Icon, Checkbox, Upload, InputNumber, Select, Switch, Spin, message, Tooltip } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modifyCover, fetchContainer } from '../../actions/container';
import { createComponent, fetchComponent, updateComponent } from '../../actions/compnt';
import { upyun } from '../../constants/upyun';
import ImageUploader from '../../components/ImageUploader';

const FormItem = Form.Item;
const Option = Select.Option;

class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectContainer: 0,
    };
  }

  componentDidMount() {
    const { fetchContainer, fetchComponent, form, params, site } = this.props;
    form.setFieldsValue({
      publish: true,
      canDelete: true,
    });

    if (!!params.id) {
      fetchComponent(params.id);
    }

    if (site.selectedSite) {
      fetchContainer(`site=${site.selectedSite.id}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isCreating, form, fetchContainer, params, componentData, site, fetchComponent } = this.props;
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
            weight: 0,
          });
          fetchContainer(`site=${site.selectedSite.id}`);
        }
      }
    }

    if (!!params.id && nextProps.componentData !== componentData) {
      const formFields = () => {
        const { id, domain, title, cover, description, description_en, publish, expire, container, canDelete, weight, images, proxy, url, url_en, data } = nextProps.componentData;
        return {
          domain,
          title,
          description,
          description_en,
          publish,
          canDelete,
          expire,
          weight,
          proxy,
          url,
          url_en,
          data: JSON.stringify(data),
          container: container ? container.domain : '',
          cover,
          images,
        };
      };

      form.setFieldsValue(formFields());
    }

    if (nextProps.params.id !== params.id) {
      if (!!nextProps.params.id) {
        fetchComponent(nextProps.params.id);
      } else {
        form.resetFields();
        form.setFieldsValue({
          publish: true,
          canDelete: true,
        });
      }
    }

    if (nextProps.site.selectedSite !== site.selectedSite) {
      fetchContainer(`site=${nextProps.site.selectedSite.id}`);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { createComponent, form, params, updateComponent, componentData, site } = this.props;
    const { coverList, imagesList, selectContainer } = this.state;
    let formValue = form.getFieldsValue();

    if (!!params.id) {
      formValue = {
        ...formValue,
      };
      if (selectContainer > 0 || componentData.container) {
        formValue.container = selectContainer || componentData.container.id;
      } else {
        delete formValue.container;
      }
    }

    formValue = {
      ...formValue,
      data: formValue.data ? JSON.parse(formValue.data) : '{}',
    };

    form.validateFields(errors => {
      if (!!errors) {
        console.log('error');
      } else if (!!params.id) {
        updateComponent(params.id, formValue);
      } else {
        createComponent({
          ...formValue,
          site: site.selectedSite,
          container: +formValue.container,
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

  isValidJSON = string => {
    try {
      JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  }

  testJson = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (!this.isValidJSON(value)) {
      callback([new Error('json格式不正确！')]);
    } else {
      callback();
    }
  }

  coverUpload = (url) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      cover: url,
    });
  }

  imagesUpload = (url) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      images: url,
    });
  }

  render() {
    const { getFieldProps, getFieldValue } = this.props.form;
    const { componentData } = this.props;
    // const { id, cover } = this.props.componentData;

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
        { max: 1000, message: '长度不得大于 1000' },
      ],
    });

    const containerProps = getFieldProps('container', {
      rules: [

      ],
      onChange: (e) => {
        this.setState({
          selectContainer: e,
        });
      },
    });

    const dataProps = getFieldProps('data', {
      rules: [
        { validator: this.testJson },
      ],
    });

    const containerOption = this.props.containerList.map((e) => <Option value={e.id + ''}>{e.domain}</Option>);

    const _uploadCover = this.coverUpload;

    const _uploadImages = this.imagesUpload;

    return (
      <Spin spinning={this.props.isCreating}>
        <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
          <FormItem {...formItemLayout} label="域名" hasFeedback>
            <Input id="domain" placeholder="长度不能小于 3，大于 50" {...domainProps} />
          </FormItem>
          <FormItem {...formItemLayout} label="标题">
            <Input id="title" placeholder="长度不能大于 100" {...titleProps} />
          </FormItem>
          <FormItem {...formItemLayout} label="封面图片" help="图片尺寸不得超过 xxx KB">
            <Input {...getFieldProps('cover')} style={{ display: 'none' }} />
            <ImageUploader handleUrl={_uploadCover} fileList={getFieldValue('cover') ? [{ uid: 0, url: getFieldValue('cover') }] : []} />

          </FormItem>
          <FormItem {...formItemLayout}label="中文描述">
            <Input type="textarea" id="description" placeholder="长度不能大于 1000" rows="5" {...descProps} />
          </FormItem>
          <FormItem {...formItemLayout} label="描述-EN">
            <Input type="textarea" id="description_en" placeholder="长度不能大于 1000" rows="3" {...getFieldProps('description_en')} />
          </FormItem>
          <FormItem {...formItemLayout}label="url">
            <Input id="url" placeholder="链接地址..." {...getFieldProps('url')} />
          </FormItem>
          <FormItem {...formItemLayout}label="url-EN">
            <Input id="url_en" placeholder="英文链接地址..." {...getFieldProps('url_en')} />
          </FormItem>
          <FormItem {...formItemLayout} label="发布">
            <Switch {...getFieldProps('publish', { valuePropName: 'checked' })} />
          </FormItem>
          <FormItem {...formItemLayout} label="是否可以删除" >
            <Switch {...getFieldProps('canDelete', { valuePropName: 'checked' })} />
            {/* disabled={componentData.canDelete !== undefined && !componentData.canDelete} */}
          </FormItem>
          <FormItem {...formItemLayout} label="过期时间" help="单位：秒">
            <InputNumber id="expire" {...getFieldProps('expire')} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<span>权重 <Tooltip title="排序权重,越大越靠前"><Icon type="question-circle-o" /></Tooltip></span>}
          >
            <InputNumber id="weight" {...getFieldProps('weight')} />
          </FormItem>
          <FormItem {...formItemLayout} label="图集" help="可以上传多张图片" >
            <Input {...getFieldProps('images', { initialValue: [] })} style={{ display: 'none' }} />
            <ImageUploader handleUrl={_uploadImages} fileList={getFieldValue('images').map((image, i) => ({ uid: i, url: image }))} multiple />
          </FormItem>
          <FormItem {...formItemLayout} label="proxy" >
            <Input id="proxy" placeholder="代理请求url 地址..." {...getFieldProps('proxy')} />
          </FormItem>
          <FormItem {...formItemLayout}label="data">
            <Input type="textarea" id="data" placeholder="json格式data..." rows="10" {...dataProps} />
          </FormItem>
          <FormItem {...formItemLayout} label="所属模块">
            <Select
              showSearch
              id="container"
              size="large"
              placeholder="请选择模块"
              optionFilterProp="children"
              notFoundContent="无法找到"
              {...containerProps}
            >
              {containerOption}
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

const _Component = Form.create({})(Component);

function mapStateToProps(state) {
  const { site } = state;
  const { isCreating, createSuccess, hasError, errorMessage, uploadParams, containerList, componentData } = state.component;
  return {
    isCreating,
    createSuccess,
    hasError,
    errorMessage,
    containerList,
    uploadParams,
    componentData,
    site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchContainer: bindActionCreators(fetchContainer, dispatch),
    modifyCover: bindActionCreators(modifyCover, dispatch),
    createComponent: bindActionCreators(createComponent, dispatch),
    fetchComponent: bindActionCreators(fetchComponent, dispatch),
    updateComponent: bindActionCreators(updateComponent, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(_Component);
