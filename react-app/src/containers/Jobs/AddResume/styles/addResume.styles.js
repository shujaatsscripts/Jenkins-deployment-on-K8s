import styled from "styled-components";
import { PaperClipOutlined } from "@ant-design/icons";
import { Col } from "antd";

export const SubHeading = styled.h3`
  font-size: 21px;
  font-family: ProductSans-Bold;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 575px) {
    font-size: 18px;
  }
`;
export const StyledPaperClipIcon = styled(PaperClipOutlined)`
  font-size: 24px;
  color: ${(p) => p.theme.colors.primary};
`;
export const AttachmentText = styled.span`
  // color: ${(p) => p.theme.colors.primary};
  color: black;
  margin-left: 5px;
  display: flex;
  align-items: flex-end;
  border-bottom: 3px solid grey;
  margin-left: 10px;
  font-weight: bolder;
  color: #007acc;
  text-align: center;
  padding-left: 7px;
  border-radius: 5px;
`;
export const StyledTextCol = styled(Col)`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2rem;
`;
export const StyledColAds = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  width: 100%;
  height: 80vh;
`;
