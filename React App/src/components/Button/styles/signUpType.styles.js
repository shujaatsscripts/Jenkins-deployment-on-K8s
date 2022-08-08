import { Button } from 'antd';
import styled from 'styled-components';

export const SignUpTypeBtn = styled(Button)`
  width: 50% !important;
  height: 100% !important;
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : '#fff'};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  font-size: 16px;
  font-family: ProductSans-Regular;
  &:focus {
    background-color: ${(props) =>
      props.active ? props.theme.colors.primary : '#fff'};
    color: ${(props) => (props.active ? '#fff' : '#000')};
  }

  @media (max-width: 480px) {
    width: 100% !important;
  }
`;
