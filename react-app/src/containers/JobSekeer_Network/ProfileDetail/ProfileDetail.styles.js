import styled from "styled-components";
import { Button, Card } from "antd";

export const MyBoxStyle = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  border-radius: 15px;
  padding-left: 10px;
  padding-top: 8px;
  width: 100%;
  height: 49%;
  font-family: "Montserrat-Regular";
  margin-top: -12%;
  box-sizing: border-box;
`;

export const StyledCard = styled(Card)`
  margintop: 10% !important;
`;
export const ProfileStyle = styled.div`
  display: flex;
`;
export const ButtonStyle = styled.div`
  margin-top: 2%;
  display: flex;
  justify-content: center;
`;
export const NameHeading = styled.h5`
  fontweight: "bold";

  @media (max-width: 500px) {
    font-size: 6px;
  }
  @media (max-width: 600px) {
    font-size: 8px;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
  @media (max-width: 1100px) {
    font-size: 16px;
  }
`;
export const DetailStyle = styled.div`
  font-family: "Montserrat-Regular";
  margin-top: 7%;
  margin-left: 7%;
  display: flex;
  // flex-wrap: wrap;
  flex-flow: column wrap;

  @media (max-width: 500px) {
    margin-left: 3%;
  }
  @media (max-width: 600px) {
    margin-left: 4%;
  }
  @media (max-width: 768px) {
    margin-left: 5%;
  }
  @media (max-width: 900px) {
    margin-left: 6%;
  }
`;
export const DetailHeadingStyle = styled.span`
  color: #bbbcbe;
  font-size: 14px;

  @media (max-width: 500px) {
    font-size: 6px;
  }
  @media (max-width: 600px) {
    font-size: 8px;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

export const ButtonStyling = styled(Button)`
  padding: 6px 20px;
  border-radius: 6px;
  font-size: 12px;

  @media (max-width: 500px) {
    font-size: 6px;
  }
  @media (max-width: 600px) {
    font-size: 8px;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 900px) {
    font-size: 11px;
  }
`;

export const ImageStyling = styled.img`
  background-color: rgba(26, 119, 242, 0.08);
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 60%;
  width: 20%;
  height: 15%;
  margin: -3%;
`;

export const ContactHeading = styled.h5`
  font-family: "Montserrat-Regular";
  margin-top: 5%;
  margin-left: 5%;
  margin-bottom: 3%;
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: 6px;
  }
  @media (max-width: 600px) {
    font-size: 8px;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

export const Info = styled.div`
  font-family: "Montserrat-Regular";
  margin-left: 5%;
  font-size: 15px;
  display: flex;

  @media (max-width: 500px) {
    font-size: 6px;
  }
  @media (max-width: 600px) {
    font-size: 8px;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

export const InfoDetail = styled.div`
  font-family: "Montserrat-Regular";
  margin-left: 5%;
  margin-top: 6%;
  font-size: 12px;

  @media (max-width: 500px) {
    font-size: 6px;
  }
  @media (max-width: 600px) {
    font-size: 7px;
  }
  @media (max-width: 768px) {
    font-size: 8px;
  }
  @media (max-width: 900px) {
    font-size: 10px;
  }
`;
export const SocialIcons = styled.span`
  margin-left: 5%;
`;

export const InfoImageStyling = styled.img`
  background-color: rgba(26, 119, 242, 0.08);
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-top: 2%;
`;
