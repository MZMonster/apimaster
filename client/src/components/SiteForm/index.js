/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Cheng Wang
 * @date 2016-07-04
 * @description
 */

import React from 'react';
import 'isomorphic-fetch';
import { Form, Input, Button } from 'antd';
import ImageUploader from '../ImageUploader';

const FormItem = Form.Item;

class SiteForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleUpload = this.handleUpload.bind(this);
  }

  /**
   * 验证域名唯一性
   * @param {string} domain
   * @returns {Object} Promise
   */
  checkDomainUnique(domain) {
    return fetch(`/api2/site/checkDomain?domain=${domain}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(({code, data}) => {
        if (code !== 200) {
          return Promise.reject(new Error('验证域名唯一性失败，请重试'));
        }
        if (data.isExist) {
          return Promise.reject(new Error('域名已存在，请换一个吧'));
        }
      })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { actions, form, id, site } = this.props;
    form.validateFields((errors, values) => {
      const { domain } = values;
      if (!errors) {
        if (id) { // 编辑站点时，不允许修改域名，所以不检查域名唯一性
          actions.saveSite(values, id);
        } else { // 新建站点，需要先检查域名唯一性
          this.checkDomainUnique(domain).then(() => {
            actions.saveSite(values);
          }, (reason) => {
            form.setFields({
              domain: { value: domain, errors: [reason] },
            });
          });
        }
      }
    });
  }

  handleUpload = (url) => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      cover: url,
    });
  }

  testDomain(rule, value, callback) {
    const domainPattern = /^[a-zA-Z0-9-]+$/
    if (!value || value.length < 3){
      callback([new Error('域名长度不能小于3个字符')]);
    } else if(!domainPattern.test(value)) {
      callback([new Error('域名只能含有字母、数字、横线')]);
    } else {
      callback();
    }
  }

  render() {
    const { id, form } = this.props;
    const { getFieldProps, getFieldValue } = form;

    const titleProps = getFieldProps('title', {
      rules: [
        { required: true, message: '请填写标题' }
      ],
    });

    const domainProps = getFieldProps('domain', {
      rules: [
        { required: true, message: '请填写域名' },
        { validator: this.testDomain },
      ],
    });

    const descProps = getFieldProps('description');

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };

    const _upload = this.handleUpload;
    
    return (
      <Form horizontal onSubmit={this.handleSubmit} form={form}>
        <FormItem {...formItemLayout} label="站点名称：">
          <Input {...titleProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="站点域名：">
          <Input {...domainProps} disabled={!!id}/>
        </FormItem>
        <FormItem {...formItemLayout} label="站点描述：">
          <Input {...descProps} />
        </FormItem>
        <FormItem {...formItemLayout} label="封面图片：">
          <Input {...getFieldProps('cover')} style={{ display: 'none' }} />
          <ImageUploader handleUrl={_upload} fileList={getFieldValue('cover') ? [{ uid: 0, url: getFieldValue('cover')}] : []} />
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 4 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  }
}

const mapPropsToFields = ({ site }) => ({
  title: {
    value: site.title || null,
  },
  domain: {
    value: site.domain || null,
  },
  description: {
    value: site.description || null,
  },
  cover: {
    value: site.cover || null,
  }
})

export default Form.create({ mapPropsToFields })(SiteForm);
