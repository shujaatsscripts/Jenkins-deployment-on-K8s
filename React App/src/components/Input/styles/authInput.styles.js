import styled from "styled-components";
import { Input } from "antd";

export const InputWrapper = styled.div`
  border: 1px solid white;
  width: 70%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-shadow: ${(props) => !props.recruiter && "0 0 0 1.5px #ddd"};
`;
export const AuthInput = styled(Input)`
  width: ${(props) => (props.showEye ? "95%" : "100%")};
  height: 2.6rem;
  background-color: white;
  border-radius: 10px;
  padding: 0 10px;
  border: none !important;
  outline: none !important;
  input {
    font-family: Montserrat-Regular !important;
    font-size: 13px;
    padding-left: 10px !important;
    background-color: white !important;
  }

  &::placeholder {
    opacity: 0.4;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;
export const PasswordInput = styled(Input.Password)`
  width: ${(props) => (props.showEye ? "95%" : "100%")};
  height: 2.6rem;
  background-color: white;
  border-radius: 10px;
  padding: 0 10px;
  border: none !important;
  outline: none !important;
  input {
    font-family: Montserrat-Regular !important;
    font-size: 13px;
    padding-left: 10px !important;
    background-color: white !important;
  }

  &::placeholder {
    opacity: 0.4;
  }
  @media (max-width: 575px) {
  }
  &:focus {
    outline: none;
    border: none;
  }
`;
export const AuthLabel = styled.label`
  font-size: 22px;
  font-family: ProductSans-Regular;

  // margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 575px) {
    font-size: 18px;
  }
`;
export const AuthWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 5px 0;
`;
