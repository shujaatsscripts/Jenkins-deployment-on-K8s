import styled from "styled-components";
import { Button } from "antd";

export const ConfirmSlot = styled(Button)`
  background-color: #2a82f3;
  color: white;
  position: relative;
  height: 40px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  border-radius: 7px;
  &:hover {
    background-color: #2a82f3;
    color: white;
    opacity: 0.8;
  }
  @media (max-width: 575px) {
    margin-top: 1rem;
  }
`;
