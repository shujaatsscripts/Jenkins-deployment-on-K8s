import React from "react";
import {
  Heading,
  StyledRow,
  WhiteCaption,
  ContentColumn,
  TextContainer,
  FormColumn,
  ImageContainer,
} from "../../../components/Auth";
import { useHistory } from "react-router-dom";
import bgAsset from "../../../images/auth/jobSeekerBg.png";
import Form from "./form";
import DefaultNavbar from "../../../components/Auth/DefaultNavBar";
import seeker from "../../../images/auth/seeker.png";
import { Row, Col } from "antd";
import loginLogo from "../../../images/loginLogo.svg";
import logo from "../../../images/whiteLogo.svg";

const Main = () => {
  const history = useHistory();
  return (
    //=================================================================================
    <>
      <div style={{ height: "100vh", padding: "5%" }}>
        <Row
          style={{
            height: "100%",
            borderRadius: "14px",
            backgroundColor: "#1679EA",
          }}
        >
          <Col
            style={{
              height: "100%",
              backgroundColor: "#1679EA",
              borderRadius: "10px",
              padding: "3% 5%",
            }}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 12 }}
          >
            <div style={{ height: "100%", paddingTop: "10px" }}>
              <img src={logo} width="150" alt="logo" />
              <TextContainer justifyContent="center">
                <Heading main color="#fff">
                  Welcome to 3cix
                </Heading>
                <br />
                <WhiteCaption color="#fff">
                  Smart Platform for{" "}
                  <span style={{ fontWeight: "bolder" }}>Recruitment</span>,{" "}
                  <span style={{ fontWeight: "bolder" }}>Hiring</span> and{" "}
                  <span style={{ fontWeight: "bolder" }}>Counseling</span>
                </WhiteCaption>
              </TextContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={loginLogo}
                  width="220"
                  alt="logo"
                  style={{ float: "center" }}
                />
              </div>
            </div>
          </Col>
          <Col
            style={{
              height: "100%",
              backgroundColor: "#FAFAFA",
              borderRadius: "10px",
            }}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 12 }}
          >
            <Form history={history} />
            {/* <Divider plain style={{ width: "80%" }}>
              OR
            </Divider>
            <SocialContainer>
              <div
                style={{
                  display: "flex",
                  width: "22%",
                  justifyContent: "space-between",
                }}
              >
                <a href={`${baseUrl}/api/auth/google`}>
                  <SocialButton color="#D2472C">
                    <img src={gmailIcon} alt="" />
                  </SocialButton>
                </a>
                <a href={`${baseUrl}/api/auth/linkedin`}>
                  <SocialButton color="#0A66C2">
                    <img src={linkedInIcon} alt="" />
                  </SocialButton>
                </a>
              </div>
            </SocialContainer> */}
          </Col>
        </Row>
      </div>
    </>
    //=================================================================================
    // <>
    //   <DefaultNavbar history={history} />
    //   <StyledRow justify="center">
    //     <ContentColumn xs={24} md={12} lg={11} bg={bgAsset}>
    //       <TextContainer justifyContent="flex-end" margin="-2rem 0 2rem 0">
    //         <Heading main color="#fff">
    //           Welcome to 3cix
    //         </Heading>
    //         <br />
    //         <WhiteCaption color="#fff">
    //           Rich on profess, Ride on prowess
    //         </WhiteCaption>
    //         <br />
    //       </TextContainer>
    //       <ImageContainer>
    //         <img src={seeker} height="90%" />
    //       </ImageContainer>
    //     </ContentColumn>

    //     <FormColumn xs={24} md={12} lg={11}>
    //       <Form history={history} />
    //     </FormColumn>
    //   </StyledRow>
    // </>
  );
};

export default Main;

// import React from 'react';
// import {
//   Heading,
//   StyledRow,
//   WhiteCaption,
//   ContentColumn,
//   TextContainer,
//   FormColumn,
//   ImageContainer,
// } from '../../../components/Auth';
// import { useHistory } from 'react-router-dom';
// import bgAsset from '../../../images/auth/jobSeekerBg.png';
// import Form from './form';
// import DefaultNavbar from '../../../components/Auth/DefaultNavBar';
// import recruiter from '../../../images/auth/recruiter.png';

// const Main = () => {
//   const history = useHistory();

//   return (
//     <>
//       <>
//         <DefaultNavbar history={history} />
//         <StyledRow justify="center">
//           <ContentColumn xs={24} md={12} lg={11} bg={bgAsset}>
//             <TextContainer justifyContent="flex-end" margin="-2rem 0 2rem 0">
//               <Heading main color="#fff">
//                 Welcome to 3cix
//               </Heading>
//               <br />
//               <WhiteCaption color="#fff">
//                 Aided by AI, Guided by Experts
//               </WhiteCaption>
//               <br />
//             </TextContainer>
//             <ImageContainer>
//               <img src={recruiter} height="50%" />
//             </ImageContainer>
//           </ContentColumn>

//           <FormColumn xs={24} md={12} lg={11}>
//             <Form history={history} />
//           </FormColumn>
//         </StyledRow>
//       </>
//     </>
//   );
// };

// export default Main;
