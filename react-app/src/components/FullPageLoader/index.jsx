import React from 'react';
import { Spin } from 'antd';
import { StyledContainer } from './main.styles';
import { LoadingOutlined } from '@ant-design/icons';

const FullPageLoader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <StyledContainer>
      <Spin spinning={true} indicator={antIcon}></Spin>
    </StyledContainer>
  );
};

export default FullPageLoader;
