import styled from "styled-components";
import { Checkbox } from "antd";

export const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;
export const StyledCheckbox = styled(Checkbox)`
  color: ${(props) => props.color && props.color};
  text-align: center;
  font-size: 12px;
  /* color: #fff; */
  font-weight: bold;
  font-family: Montserrat-Regular;
  > .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  width: 400px;
  height: 55px;
  background-color: white;
  padding: 5px;
  margin-top: 20px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    margin-bottom: 3rem;
    padding: 0;
  }
`;

export const Container = styled.div`
  @media (min-width: 575px) {
    padding-top: 99px;
  }
`;
