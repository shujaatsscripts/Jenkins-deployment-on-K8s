import styled from "styled-components";
import { Checkbox } from "antd";

export const CardStyling = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-top: 10px;
  height: 100%;
  width: 46rem;
  margin-top: -10px;
  margin: 10px;
  margin-right: 15px;
`;

export const CompanyLogo = styled.img`
  width: 70px;
  height: 70px;
`;

export const JobTitle = styled.h4`
  font-size: 16px;
  font-family: "Montserrat-Regular";
  font-weight: bold;
`;

export const SalaryStyle = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

export const CompanyName = styled.p`
  color: rgba(0, 0, 0, 0.5);
`;

export const Icons = styled.img`
  width: 35px;
  height: 35px;
  border: #edf4fe;
  padding: 10px;
  background-color: #edf4fe;
  border-radius: 15px;
`;

export const SmallIcons = styled.img`
  marginbottom: 1%;
`;

export const SmallIconsSpanStyle = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-left: 6%;
  /* text-align: right; */
`;
export const SmallIconswithStyle = styled.p`
  color: rgba(0, 0, 0, 0.7);
  margin-left: 3%;
`;

export const BlockStyle = styled.div`
  display: flex;
  padding: 2%;
  align-content: center;
  height: 10%;
  display: flex;
  flex-wrap: wrap;
`;

export const BlockleftSideStyle = styled.p`
  width: 25%;
  padding: 1%;
  text-align: center;
  padding-top: 2%;

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  font-family: "Montserrat-Regular";
  border: 1px solid #aeb0b2;

  @media (max-length: 900px) {
    width: 20%;
  }
`;

export const MiddleBlockStyle = styled.p`
  width: 25%;
  padding: 1%;
  text-align: center;
  padding-top: 2%;
  font-family: "Montserrat-Regular";
  border: 1px solid #aeb0b2;

  @media (max-length: 900px) {
    width: 20%;
  }
`;

export const BlockRightSideStyle = styled.p`
  font-family: "Montserrat-Regular";
  width: 25%;
  padding: 1%;
  text-align: center;
  padding-top: 2%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid #aeb0b2;

  @media (max-length: 900px) {
    width: 20%;
  }
`;

export const BlockHeading = styled.p`
  color: #aeb0b2;
  font-size: 12px;
`;

export const MainHeadingStyle = styled.span`
  margin-left: 20px;
`;
export const MainHeadingFontStyle = styled.h4`
  font-family: "Montserrat-Regular";
  font-size: 16px;
`;
export const AboutDetail = styled.h4`
  font-family: "Montserrat-Regular";
  color: #aeb0b2;
  // padding: 2%;
  font-size: 12px;
`;

export const CheckBoxStyle = styled(Checkbox)`
  font-family: "Montserrat-Regular";
  font-size: 12px;
  color: #aeb0b2;
  // padding: 1%;
`;
export const StyledPara = styled.p`
  font-family: "Montserrat-Regular";
  font-size: 12px;
  color: #aeb0b2;
`;

export const InfoImageStyling = styled.img`
  background-color: rgba(26, 119, 242, 0.08);
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-top: 2%;
`;
