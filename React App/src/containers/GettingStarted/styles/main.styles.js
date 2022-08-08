import { Col } from 'antd';
import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const BlueContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: flex-end;
`;

export const StepperCol = styled(Col)`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 4rem;
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
