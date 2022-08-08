import styled from "styled-components";
import { Row, Col, Spin, message, Steps } from "antd";
import PhoneInput from "react-phone-input-2";
import { DatePicker, Space, Select, Button, Radio } from "antd";
import CountryDropdown from "country-dropdown-with-flags-for-react";

import { Input } from "antd";

const { TextArea } = Input;

export const StyledSteps = styled(Steps)`
  font-family: "Montserrat-Regular";
  font-size: 12px;
`;

export const StyledParagraph = styled.p`
  font-family: "Montserrat-Regular";
  font-size: 20px;
`;
export const StyledSkip = styled.p`
  font-family: "Montserrat-Regular";
  margin-left: auto;
  font-size: 14px;
  margin-right: 0;
  font-weight: bold;
  color: #1a77f2;
`;
export const StyledProfileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 10%;
`;

export const StyledSubmitButton = styled.button`
  border: none;
  padding: 0 17px 0 17px;
  border-color: #1a77f2;
  background-color: #1a77f2;
  height: 35px;
  font-family: "Montserrat-Regular";
  font-size: 12px;
  color: white;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
    /* border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    color: ${(props) => (props.selected ? "white" : "grey")}; */
  }
`;

export const StyledSkipButton = styled.button`
  border: 1px solid #1a77f2;
  padding: 0 17px 0 17px;
  border-color: #1a77f2;
  color: #1a77f2;
  background-color: white;
  height: 35px;
  font-family: "Montserrat-Regular";
  font-size: 12px;
  border-radius: 5px;
  outline: none;

  &:hover {
    opacity: 0.8;
    /* border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    color: ${(props) => (props.selected ? "white" : "grey")}; */
  }
`;
export const StyledAddButton = styled.button`
  border: 1px solid #1a77f2;
  padding: 0 17px 0 17px;
  border-color: #1a77f2;
  color: #1a77f2;
  background-color: white;
  height: 35px;
  font-family: "Montserrat-Regular";
  font-size: 12px;
  border-radius: 5px;
  outline: none;
  margin-left: 10%;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
    /* border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    color: ${(props) => (props.selected ? "white" : "grey")}; */
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  font-family: "Montserrat-Regular";
`;

export const StyledCountryPicker = styled(CountryDropdown)`
  font-family: "Montserrat-Regular";
  border: 1px solid #000;
  border-radius: 20px;
`;
export const Styledlabel = styled.label`
  font-family: "Montserrat-Regular";
  margin-top: auto;
  margin-bottom: auto;
  font-size: 12px;
  //   width: 25%;
`;
export const StyledlabelSpan = styled.label`
  font-family: "Montserrat-Regular";
  font-size: 10px;
  color: rgba(38, 50, 56, 0.35);
`;

export const StyledSelect = styled(Select)`
  .ant-select-selection {
    background-color: transparent;
  }
`;

export const StyledSocialButton = styled(Button)`
  font-family: "Montserrat-Regular";
  background-color: rgba(26, 119, 242, 0.03);
  color: #41444a;
  border: none;
  width: 150px;
  border-radius: 8px;
  height: 42px;
`;

export const StyledTextArea = styled(TextArea)`
  font-family: "Montserrat-Regular";
  background-color: rgba(26, 119, 242, 0.03);
  border-radius: 8px;
  margin: auto;
  font-size: 12px;
`;

export const StyledSelectFile = styled(Button)`
  border-radius: 8px;
  color: #1a77f2;
  border: 1px solid #1a77f2;
`;

export const StyledRadioButton = styled(Radio)`
  font-family: "Montserrat-Regular";
  font-size: 16px;
`;
