import styled from "styled-components";
import GoogleButton from "react-google-button";
import { Checkbox } from "antd";

export const ForgotPasswordWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const ForgotPasswordText = styled.p`
  color: #1679ea !important;
  text-decoration: underline;
  font-size: 16px;
  /* font-family: ProductSans-Regular; */
  cursor: pointer;
`;
export const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 5px;
`;
export const StyledGoogleButton = styled(GoogleButton)`
  span {
    text-decoration: none !important;
  }
`;
export const StyledCheckbox = styled(Checkbox)`
  color: ${(props) => props.color && props.color};
  text-align: center;
  font-size: 12px;
  color: black;
  font-weight: bold;
  font-family: Montserrat-Regular;
  > .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
