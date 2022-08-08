import { Col } from "antd";
import styled from "styled-components";

export const StyledBox = styled.div`
  /* ---------------------------------- */
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90px;
  /* border: 1px solid green; */
`;
export const StyledHiringBox = styled.div`
  height: 140px;
`;

export const StyledText = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Montserrat";
  font-size: 12px;
  font-weight: ${(p) => (p.bold ? "600" : "600")};
  color: ${(p) => p.color || "black"};
  cursor: ${(p) => p.pointer && "pointer"};
`;

export const StyledNumber = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Montserrat";
  font-size: 30px;
  font-weight: 900;
  /* margin-bottom: 10px; */
`;

export const StyledHiringNumber = styled.p`
  margin: 0;
  padding: 0 0 6px 10px;
  text-align: left;
  font-family: "Montserrat";
  font-size: 12px;
  font-weight: 700;
  /* margin-bottom: 10px; */
`;

export const StyledCol = styled(Col)`
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;
