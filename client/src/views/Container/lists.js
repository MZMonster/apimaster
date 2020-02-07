/**
 * Copyright (c) 2016 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author hong
 * @date  6/7/16
 * @description
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchModelCountAndData } from '../../actions/model';
import { getParams, formatDate } from '../../utils';
import { initialState } from '../../reducers/model';
import Model from '../Model';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.params = { body: { populate: 'site,ship' }, where: {} };
    this.model = 'container';
    if (props.params.shipID) {
      this.params.where.ship = props.params.shipID;
    }
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.shipID;
    let newId = this.props.params.shipID;
    if (newId !== oldId) {
      if (newId) {
        this.params.where.ship = newId;
      } else {
        delete this.params.where.ship;
      }

      const params = getParams(initialState.pagination, {}, {}, this.params);
      this.props.fetchModelCountAndData(this.model, initialState.pagination, params);
    }
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
    scroll: {
      x: 960,
    },
    columns: [{
      title: '标题',
      dataIndex: 'title',
      width: 100,
    }, {
      title: '域名',
      dataIndex: 'domain',
      width: 100,
    }, {
      title: '发布',
      dataIndex: 'publish',
      filters: [
          { text: '✅', value: 1 },
          { text: '草稿', value: 0 },
      ],
      width: 80,
      render: publish => (publish == 1) ? '✅' : '草稿',
    }, {
      title: '背景图',
      dataIndex: 'uuid',
      width: 100,
      render: (text, record) => {
        return <img className="small-img" src={record.cover} />;
      },
    }, {
      title: '过期时间(秒)',
      dataIndex: 'expire',
      width: 150,
      sorter: true,
    }, {
      title: '所在页面(domain)',
      dataIndex: 'ship.domain',
      width: 140,
    }, {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 140,
      sorter: true,
      render: createdAt => {
        return formatDate(createdAt);
      },
    }, {
      title: '操作',
      dataIndex: '',
      key: 'operation',
      render: (text, record, index) => {
        return (
          <span>
            <a href={`/api/${record.site.domain}/container/${record.domain}`} target="_blank">预览</a>
            <span className="ant-divider"></span>
            <Link to={`/container/${record.id}/compnts`}>详情</Link>
            <span className="ant-divider"></span>
            <Link to={`/container/${record.id}`}>编辑</Link>
            {record.canDelete &&
              <span>
                <span className="ant-divider"></span>
                <a href="javascript:void(0)" onClick={() => this.showConfirm(text, record, index)}>删除</a>
              </span>
            }
          </span>
        );
      },
    }],
  };
}

const mapStateToProps = state => ({});

function mapDispatchToProps(dispatch) {
  return {
    fetchModelCountAndData: bindActionCreators(fetchModelCountAndData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
