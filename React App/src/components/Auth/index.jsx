import styled from "styled-components";
import { Row, Col } from "antd";
import { MailOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const StyledLink = styled(Link)`
  text-decoration: underline !important;
  color: #1679ea !important;
  font-size: 15px;
  font-weight: 500;
  font-family: "Montserrat-Regular";
  margin: 5px 0;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export const AlreadyHaveAccount = styled.span`
  font-size: 15px;
  font-weight: 300;
  font-family: "Montserrat-Regular";
  /* color: white !important; */
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export const StyledForm = styled.form`
  border-radius: 10px;
  padding-top: 8%;
  /* border: 1px solid black; */
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    border-top: 1px solid white;
    padding-top: 2.5rem;
    width: 100%;
  }
`;
export const FormHeading = styled.h2`
  margin: 0;
  color: black;
  font-size: 20px;
  font-family: "Montserrat-Regular";
  font-weight: 600;
  margin-bottom: 2rem;
`;
export const WhiteCaption = styled.div`
  /* border: 1px solid black; */
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  width: 100%;
  font-family: "Montserrat-Regular";
  @media (max-width: 1200px) {
    font-size: 22px;
  }
  @media (max-width: 992px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
export const Heading = styled.h2`
  /* border: 1px solid black; */
  font-size: 40px;
  color: ${(props) => (props.color ? props.color : "#000")};
  font-family: "Montserrat-Regular";
  font-weight: 700;
  margin: 0;

  @media (max-width: 1200px) {
    font-size: 42px;
  }
  @media (max-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 575px) {
    margin-top: 2.5rem;
    font-size: 32px;
  }
`;
export const StyledRow = styled(Row)`
  background: #1877f2;
  background-repeat: no-repeat;
  // min-height: 100vh;

  @media (min-width: 768px) {
    height: calc(100vh - 85px);
  }
`;
export const ContentColumn = styled(Col)`
  width: 100%;
  padding: 2rem 3rem;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
  @media (min-width: 768px) {
    height: calc(100vh - 85px);
  }
`;
export const SocialButton = styled(Button)`
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  color: white;
  border-radius: 40px;
  box-shadow: 0px 0.5px 0.5px black;
  background: ${(props) => (props.color ? props.color : "#D2472C")};
  &:hover {
    opacity: 0.8;
    background: ${(props) => (props.color ? props.color : "#D2472C")};
  }
  > img {
    height: 30px;
    width: auto;
  }

  @media (max-width: 1200px) {
    width: 310px;
    height: 42px;
    > img {
      height: 26px;
    }
  }

  @media (max-width: 768px) {
    width: 285px;
    height: 40px;
    > img {
      height: 25px;
    }
  }
`;
export const SocialContainer = styled.div`
  /* height: 50%; */
  /* padding-top: 5rem; */
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  /* flex-direction: column; */
  @media (max-width: 768px) {
    /* text-align: center; */
    /* padding-top: 2rem; */
  }
`;
export const FormColumn = styled(Col)`
  width: 100%;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 2rem 1rem 4rem 1rem;
  }
  @media (min-width: 768px) {
    height: calc(100vh - 85px);
  }
`;
export const TextContainer = styled.div`
  /* border: 1px solid black; */
  /* border-radius: 10px; */
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  margin: ${(props) => props.margin || "0"};
  @media (max-width: 768px) {
    padding: 0 1rem;
    justify-content: center;
  }
`;
export const ImageContainer = styled.div`
  height: 50%;
  @media (max-width: 767px) {
    text-align: center;
    // padding-top: 2rem;
  }
`;

/***************************************/
/***************************************/
/***************************************/
/***************************************/

// export const ImageColumn = styled(Col)`
//   background-color: ${(props) => props.theme.colors.primary};
//   padding: 4rem;
// `;

export const StyledColumn = styled(Col)`
  padding: 4rem;
  background-color: white;
  @media (max-width: 575px) {
    padding: 3rem 2rem;
  }
  display: flex;
  flex-direction: column;
`;
export const Caption = styled.p`
  font-size: 21px;
  color: #000;
  margin-top: 10px;
  opacity: 0.69;
  font-family: ProductSans-Regular;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 575px) {
    font-size: 18px;
  }
`;
export const Error = styled.p`
  color: red;
  text-align: center;
  font-family: ProductSans-Regular;
  font-size: 18px;
`;
export const ContentContainer = styled.div`
  @media (max-width: 575px) {
    margin-top: 0rem;
    text-align: center;
  }
`;
export const TopBar = styled(Row)`
  padding: 1rem;
`;
export const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
  @media (max-width: 480px) {
    margin: 10px 0;
  }
`;
export const StyledIconLabel = styled.label`
  color: white;
  font-size: 19px;
  font-family: ProductSans-Regular;
  margin-left: 10px;
`;
export const StyledIconsColumn = styled(Col)`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 480px) {
    margin-top: 10px;
    display: none;
  }
`;
export const MailIcon = styled(MailOutlined)`
  font-size: 16px;
  opacity: 0.4;
`;
export const LockIcon = styled(LockOutlined)`
  font-size: 16px;
  opacity: 0.4;
`;
export const UserIcon = styled(UserOutlined)`
  font-size: 16px;
  opacity: 0.4;
`;
export const StyledIllustrationImage = styled.img`
  width: 100%;
  @media (max-width: 1024px) {
    width: 80%;
  }
`;
export const IllustrationColumn = styled(Col)`
  margin-top: 4rem;
  height: 70vh;
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    display: none;
  }
`;
