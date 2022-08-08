import styled from 'styled-components';
import { Button } from 'antd';

export const ApplyButton = styled(Button)`
  background-color: #1877f2;
  color: white;
  height: 36px;
  width: 160px;
  border-radius: 19px;
  font-family: 'Montserrat-Regular';
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #1877f2;
    color: white;
    opacity: 0.8;
  }
  @media (max-width: 575px) {
    margin-top: 1rem;
  }
`;
