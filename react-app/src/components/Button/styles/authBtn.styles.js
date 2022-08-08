import styled from "styled-components";
import { Button } from "antd";

export const StyledAuthButton = styled(Button)`
  width: ${(props) => props.width};
  background-color: ${(props) => (props.inverse ? "#fff" : "#1679EA")};
  color: ${(props) => (props.inverse ? props.theme.colors.primary : "white")};
  border: ${(props) =>
    props.inverse
      ? "1px solid" + props.theme.colors.primary
      : "1px solid #1679EA"};
  outline: none;
  height: 2.6rem;
  font-family: "Montserrat-Regular";
  font-size: ${(props) => props.size || "13px"};
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 0.5px 0.5px black;
  letter-spacing: ${(props) => props?.spacing};
  @media (max-width: 575px) {
  }
  &:hover {
    background-color: #1679ea !important;
    opacity: 0.8;
    color: white;
  }
`;
