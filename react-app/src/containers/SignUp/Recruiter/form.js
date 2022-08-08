import React, { useState } from "react";
import { message } from "antd";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  StyledForm,
  FormHeading,
  AlreadyHaveAccount,
  StyledLink,
} from "../../../components/Auth";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ButtonWrapper, StyledCheckbox } from "../styles/main.styles";
import statusCodes from "../../../utils/statusCodes";
import { useDispatch } from "react-redux";
import { authActionCreators } from "../../../redux/action-creators";
import { CheckboxContainer, CheckboxParentContainer } from "./styles";

const Form = ({ history }) => {
  const { sign_up_recruiter } = authActionCreators;
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checked, setChecked] = useState(false);
  const [organizationStatus, setOrganizationStatus] = useState(false);
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(
      sign_up_recruiter({
        firstName,
        lastName,
        email: email,
        password: password,
        userType: "RECRUITER",
        organization: organization,
        organizationStatus: organizationStatus,
      })
    );
    setLoading(false);
    if (res === statusCodes.success) {
      history.push("/login");
    } else {
      message.error(res);
      alert(res);
    }
  };

  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        <FormHeading>SIGN UP AS RECRUITER</FormHeading>
        {/* <Input
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
        /> */}
        <Input
          inputType="auth"
          placeholder="Company Name"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          required
          prefixIcon={<UserIcon />}
        />
        <Input
          inputType="auth"
          placeholder="Email ID"
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
        <CheckboxParentContainer>
          <CheckboxContainer>
            <StyledCheckbox
              checked={organizationStatus}
              onChange={(e) => setOrganizationStatus((prev) => !prev)}
              // color="white"
              style={{ marginBottom: "10px" }}
            >
              My organization already exists on 3cix
            </StyledCheckbox>
            <br />
            <StyledCheckbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              // color="white"
              required
            >
              I agree to Terms & Conditions
            </StyledCheckbox>
          </CheckboxContainer>
        </CheckboxParentContainer>
        <ButtonWrapper>
          <Button
            btnType="auth"
            text="Sign up as Recruiter"
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
