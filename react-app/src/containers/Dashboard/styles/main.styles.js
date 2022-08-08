import { Card, Row } from "antd";
import styled from "styled-components";

export const Text = styled.p`
  font-family: ProductSans-Regular;
  font-size: ${(props) =>
    props.subheading ? "12px" : props.main ? "28px" : "18px"};
  text-align: left;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const TextInsideGraph = styled.text`
  font-family: ProductSans-Regular;
  font-size: ${(props) =>
    props.subheading ? "12px" : props.main ? "28px" : "18px"};
  text-align: left;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const StyledImage = styled.img`
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 100px;
  height: 100px;
`;

export const StyledCard = styled(Card)`
  minheight: 305px;
`;

export const HorizontalRow = styled(Row)`
  minheight: 305px;
`;

// /******************************* */

export const SectionHeading = styled.h2`
  /* width: 70%; */
  /* background-color: ${(p) => p.bg && p.bg}; */
  font-size: 15px;
  font-weight: bolder;
  font-family: "Montserrat";
  margin-bottom: ${(p) => p.mb && p.mb};
  /* color: ${(p) => (p.bg ? "white" : "black")};  */
  /* padding: 7px; */
`;

export const MainContainer = styled.div`
  height: 410px;
  /* border: 1px solid #1877f2; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  /* box-shadow: rgb(99 99 99 / 20%) 3px 7px 18px 3px; */
  border-radius: 15px;
  padding: 1.5rem 1.5rem 0 1.5rem;
  margin-bottom: 1.5rem;
  max-height: ${(p) => p.maxHeight || "500px"};
  overflow-y: scroll;
  background: white;

  /* position: relative; */
  ::-webkit-scrollbar {
    width: 0px;
    background: white;
  }
  /* --------------------------------------------------- */
  /* box-shadow: rgb(99 99 99 / 20%) 3px 7px 18px 3px;
  border-radius: 15px;
  padding: 1.5rem 1.5rem 0 1.5rem;
  margin-bottom: 1.5rem;
  max-height: ${(p) => p.maxHeight || "500px"};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  } */
`;
