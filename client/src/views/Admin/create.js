/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  3/8/16
 * @description
 */

import React from 'react';
import { Form, Input, Button, Icon, Checkbox, Upload, InputNumber, Select, Switch, Spin, message, Tooltip } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createAdmin } from '../../actions/admin';
import { isPhoneNumber, isEmail } from '../../utils/index';
import { fetchComponent } from '../../actions/compnt';

const FormItem = Form.Item;

class CreateAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coverList: [],
      imagesList: [],
      selectContainer: 0,
    };
  }

  componentDidMount() {
    const { form, params } = this.props;

    if (!!params.id) {
      fetchComponent(params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isCreating, form, params } = this.props;

    if (nextProps.isCreating !== isCreating) {
      if (nextProps.hasError) {
        message.error(nextProps.errorMessage);
      } else if (nextProps.createSuccess) {
        message.success(!!params.id ? '更新成功！' : '添加成功！');
        if (!params.id) {
          form.resetFields();
        }
      }
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, selectedSite } = this.props;
    let formValue = form.getFieldsValue();

    form.validateFields(errors => {
      if (!!errors) {
        console.log('error');
      } else if (false) {
        // updateComponent(params.id, formValue);
      } else {
        formValue.site = selectedSite && selectedSite.id || null;
        this.props.actions.createAdmin(formValue);
      }
    });
  }

  testEmail = (rule, value, callback) =>  {
    if(!value) {
      callback();
    } else if(!isEmail(value)) {
      callback([new Error('邮箱格式不正确！')]);
    } else {
      callback();
    }
  }

  testTel = (rule, value, callback) => {
    if(!value) {
      callback();
    } else if(!isPhoneNumber(value)) {
      callback([new Error('电话号码格式不正确！')]);
    } else {
      callback();
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { componentData } = this.props;
    // const { id, cover } = this.props.componentData;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const emailProps = getFieldProps('email', {
      rules: [
        { required: true, message: '必须填写邮箱' },
        { validator: this.testEmail },
      ],
    });

    const telProps = getFieldProps('tel', {
      rules: [
        { validator: this.testTel },
      ],
    });

    const usernameProps = getFieldProps('username', {
      rules: [
        { required: true, message: '必须填写用户名' },
      ]
    });

    const coverProps = getFieldProps('cover', {
      onChange: (info) => {
        const status = info.file.status;
        let fileList = info.fileList;
        fileList = fileList.slice(-1);

        switch (status) {
          case 'removed':
          case 'uploading':
          case 'done':
            this.setState({ coverList: fileList });
            break;
          default:
        }
      },
    });

    // const containerOption = this.props.containerList.map((e) => <Option value={e.id + ''}>{e.domain}</Option>);

    return (
      <Spin spinning={this.props.isCreating}>
        <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
          <FormItem {...formItemLayout} label="用户名" hasFeedback>
            <Input id="username" placeholder="用户名..." {...usernameProps} />
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话" hasFeedback>
            <Input id="tel" placeholder="联系电话..." {...telProps} />
          </FormItem>

          <FormItem {...formItemLayout} label="邮箱" hasFeedback>
            <Input id="email" placeholder="邮箱..." {...emailProps} />
          </FormItem>
          <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit">{this.props.params.id ? '更新' : '确定'}</Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

CreateAdmin = Form.create({})(CreateAdmin);

function mapStateToProps(state) {
  return {
    ...state.admin,
    selectedSite: state.site.selectedSite
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ createAdmin }, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdmin);