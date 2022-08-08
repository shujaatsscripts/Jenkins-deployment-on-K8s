import { InputNumber } from 'antd';
import styled from 'styled-components';

export const StyledNumberInput = styled(InputNumber)`
    .ant-input-number-input {
      text-align: center;
      color:#847193;
      height: 65px;
    }
`;
export const Label = styled.label`
  font-size: 22px;
  font-family: ProductSans-Regular;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 575px) {
    font-size: 18px;
  }
`;
