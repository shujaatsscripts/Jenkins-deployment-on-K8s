import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import Input from "../../components/Input";
import { UserIcon } from "../../components/Auth";
import { StyledCheckbox } from "./styles/main.styles";
import { authActionCreators } from "../../redux/action-creators";
import statusCodes from "../../utils/statusCodes";
import { useDispatch } from "react-redux";
import { SocialButton } from "../../components/Auth";

const Main = ({ history, data, setData, visible, setVisible }) => {
  const { sign_up_recruiter, sign_up_job_seeker } = authActionCreators;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [organization, setOrganization] = useState("");
  const [organizationStatus, setOrganizationStatus] = useState(false);

  const handleRecruiterLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      sign_up_recruiter({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        userType: "RECRUITER",
        organization: organization,
        organizationStatus: organizationStatus,
        googleLogin: data?.googleLogin ? data.googleLogin : null,
        googleId: data?.googleId ? data.googleId : null,
        linkedinLogin: data?.linkedinLogin ? data.linkedinLogin : null,
        linkedinId: data?.linkedId ? data.linkedinId : null,
      })
    );
    if (res === statusCodes.success) {
      clear();
      history.push("/dashboard");
    } else {
      message.error(res);
      alert(res);
    }
  };

  const handleSeekerLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      sign_up_job_seeker({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        userType: "JOB_SEEKER",
        googleLogin: data?.googleLogin ? data.googleLogin : null,
        googleId: data?.googleId ? data.googleId : null,
        linkedinLogin: data?.linkedinLogin ? data.linkedinLogin : null,
        linkedinId: data?.linkedinId ? data.linkedinId : null,
      })
    );
    clear();
    if (res === statusCodes.success) {
      clear();
      history.push("/login");
    } else {
      console.log(res);
      message.error(res);
      alert(res);
    }
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      clear();
    }, 200);
  };

  const handleCancel = () => {
    clear();
  };

  const clear = () => {
    setLoading(false);
    setVisible(false);
    setOrganizationStatus(false);
    setIsRecruiter(false);
    setOrganization("");
    setData({});
  };

  let body;
  let fButton;

  if (isRecruiter) {
    body = (
      <div style={{ textAlign: "center" }}>
        <Input
          inputType="auth"
          placeholder="Company Name"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          required
          prefixIcon={<UserIcon />}
        />
        <br />
        <br />
        <StyledCheckbox
          checked={organizationStatus}
          onChange={(e) => setOrganizationStatus((prev) => !prev)}
          color="white"
          required
        >
          My organization exists on 3cix
        </StyledCheckbox>
      </div>
    );
    fButton = (
      <Button key="back" loading={loading} onClick={handleRecruiterLogin}>
        Submit
      </Button>
    );
  } else {
    body = (
      <>
        {/* <SocialButton color={'#0A66C2'} key='submit' type='primary' onClick={() => setIsRecruiter(true)}>
          Sign Up as Recruiter
        </SocialButton> */}
        <SocialButton
          color={"#0A66C2"}
          key="seeker"
          loading={loading}
          type="primary"
          onClick={handleSeekerLogin}
        >
          Sign Up as Seeker
        </SocialButton>
      </>
    );
    fButton = (
      <Button key="back" onClick={handleCancel}>
        Return
      </Button>
    );
  }
  return (
    <>
      <Modal
        maskClosable={false}
        keyboard={false}
        visible={visible}
        title="Social Login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[fButton]}
      >
        <div style={{ textAlign: "center" }}>{body}</div>
      </Modal>
    </>
  );
};

export default Main;
