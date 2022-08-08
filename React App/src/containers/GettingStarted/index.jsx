import React, { useState, useEffect } from "react";
import logo from "../../images/whiteLogo.svg";
import { StyledColumn, StyledRow } from "../../components/Auth";
import { StyledStepper } from "./styles/stepper.styles";
import { message, Steps } from "antd";
import GettingStarted from "./GettingStarted";
import PersonalInfo from "./PersonalInfo";
import Expertise from "./Expertise";
import Education from "./Education";
import { BlueContainer, StepperCol } from "./styles/main.styles";
import Experience from "./Experience";
import axios, { baseUrl } from "../../utils/axios";
import { useHistory } from "react-router-dom";

const { Step } = Steps;

const Main = (props) => {
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const step = props?.location?.state?.step;

  useEffect(() => {
    if (!step) {
      history.replace("/login");
    } else {
      if (step === "PERSONAL_INFO") {
        axios
          .get(`${baseUrl}/api/user/personal-info`)
          .then((res) => {
            if (res.data.about) setCurrent(1);

            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setInitialLoading(false);
          })
          .catch((err) => {
            setInitialLoading(false);
            err.response.status === 401
              ? history.replace("/login")
              : message.error("Something went wrong!");
            // console.log(err);
          });
      } else if (step === "EXPERTISE") {
        setCurrent(2);
        setInitialLoading(false);
      } else if (step === "EDUCATION") {
        setCurrent(3);
        setInitialLoading(false);
      } else if (step === "EXPERIENCE") {
        setCurrent(4);
        setInitialLoading(false);
      }
    }
  }, [history, step]);

  return initialLoading ? (
    <p>Loading...</p>
  ) : (
    <StyledRow>
      <StepperCol xs={0} lg={7} xl={6}>
        <img src={logo} alt="logo" />
        <BlueContainer>
          <StyledStepper current={current} direction="vertical">
            <Step title="Getting Started" />
            <Step title="Personal Info" />
            <Step title="Expertise" />
            <Step title="Education" />
            <Step title="Experience" />
          </StyledStepper>
        </BlueContainer>
      </StepperCol>
      <StyledColumn md={24} lg={17} xl={18}>
        {current === 0 && <GettingStarted forward={() => setCurrent(1)} />}
        {current === 1 && (
          <PersonalInfo
            fname={firstName}
            lname={lastName}
            forward={() => setCurrent(2)}
          />
        )}
        {current === 2 && <Expertise forward={() => setCurrent(3)} />}
        {current === 3 && <Education forward={() => setCurrent(4)} />}
        {current === 4 && <Experience />}
      </StyledColumn>
    </StyledRow>
  );
};

export default Main;
