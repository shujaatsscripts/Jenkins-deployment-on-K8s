import styled from 'styled-components';
import { Button } from 'antd';

export const GradientButton = styled(Button)`
  // background-image: linear-gradient(to right, #332ed0, #098ce7) !important;
  background-color: #2a82f3 !important;
  color: white !important;
  height: ${(props) => (props.height ? props.height : '60px')};
  width: ${(props) => props.width && props.width};
  font-size: 18px;
  padding: 0 20px;
  border-radius: 5px;
  opacity: ${(p) => p.disabled && 0.5} !important;
  &:hover {
    opacity: 0.9;
    color: white;
  }
`;
