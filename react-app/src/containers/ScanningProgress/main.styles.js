import styled from 'styled-components';
import { Progress } from 'antd';

export const StyledProgress = styled(Progress)`
  width: 50%;
  margin-bottom: 2rem;
  .ant-progress-outer {
    .ant-progress-inner {
      .ant-progress-bg {
        height: 15px !important;
      }
    }
  }
  @media (max-width: 575px) {
    width: 90%;
  }
`;

export const MainDiv = styled.div`
  width: 100%;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ScanningText = styled.p`
  font-family: Montserrat-Regular;
  font-size: 13px;
`;

export const Success = styled.h2`
  font-family: ProductSans-Bold;
  font-size: 32px;
`;

export const Caption = styled.p`
  margin: 0;
  padding: 0;
  font-family: ProductSans-Regular;
  font-size: 16px;
  margin-bottom: 40px;
`;
