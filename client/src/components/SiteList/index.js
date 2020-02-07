/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author Cheng Wang
 * @date 2016-07-04
 * @description
 */

import React from 'react';
import { Link } from 'react-router';
import { Table, Button, Modal } from 'antd';

const Opearations = ({ site, deleteSite, isSelected }) => {
  const _delete = () => {
    Modal.confirm({
      title: '确认删除?',
      onOk() { deleteSite(site); },
    });
  }

  return (
    <div>
      <Button><Link to={`/site/${site.id}`}>编辑</Link></Button>
      <Button type="dashed" style={{ marginLeft: 12 }} onClick={_delete} disabled={isSelected} title={isSelected ? '选中的站点不可以删除' : null}>删除</Button>
    </div>
  );
};

const SiteList = ({ actions, sites, selectedSite, isFetchingSites, isFetching }) => {

  const { selectSite, deleteSite } = actions;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '站点标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '站点描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) =>
        <Opearations
          site={record}
          deleteSite={deleteSite}
          selectSite={selectSite}
          isSelected={selectedSite && selectedSite.id === record.id}
        />,
    },
  ];

  const tableProps = {
    loading: isFetchingSites || isFetching,
    dataSource: sites,
    columns,
    pagination: false,
  };

  return (
    <Table {...tableProps} rowKey={record => record.uuid} />
  );
};

export default SiteList;
