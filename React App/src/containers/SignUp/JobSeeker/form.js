import React, { useState } from "react";
import { message } from "antd";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  StyledForm,
  StyledLink,
  FormHeading,
  AlreadyHaveAccount,
} from "../../../components/Auth";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ButtonWrapper, StyledCheckbox } from "../styles/main.styles";
import { authActionCreators } from "../../../redux/action-creators";
import { useDispatch } from "react-redux";
import statusCodes from "../../../utils/statusCodes";

const { sign_up_job_seeker } = authActionCreators;

const Form = ({ history }) => {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(
      sign_up_job_seeker({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userType: "JOB_SEEKER",
        password: password,
      })
    );
    setLoading(false);
    if (res === statusCodes.success) {
      history.push("/login");
    } else {
      console.log(res);
      message.error(res.message);
      alert(res);
    }
  };
  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        <FormHeading>SIGN UP AS SEEKER</FormHeading>
        <Input
          inputType="auth"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          prefixIcon={<UserIcon />}
        />
        <Input
          inputType="auth"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          prefixIcon={<UserIcon />}
        />
        <Input
          inputType="auth"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          prefixIcon={<MailIcon />}
        />
        <Input
          inputType="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          prefixIcon={<LockIcon />}
        />
        <br />
        <center>
          <StyledCheckbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            required
          >
            I agree to Terms & Conditions.
          </StyledCheckbox>
        </center>
        <ButtonWrapper>
          <Button
            btnType="auth"
            text="Sign up as Job Seeker"
            htmlType="submit"
            disabled={loading}
          />
        </ButtonWrapper>
        <AlreadyHaveAccount>
          Already have an account? <StyledLink to="/login">Login</StyledLink>
        </AlreadyHaveAccount>
      </StyledForm>
    </>
  );
};

export default Form;
