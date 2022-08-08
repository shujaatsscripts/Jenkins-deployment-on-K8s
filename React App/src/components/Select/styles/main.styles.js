import { Select } from 'antd';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: ${(props) => (props.time ? '#847193' : '')};
  border: 0 !important;
  outline: 0 !important;
  box-shadow: 0 0 0 1.5px #eee;

  > .ant-select-selector {
    height: 40px !important;
    border: none !important;

    .ant-select-selection-search {
      > input {
        height: 100% !important;
      }
    }

    > .ant-select-selection-placeholder {
      display: flex;
      align-items: center;
    }

    > .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 768px) {
    height: 40px;
  }
  @media (max-width: 575px) {
    height: 50px;
  }
  &:focus {
    outline: none;
  }
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  margin-bottom: 10px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

export const AuthInput = styled.input`
  height: 65px;
  padding: 20px;
  font-size: 14px;
  font-family: ProductSans-Regular;
  opacity: 0.4;
  border: 0;
  box-shadow: 0 0 0 1.5px #cbcbcb;
  @media (max-width: 768px) {
    height: 55px;
  }
  @media (max-width: 575px) {
    height: 50px;
  }
  &:focus {
    outline: none;
  }
`;
