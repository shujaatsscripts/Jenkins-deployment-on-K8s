import styled from 'styled-components';
import { Button } from 'antd';

export const ContinueBasic = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  height: 60px;
  width: 225px;
  font-size: 18px;
  border-radius: 5px;
  margin: ${(props) => props.margin && props.margin};
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    opacity: 0.8;
  }
`;
