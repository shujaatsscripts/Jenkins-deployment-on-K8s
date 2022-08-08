import { Row } from "antd";
import styled from "styled-components";
import { Alert } from "antd";

export const ContentContainer = styled(Row)`
  background: #fcfcfc;
  // padding: 2rem;
  /* border: 1px solid black; */
  padding-top: 0;
  display: flex;
  /* flex-flow: column; */
  min-height: 90.8vh;
  justify-content: center;
`;

export const StyledAlert = styled(Alert)`
  width: 100%;
  .ant-alert-content {
    .ant-alert-message {
      text-align: center;
      color: #db5902;
    }
  }
`;
