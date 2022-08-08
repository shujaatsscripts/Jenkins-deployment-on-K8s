import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  TextContainer,
  Heading,
  ContentColumn,
  StyledRow,
  WhiteCaption,
  FormColumn,
  SocialButton,
  SocialContainer,
} from "../../components/Auth";
import bgAsset from "../../images/auth/jobSeekerBg.png";
import axios, { baseUrl } from "../../utils/axios";
import gmailIcon from "../../images/auth/gmail.png";
import googleIcon from "../../images/auth/googleIcon.svg";
import linkedinIcon from "../../images/auth/linkedinIcon.svg";
import Form from "./form";
import DefaultNavbar from "../../components/Auth/DefaultNavBar";
import SocialModal from "./Modal";
import { Row, Col, Divider } from "antd";
import loginLogo from "../../images/loginLogo.svg";
import logo from "../../images/whiteLogo.svg";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [socialAuthCode, setSocialAuthCode] = useState("");
  const [socialAuthProvider, setSocialAuthProvider] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  let query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const socialAuth = async () => {
      setSocialAuthCode(query.get("code"));
      setSocialAuthProvider(query.get("authProvider"));
      let sAC = query.get("code");
      let sAP = query.get("authProvider");
      if (sAC)
        try {
          const res = await axios.get(
            `${baseUrl}/api/auth/${sAP}/callback/?code=${sAC}`
          );
          console.log(res);
          // if new user, sign up the user
          if (res.status === 201) {
            setData(res.data);
            showModal();
          }
          // if already existing user, log in the user
          if (res.status === 200) {
            dispatch({
              type: "auth/auth_login",
              payload: { token: res.data.token },
            });
            if (res.data.userType === "RECRUITER") history.push("/jobs");
            else if (res.data.step === "COMPLETED") history.push("/dashboard");
            else history.push("/create_profile", { step: res.data.step });
          } else if (res?.status === 200 && res?.status !== 201) {
            history.push("/");
          }
        } catch (err) {
          console.log(err);
          history.push("/");
        }
    };
    socialAuth();
  }, [socialAuthCode, socialAuthProvider, dispatch, history]);

  const showModal = () => setVisible(true);

  return (
    <>
      <div style={{ height: "100vh", padding: "70px" }}>
        <Row
          style={{
            // border: "1px solid black",
            height: "100%",
            borderRadius: "10px",
            backgroundColor: "#1679EA",
          }}
        >
          <Col
            style={{
              // border: "1px solid black",
              height: "100%",
              backgroundColor: "#1679EA",
              borderRadius: "10px",
              padding: "3% 5%",
            }}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 12 }}
            // span={12}
          >
            <div style={{ height: "100%" }}>
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
                  // border: "1px solid black",
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
              // border: "1px solid black",
              height: "100%",
              backgroundColor: "#FAFAFA",
              borderRadius: "10px",
            }}
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 12 }}
            // span={12}
          >
            {/* <FormColumn xs={24} md={12} lg={11}> */}
            <Form history={history} />
            <div style={{ padding: "0 10%" }}>
              <Divider plain>OR</Divider>
            </div>
            <SocialContainer>
              <div
                style={{
                  display: "flex",
                  width: "22%",
                  justifyContent: "space-between",
                  // border: "1px solid black",
                }}
              >
                <a href={`${baseUrl}/api/auth/google`}>
                  <img src={googleIcon} width="40" alt="" />
                </a>
                <a href={`${baseUrl}/api/auth/linkedin`}>
                  <img src={linkedinIcon} width="40" alt="" />
                </a>
              </div>
            </SocialContainer>
            {/* </FormColumn> */}
          </Col>
        </Row>
      </div>
    </>
    // <>
    //   <SocialModal
    //     history={history}
    //     data={data}
    //     setData={setData}
    //     visible={visible}
    //     setVisible={setVisible}
    //   />
    // <DefaultNavbar history={history} />
    //   <StyledRow justify="center">
    //     <ContentColumn xs={24} md={12} lg={11} bg={bgAsset}>
    //       <TextContainer justifyContent="flex-end">
    //         <Heading main color="#fff">
    //           Welcome to 3cix
    //         </Heading>
    //         <br />
    //         <WhiteCaption color="#fff">
    //           Smart Platform for Recruitment, Hiring and Counseling
    //         </WhiteCaption>
    //       </TextContainer>
    //       <SocialContainer>
    //         <a href={`${baseUrl}/api/auth/google`}>
    //           <SocialButton color="#D2472C">
    //             <img src={gmailIcon} alt="" />
    //           </SocialButton>
    //         </a>
    //         <br />
    //         <a href={`${baseUrl}/api/auth/linkedin`}>
    //           <SocialButton color="#0A66C2">
    //             <img src={linkedInIcon} alt="" />
    //           </SocialButton>
    //         </a>
    //       </SocialContainer>
    //     </ContentColumn>

    //     <FormColumn xs={24} md={12} lg={11}>
    //       <Form history={history} />
    //     </FormColumn>
    //   </StyledRow>
    // </>
  );
};

export default Main;
