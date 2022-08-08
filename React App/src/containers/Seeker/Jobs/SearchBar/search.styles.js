import styled from "styled-components";
import { Button } from "antd";
import { Input } from "antd";

export const StyledInput = styled(Input)`
  font-size: 12px !important;
  margin-left: 10px;
  font-family: "Montserrat-Regular";
  border: none;
  width: 100%;
  overflow: hidden;
  .ant-input {
    font-size: 12px;
  }
  *:focus {
    outline: none;
  }
`;

export const StyledSelect = styled.select`
  text-align: center;
  border: 1px solid #fefaff;
  font-family: "Montserrat-Regular";
  width: 100%;
  overflow: none;
  outline: none;

  // @media (max-width: 768px) {
  //   width: 180px;
  // }
  // @media (max-width: 968px) {
  //   width: 200px;
  // }
  // @media (max-width: 1068px) {
  //   width: 220px;
  // }
`;

export const SubmitButton = styled.button`
  background-color: #1a77f2;
  color: #fff;
  border: none;
  outline: none;
  font-family: "Montserrat-Regular";
  overflow: hidden;
  border-radius: 5px;
  padding: 5px 20px;
  margin-left: 1%;
  font-weight: "bold";
  font-size: 13px;
`;

export const SpanStyling = styled.div`
  /* border: "1px solid #1A77F259",
  borderRadius: "15px",
  margin: "10px";
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2%; */
`;

export const StyledForm = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 10px 20px 10px;
  /* align-items: center;
  border: "1px solid #1A77F259",
  borderRadius: "15px", */
`;
export const BorderStyling = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1a77f259;
  border-radius: 7px;
  width: 90%;
  background-color: white;
  /* padding:"15px"; */
`;
// .StyledForm {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .SpanStyling {
//   border: "1px solid #1A77F259";
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 8px;
//   border-radius: 15px;
// }
// select:focus {
//   outline: none;
// }
// Input:focus {
//   outline: none;
// }
// .Submit {
//   background-color: #1a77f2;
//   color: #fff;
//   border: none;
//   outline: none;
//   font-family: "Poppins", sans-serif;
//   overflow: hidden;
//   border-radius: 5px;
//   padding: 4px;
//   width: 130px;
//   height: 40px;
// }

// @media (max-width: 768px) {
// }
