import styled from 'styled-components';
import { Button } from 'antd';

export const AddResumeButton = styled(Button)`
  background-image: ${(props) =>
    !props.disabled &&
    'linear-gradient(to right, #332ed0, #098ce7) !important'};
  color: white;
  height: ${(props) => (props.height ? props.height : '40px')};
  font-size: 14px;
  padding: 0 20px;
  border-radius: 5px;

  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 575px) {
    margin-top: 20px;
  }
`;
