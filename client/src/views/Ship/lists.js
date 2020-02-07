/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  4/7/16
 * @description
 */

import React, { PropTypes } from 'react';
import { Form, Input, Button, Table, Modal, message } from 'antd';
import { Link } from 'react-router';
import { formatDate } from '../../utils';
import Model from '../Model';

class Ship extends React.Component {
  constructor(props) {
    super(props);
    this.model = 'ship';
    this.params = { body: { populate: 'site' }, where: {} };
  }

  render() {
    return (
      <Model
        getTableOpts={getTableOpts}
        modelName={this.model}
        params={this.params}
      />
    );
  }
}

function getTableOpts() {
  return {
    columns: [{
      title: '标题',
      dataIndex: 'title',
      sorter: true,
      width: 150,
    }, {
      title: '域名',
      dataIndex: 'domain',
      sorter: true,
      width: 150,
    }, {
      title: '发布',
      dataIndex: 'publish',
      filterMultiple: false,
      filters: [
          { text: '✅', value: 1 },
          { text: '草稿', value: 0 },
      ],
      width: 80,
      render: publish => (publish == 1) ? '✅' : '草稿',
    }, {
      title: '所在站点(domain)',
      dataIndex: 'site.domain',
      width: 150,
    }, {
      title: '过期时间(秒)',
      dataIndex: 'expire',
      width: 100,
      sorter: true,
    }, {
      title: '创建时间',
      dataIndex: 'createdAt',
      sorter: true,
      width: 140,
      render: createdAt => {
        return formatDate(createdAt);
      },
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => {
        return (
            <span>
              <a href={`/api/${record.site.domain}/ship/${record.domain}`} target="_blank">预览</a>
              <span className="ant-divider"></span>
              <Link to={'/ship/' + record.id + '/containers'}>详情</Link>
              <span className="ant-divider"></span>
              <Link to={'/ship/' + record.id}>编辑</Link>
              {record.canDelete &&
                <span>
                  <span className="ant-divider"></span>
                  <a href="javascript:void(0)" onClick={() => this.showConfirm(text, record, index)}>删除</a>
                </span>
              }
            </span>
          );
      },
    },
    ],
  };
}

Ship.propTypes = {
  message: PropTypes.string,
  items: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  error: PropTypes.bool,
};

export default Ship;

