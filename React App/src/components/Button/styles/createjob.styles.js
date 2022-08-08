import styled from 'styled-components';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export const StyledPlusCircleOutlined = styled(PlusCircleOutlined)`
  position: absolute;
  left: 10px;
  fontsize: 22px;
  margin-top: -2px;
`;

export const CreateJob = styled(Button)`
  background-color: #1877f2;
  color: white;
  position: relative;
  height: 40px;
  width: 236px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 19px;
  &:hover {
    background-color: #1877f2;
    color: white;
    opacity: 0.8;
  }
  @media (max-width: 575px) {
    margin-top: 1rem;
  }
`;
