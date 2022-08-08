import React, { useState } from "react";
import CustomButton from "../../components/Button";
import Input from "../../components/Input";
import {
  LockIcon,
  MailIcon,
  StyledForm,
  StyledLink,
  FormHeading,
} from "../../components/Auth";
import {
  ButtonWrapper,
  ForgotPasswordText,
  ForgotPasswordWrapper,
} from "./styles/main.styles";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { authActionCreators } from "../../redux/action-creators";
import axios, { baseUrl } from "../../utils/axios";
const { login } = authActionCreators;

const stages = {
  verifyEmail: "verifyEmail",
  login: "login",
  forceResetPass: "forceResetPassword",
};

/**
 * If stage is verify email:
 * Only show email field. Clicking on submit will verify if email is correct.
 *
 * If stage is login:
 * Show email and password fields. Clicking on submit logs the user in via existing flow.
 *
 * If stage is force change pass:
 * Show OTP code, password, and confirm password. Clicking on submit will reset password
 */

const Form = ({ history }) => {
  const dispatch = useDispatch();
  const appliedJob = localStorage.getItem("applied_job");

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(stages.verifyEmail);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [otp, setOTP] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    switch (stage) {
      case stages.verifyEmail:
        await fetchUserStatus();
        break;
      case stages.login:
        await loginSubmit();
        break;
      case stages.forceResetPass:
        await resetPass();
        break;
      default:
        break;
    }
    // if (stage === stages.verifyEmail) await fetchUserStatus();
    // if (stage === stages.login) await loginSubmit();
    // if (stage === stages.forceResetPass) await resetPass();
  };

  // logs the user in via email and password
  const loginSubmit = async () => {
    setLoading(true);
    const res = await dispatch(login(email, password));
    setLoading(false);
    if (res?.status === 200) {
      if (appliedJob) history.push(`/jobs/apply/${appliedJob}`);
      else {
        console.log(res);
        if (res.type === "RECRUITER") history.push("/recruiter_dashboard");
        else if (res.type === "JOB_SEEKER") history.push("/dashboard");
        else if (res.step === "COMPLETED") history.push("/dashboard");
        else history.push("/create_profile", { step: res.step });
      }
    } else message.error(res);
  };

  // verifies if email is valid. If is valid changes stage to login
  const fetchUserStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/api/fetch-user-status`, {
        email,
      });
      if (res?.status !== 404) {
        if (res?.data?.status?.userStatus === "FORCE_CHANGE_PASSWORD")
          setStage(stages.forceResetPass);
        else setStage(stages.login);
      } else {
        message.error(res?.data?.message);
      }
    } catch (err) {
      message.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPass = async () => {
    if (password === confirmPass) {
      setLoading(true);
      try {
        const res = await axios.post(`${baseUrl}/api/reset-password`, {
          email,
          code: otp,
          newPassword: password,
          newUser: true,
        });
        if (res?.status === 200) {
          setPassword("");
          setStage(stages.login);
        } else {
          message.error(res?.data?.message);
        }
      } catch (err) {
        message.error(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    } else message.error("Password mismatch!");
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <FormHeading>Please login your account</FormHeading>
      {[stages.login, stages.verifyEmail].includes(stage) && (
        <Input
          inputType="auth"
          type="email"
          placeholder="Email ID"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          prefixIcon={<MailIcon />}
        />
      )}

      {/* Only show if stage is force reset password */}
      {[stages.forceResetPass].includes(stage) && (
        <Input
          inputType="password"
          placeholder="OTP Code"
          required
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          prefixIcon={<LockIcon />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      )}

      {/* Only show if stage is login or force reset password */}
      {[stages.login, stages.forceResetPass].includes(stage) && (
        <>
          <Input
            inputType="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefixIcon={<LockIcon />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <br />
          <ForgotPasswordWrapper>
            <ForgotPasswordText
              onClick={() => history.push("/forgot_password")}
            >
              Forgot Password?
            </ForgotPasswordText>
          </ForgotPasswordWrapper>
        </>
      )}

      {/* Only show if stage is force reset password */}
      {[stages.forceResetPass].includes(stage) && (
        <Input
          inputType="password"
          placeholder="Confirm Password"
          required
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          prefixIcon={<LockIcon />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      )}

      <br />

      <ButtonWrapper>
        <CustomButton
          btnType="auth"
          text="Log In"
          width="70%"
          htmlType="submit"
          disabled={loading}
        />
      </ButtonWrapper>
      {/* <StyledLink to="/sign_up_recruiter">Sign Up as Recruiter</StyledLink> */}
      {/* <StyledLink to="/sign_up_recruiter">Sign Up as Recruiter</StyledLink> */}
      <StyledLink to="/sign_up_job_seeker">Sign Up as Seeker</StyledLink>
    </StyledForm>
  );
};

export default Form;
