import React, { useState } from "react";
import { Button } from "antd";
import styled from "styled-components";

export const SwitchToggle = ({ setPeriod }) => {
  const [selected, setSelected] = useState(1);
  return (
    <div style={{ width: "45%" }}>
      <StyledButton
        onClick={() => {
          setSelected(1);
          setPeriod("month");
        }}
        selected={1 === selected}
      >
        Monthly
      </StyledButton>
      &nbsp;&nbsp;
      <StyledButton
        onClick={() => {
          setSelected(2);
          setPeriod("week");
        }}
        selected={2 === selected}
      >
        Weekly
      </StyledButton>
    </div>
  );
};

const StyledButton = styled.button`
  border: none;
  padding: 0 10px 0 10px;
  width: 20%;
  border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
  background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
  height: 28px;
  font-family: Montserrat;
  font-size: 12px;
  color: ${(props) => (props.selected ? "white" : "grey")};
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
    border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    color: ${(props) => (props.selected ? "white" : "grey")};
  }
`;
