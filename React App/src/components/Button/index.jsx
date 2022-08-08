import { Button } from "antd";
import { StyledAuthButton } from "./styles/authBtn.styles";
import { SignUpTypeBtn } from "./styles/signUpType.styles";
import { ContinueBasic } from "./styles/continue.styles";
import { GradientButton } from "./styles/gradient.styles";
import { AddResumeButton } from "./styles/addResume.styles";
import { CreateJob, StyledPlusCircleOutlined } from "./styles/createjob.styles";
import { ConfirmSlot } from "./styles/confirmSlot.styles";
import { ApplyButton } from "./styles/applyJobDesc.styles";

const CustomButton = ({ btnType, text, ...rest }) => {
  const getInput = () => {
    switch (btnType) {
      case "auth":
        return <StyledAuthButton {...rest}>{text}</StyledAuthButton>;
      case "signUpLogin":
        return (
          <StyledAuthButton inverse {...rest}>
            {text}
          </StyledAuthButton>
        );
      case "signUpType":
        return <SignUpTypeBtn {...rest}>{text}</SignUpTypeBtn>;
      case "createProfile":
        return <ContinueBasic {...rest}>{text}</ContinueBasic>;
      case "basic_gradient":
        return <GradientButton {...rest}>{text}</GradientButton>;
      case "add_resume":
        return <AddResumeButton {...rest}>{text}</AddResumeButton>;
      case "create_new_job":
        return (
          <CreateJob {...rest}>
            <StyledPlusCircleOutlined />
            {text}
          </CreateJob>
        );
      case "confirmSlot":
        return <ConfirmSlot {...rest}>{text}</ConfirmSlot>;
      case "seeker_dashboard":
        return <ApplyButton {...rest}>{text}</ApplyButton>;
      default:
        return <Button {...rest}>{text}</Button>;
    }
  };
  return <>{getInput()}</>;
};

export default CustomButton;
