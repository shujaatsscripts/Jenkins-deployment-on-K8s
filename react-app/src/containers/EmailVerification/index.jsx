import React, { useState } from "react";
import { Row, Col, message, Input } from "antd";
import { ResendWrapper, ResendText, ButtonWrapper } from "./styles/main.styles";
import {
  Heading,
  StyledRow,
  WhiteCaption,
  ContentContainer,
  ContentColumn,
  LockIcon,
  IllustrationColumn,
  StyledIllustrationImage,
} from "../../components/Auth";
// import Input from "../../components/Input";
import Button from "../../components/Button";
import TopBarAuth from "../../components/Auth/TopBarAuth";
import bgAsset from "../../images/auth/jobSeekerBg.png";
import illustrationAsset from "../../images/illustrations/verifyEmail.png";
import axios, { baseUrl } from "../../utils/axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const email = localStorage.getItem("reset_email_bcix");

  // if reset email does not exist in local storage take user to login
  if (!email) history.push("/login");

  const resendCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/user/resend-confirmation-code`,
        {
          email,
        }
      );
      if (res && res?.status === 200) {
        setLoading(false);
        console.log(res);
        // if (res) if (res.status === 200) history.replace('/reset_password');
      } else if (res?.status === 404) {
        setLoading(false);
        message.error("User not found!");
      } else {
        setLoading(false);
        message.error("Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      err.response.status === 404
        ? message.error("User not found!")
        : message.error("Something went wrong");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      message.error("Password Mismatch!");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(`${baseUrl}/api/reset-password`, {
          code,
          email,
          newPassword: password,
        });
        setLoading(false);
        if (res && res.status === 200) {
          message.success("Password changed successfully!");
          localStorage.removeItem("reset_email_bcix");
          history.replace("/login");
        } else if (res.status === 404) {
          message.error("User not found!");
        } else {
          message.error("Something went wrong");
        }
      } catch (err) {
        setLoading(false);
        console.log(err.response);
        err.response.status === 404
          ? message.error("User not found!")
          : message.error("Something went wrong");
      }
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
                Email Verification
              </Heading>
              <WhiteCaption color="#fff">
                We have sent a code to {email} to reset your password. Please
                review.
              </WhiteCaption>
            </ContentContainer>
            <form onSubmit={onSubmit}>
              <AuthInput
                inputType="auth"
                placeholder="Code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                prefix={<LockIcon />}
              />
              <AuthInput
                inputType="auth"
                placeholder="New Password"
                type="password"
                required
                prefix={<LockIcon />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AuthInput
                inputType="auth"
                placeholder="Re-Type Password"
                type="password"
                required
                prefix={<LockIcon />}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              {/* <br /> */}
              <ResendWrapper>
                <ResendText onClick={resendCode}>Resend email</ResendText>
              </ResendWrapper>
              <ButtonWrapper>
                <Button
                  btnType="auth"
                  text="Verify"
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
  margin-bottom: 5px;
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
