import {
  AuthInput,
  AuthLabel,
  AuthWrapper,
  InputWrapper,
  PasswordInput,
} from "./styles/authInput.styles";
import {
  WithLabelInput,
  Label,
  WithLabelWrapper,
  StyledTag,
  StyledPhoneInput,
  phoneInputStyles,
} from "./styles/withLabel.styles";
import {
  TextAreaWrapper,
  TextAreaLabel,
  StyledTextArea,
  TextAreaDiv,
  WordsLeft,
} from "./styles/textarea.styles.js";
import { MeetingPasswordInput } from "./styles/meeting.styles.js";
import {
  SearchJobsContainer,
  SearchJobsInput,
  SearchJobsLabel,
} from "./styles/searchJobs.styles";

const CustomInput = ({
  inputType,
  label,
  prefixIcon,
  show,
  showEye,
  tags,
  onRemoveTag,
  smallLabel,
  textArea_totalWords,
  textArea_wordsLeft,
  phone,
  ...rest
}) => {
  const getInput = () => {
    switch (inputType) {
      case "auth":
        return (
          <AuthWrapper>
            {label && <AuthLabel>{label}</AuthLabel>}
            <InputWrapper>
              <AuthInput {...rest} prefix={prefixIcon} />
            </InputWrapper>
          </AuthWrapper>
        );
      case "password":
        return (
          <AuthWrapper>
            {label && <AuthLabel>{label}</AuthLabel>}
            <InputWrapper>
              <PasswordInput {...rest} prefix={prefixIcon} />
            </InputWrapper>
          </AuthWrapper>
        );
      case "withLabel":
        return (
          <WithLabelWrapper>
            <Label smallLabel={smallLabel}>{label && label}</Label>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {tags &&
                tags?.map((el) => (
                  <StyledTag
                    closable
                    onClose={(e) => {
                      e.preventDefault();
                      onRemoveTag(el);
                    }}
                  >
                    {el}
                  </StyledTag>
                ))}
            </div>
            {phone ? (
              <StyledPhoneInput
                {...rest}
                country="ae"
                inputStyle={phoneInputStyles}
              />
            ) : (
              <WithLabelInput {...rest} smallLabel={smallLabel} />
            )}
          </WithLabelWrapper>
        );
      case "textarea_withLabel":
        return (
          <TextAreaWrapper>
            <TextAreaLabel smallLabel={smallLabel}>
              {label && label}
            </TextAreaLabel>
            <TextAreaDiv>
              <StyledTextArea {...rest} smallLabel={smallLabel} />
              {textArea_totalWords && (
                <WordsLeft>
                  {textArea_wordsLeft} / {textArea_totalWords} words left
                </WordsLeft>
              )}
            </TextAreaDiv>
          </TextAreaWrapper>
        );

      case "meeting_password":
        return <MeetingPasswordInput {...rest}></MeetingPasswordInput>;
      case "search_jobs":
        return (
          <SearchJobsContainer>
            <SearchJobsLabel>{label}</SearchJobsLabel>
            <SearchJobsInput {...rest}></SearchJobsInput>
          </SearchJobsContainer>
        );
      default:
        return <input {...rest} />;
    }
  };
  return <>{getInput()}</>;
};

export default CustomInput;
