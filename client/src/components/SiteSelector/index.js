import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class SiteSelector extends React.Component {

  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchSites();
  }

  onSelect(value, option) {
    const { actions } = this.props;
    actions.selectSite(option.props.site);
  }

  render() {
    const { sites, selectedSite } = this.props;
    return (
      <Select
        style={{ width: 200 }}
        placeholder="请选择站点"
        onSelect={this.onSelect}
        value={selectedSite ? selectedSite.title : null}
      >
        {sites && sites.map(site => (
          <Option key={site.uuid} site={site}>{site.title}</Option>
        ))}
      </Select>
    )
  }
}
