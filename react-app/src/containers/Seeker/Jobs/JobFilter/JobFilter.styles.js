import styled from "styled-components";
import { Button } from "antd";
import { Input } from "antd";
import { Checkbox } from "antd";

export const SearchCheckBoxes = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* width: 100%; */
  font-family: "Montserrat-Regular";
`;

export const HeadingStyle = styled.p`
  font-size: 14px;
  font-weight: bold;
  font-family: "Montserrat-Regular";
  color: rgba(0, 0, 0, 0.7);
`;

export const CheckboxStyling = styled(Checkbox)`
  font-size: 12px;
  color: grey;
  padding: 3px 0;
  margin-left: -8px;
  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0px !important;
  }
`;

export const AddFilter = styled.p`
  margin-left: 12px;
  color: #1877f2;
  cursor: pointer;
  margin-top: 2%;
`;
// .searchCheckBoxes {
//   background-color: white;
//   box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
//   border-radius: 15px;
//   display: flex;
//   flex-direction: column;
//   padding-left: 10px;
//   padding-top: 10px;
//   width: 100%;
//   height: 100%;
//   margin-left: 7px;
//   margin-right: 25px;
// }
// .checkboxStyling {
//   font-size: 15px;
//   color: grey;
//   padding: 3px;
// }

// .headingStyle {
//   font-size: 16px;
//   font-weight: bold;
//   font-family: "Poppins", sans-serif;
//   color: rgba(0, 0, 0, 0.7);
// }

// .AddFilter {
//   margin-left: 15px;
//   color: #1877f2;
//   cursor: pointer;
//   margin-top: 2%;
// }
