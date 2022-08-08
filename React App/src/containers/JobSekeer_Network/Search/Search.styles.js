import styled from "styled-components";
import { Input, Button } from "antd";

export const SearchBar = styled.span`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;

  @media (max-width: 1000px) {
    align-items: center;
  }
`;
export const SubmitButton = styled.button`
  background-color: #1a77f2;
  color: #fff;
  border: none;
  outline: none;
  font-family: "Montserrat-Regular";
  overflow: hidden;
  border-radius: 5px;
  padding: 0px 30px;
  text-align: center;
  margin-left: 1%;
  font-size: 12px;
`;
export const FilterButton = styled(Button)`
  background-color: rgba(26, 119, 242, 0.07);
  color: #1a77f2;
  border: none;
  outline: none;
  font-family: "Montserrat-Regular";
  overflow: hidden;
  border-radius: 5px;
`;

export const StyledInput = styled(Input)`
  width: 100%;
  margin-left: 2px;
  font-family: "Montserrat-Regular";
  border: 1px solid #1a77f2;
  border-radius: 8px;
  font-size: 11px;
`;
