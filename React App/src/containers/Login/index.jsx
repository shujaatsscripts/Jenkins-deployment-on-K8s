import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  ContentContainer,
  Heading,
  IllustrationColumn,
  LockIcon,
  MailIcon,
  StyledColumnBackground,
  StyledIllustrationImage,
  StyledRow,
  WhiteCaption,
} from "../../components/Auth";
import TopBarAuth from "../../components/Auth/TopBarAuth";
import Button from "../../components/Button";
import Input from "../../components/Input";
import bgAsset from "../../images/auth/jobSeekerBg.png";
import illustrationAsset from "../../images/illustrations/login.png";
import { authActionCreators } from "../../redux/action-creators";
import axios, { baseUrl } from "../../utils/axios";
import {
  ButtonWrapper,
  ForgotPasswordText,
  ForgotPasswordWrapper,
} from "./styles/main.styles";

const { login } = authActionCreators;

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialAuthCode, setSocialAuthCode] = useState("");
  const [socialAuthProvider, setSocialAuthProvider] = useState("");

  let query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const socialAuth = async () => {
      setSocialAuthCode(query.get("code"));
      setSocialAuthProvider(query.get("authProvider"));
      if (socialAuthCode)
        try {
          const res = await axios.get(
            `${baseUrl}/api/auth/${socialAuthProvider}/callback/?code=${socialAuthCode}`
          );
          console.log(res);
          // if new user, sign up the user
          if (res.status === 201) {
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
          }
        } catch (err) {
          console.log(err);
          history.push("/");
        }
    };
    socialAuth();
  }, [socialAuthCode, socialAuthProvider]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(login(email, password));
    setLoading(false);
    if (res?.status === 200) {
      if (res.type === "RECRUITER") history.push("/jobs");
      else if (res.step === "COMPLETED") history.push("/dashboard");
      else history.push("/create_profile", { step: res.step });
    } else message.error(res);
    // const res = await axios.get(`http://localhost:3000/api/auth/linkedin`)
    // console.log(res)
  };

  return (
    <StyledRow style={{ border: "5px solid black" }} justify="center">
      <StyledColumnBackground
        // style={{ border: "5px solid black" }}
        xs={24}
        bg={bgAsset}
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
                Welcome to 3cix
              </Heading>
              <WhiteCaption color="#fff">
                A Unified Platform for Recruitment Hirings and Trainings
              </WhiteCaption>
            </ContentContainer>
            <form onSubmit={onSubmit}>
              <Input
                inputType="auth"
                type="email"
                placeholder="Email ID"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefixIcon={<MailIcon />}
              />

              <Input
                inputType="auth"
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefixIcon={<LockIcon />}
              />
              <br />
              <ForgotPasswordWrapper>
                <ForgotPasswordText
                  onClick={() => history.push("/forgot_password")}
                >
                  Forgot Password?
                </ForgotPasswordText>
              </ForgotPasswordWrapper>
              <ButtonWrapper>
                <Button
                  btnType="auth"
                  text="Log In"
                  htmlType="submit"
                  disabled={loading}
                />

                {/* Login with Google button */}
                {/* <a href={`${baseUrl}/api/auth/google`}>
                  <StyledGoogleButton type="light" disabled={loading} />
                </a> */}

                {/* Login with LinkedIn button */}
                <a href="http://api.3cix.com/api/auth/linkedin">
                  <Button text="Log In with LinkedIn" disabled={loading} />
                </a>

                <Button
                  btnType="signUpLogin"
                  text="Sign up as Job Seeker"
                  onClick={() => history.push("/sign_up_job_seeker")}
                  disabled={loading}
                />
                <Button
                  btnType="signUpLogin"
                  text="Sign up as Recruiter"
                  onClick={() => history.push("/sign_up_recruiter")}
                  disabled={loading}
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
      </StyledColumnBackground>
    </StyledRow>
  );
};

export default Main;
