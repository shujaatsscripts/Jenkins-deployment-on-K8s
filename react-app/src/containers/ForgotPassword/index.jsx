import React, { useState } from "react";
import { Row, Col, message, Input } from "antd";
import { ButtonWrapper } from "./styles/main.styles";
import {
  Heading,
  StyledRow,
  WhiteCaption,
  ContentContainer,
  ContentColumn,
  MailIcon,
  StyledIllustrationImage,
  IllustrationColumn,
} from "../../components/Auth";
// import Input from "../../components/Input";
import Button from "../../components/Button";
import TopBarAuth from "../../components/Auth/TopBarAuth";
import bgAsset from "../../images/auth/jobSeekerBg.png";
import illustrationAsset from "../../images/illustrations/login.png";
import axios, { baseUrl } from "../../utils/axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/reset-password-code`, {
        email,
      });
      setLoading(false);
      if (res) {
        localStorage.setItem("reset_email_bcix", email);
        if (res.status === 200) {
          history.replace("/verify_email");
        } else if (res.status === 404) {
          message.error("Email does not exist");
        } else {
          message.error("Something went wrong");
        }
      }
    } catch (err) {
      setLoading(false);
      err.response.status === 404
        ? message.error("Email does not exist")
        : message.error("Something went wrong");
    }
  };

  return (
    <StyledRow justify="center">
      <ContentColumn
        xs={24}
        bg={bgAsset}
        style={{ backgroundColor: "#1679EA" }}
      >
        <TopBarAuth />
        <Row>
          <Col
            xs={24}
            md={{ span: 12, offset: 1 }}
            lg={{ span: 10, offset: 1 }}
            xl={{ span: 8, offset: 1 }}
          >
            <ContentContainer>
              <Heading main color="#fff">
                Forget Password
              </Heading>
              <WhiteCaption color="#fff">
                Please enter your email to continue.
              </WhiteCaption>
            </ContentContainer>
            <form onSubmit={onSubmit} style={{ border: "0px solid black" }}>
              <AuthInput
                // inputType="auth"
                prefix={<MailIcon />}
                placeholder="Email ID"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%" }}
              />

              <ButtonWrapper>
                <Button
                  btnType="auth"
                  text="Continue"
                  htmlType="submit"
                  disabled={loading}
                  style={{ border: "1px solid white" }}
                />
              </ButtonWrapper>
            </form>
          </Col>
          <IllustrationColumn
            xs={0}
            lg={{ span: 10, offset: 2 }}
            xl={{ span: 10, offset: 3 }}
          >
            <StyledIllustrationImage src={illustrationAsset} />
          </IllustrationColumn>
        </Row>
      </ContentColumn>
    </StyledRow>
  );
};

export default Main;

const AuthInput = styled(Input)`
  width: ${(props) => (props.showEye ? "95%" : "100%")};
  height: 2.6rem;
  background-color: white;
  border-radius: 10px;
  padding: 0 10px;
  border: none !important;
  outline: none !important;
  input {
    font-family: Montserrat-Regular !important;
    font-size: 13px;
    padding-left: 10px !important;
    background-color: white !important;
  }

  &::placeholder {
    opacity: 0.4;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;
