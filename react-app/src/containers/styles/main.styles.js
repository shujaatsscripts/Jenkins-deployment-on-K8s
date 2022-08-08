import styled from "styled-components";

export const TopRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0px;
  padding: 1.5rem 0 20px 0;
  /* background-color: ${(props) => (props.bg ? props.bg : "#d9e9fd")}; */
  /* box-shadow: ${(props) => props.shadow && "0 4px 2px -2px #ddd"}; */
`;
export const Heading = styled.h2`
  padding-left: 0%;
  font-family: ProductSans-Bold;
  /* font-size: ${(props) => props.theme.fonts.authHeading}; */
  font-size: 25px;
  color: grey;
  margin: 0;
`;
export const Caption = styled.p`
  font-family: ProductSans-Regular;
  font-size: 16px;
  color: #000;
  opacity: 0.69;
  margin: 0;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const Box = styled.div`
  width: 100%;
  padding: 60px 70px 0 70px;
`;

// wrap page content below header
export const PageContainer = styled.div`
  width: 100%;
  padding: 10px 70px;
`;
