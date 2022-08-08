import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Spin
        spinning={true}
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      ></Spin>
    </div>
  );
};

export default Loading;
