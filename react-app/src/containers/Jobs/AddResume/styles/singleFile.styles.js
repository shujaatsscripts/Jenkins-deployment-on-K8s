import styled from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';

export const Box = styled.div`
  padding: 5px 10px;
  width: 140px;
  height: 140px;
  position: relative;
  font-family: ProductSans-Regular;
  border: 2px solid #1877f2;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Cross = styled(CloseCircleOutlined)`
  font-size: 14px;
  position: absolute;
  color: red;
  border-radius: 50%;
  cursor: pointer;
  top: -15px;
  right: -12px;
`;
