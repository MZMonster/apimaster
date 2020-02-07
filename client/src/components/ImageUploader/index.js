import React from 'react';
import 'isomorphic-fetch';

import { Upload, Button, Icon } from 'antd';
const uploadUrl = 'https://apimaster.xxxx.com/api2/upload/image';

export default class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadParams: {},
    };
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  componentDidMount() {
    // const that = this;
    // fetch('/api2/upload/params', {
    //   credentials: 'include',
    // }).then(response => response.json())
    //   .then(({ data }) => {
    //     uploadUrl = upyun[data.bucket].uploadUrl;
    //     cdnPrefix = upyun[data.bucket].cdnPrefix;
    //     that.setState({
    //       uploadParams: data,
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  handleFileChange({ file, fileList, event }) {
    const { status } = file;
    const { handleUrl, multiple } = this.props;
    // const getCdnUrl = fileList => fileList.map(file => file.response ? (cdnPrefix + file.response.url) : file.url);
    // const response = file.response;

    if (status == 'removed') {
      handleUrl('');
    }

    if (status == 'done') {
      handleUrl(file.response.url);
     // fileList = [file.response.url];
    }

    this.setState({ fileList });
  }

  render() {
    const { state, handleFileChange } = this;

    const getUploadData = file => ({
      ...state.uploadParams,
      file,
    });

    const { fileList } = this.props;

    const options = {
      action: uploadUrl,
      data: getUploadData,
      headers: { 'X-Requested-With': null },
      accept: 'image/*',
      onChange: handleFileChange,
    };

    return (
      <Upload {...options} fileList={this.state.fileList || fileList} listType="picture">
        <Button type="ghost">
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    );
  }
}
