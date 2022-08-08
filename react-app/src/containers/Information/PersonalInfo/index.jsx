import React, { useState, useEffect } from "react";
import { Row, Col, Spin, message, Steps, Divider, Upload, Radio } from "antd";
import facebook from "./images/facebook.svg";
import linkedin from "./images/linkedin.svg";
import github from "./images/github.svg";
import be from "./images/be.svg";
import {
  UserOutlined,
  FileDoneOutlined,
  CalendarOutlined,
  WalletOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  FontSizeOutlined,
  DownloadOutlined,
  FacebookOutlined,
  GithubOutlined,
  BehanceOutlined,
  LinkedinOutlined,
  UploadOutlined,
  FilePdfOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import "./styles.css";
import Education from "./forms/education";
import PersonalInfo from "./forms/personalInfo";
import WorkExperience from "./forms/workExperience";
import ContactInfo from "./forms/contactInfo";
import Location from "./forms/location";
import Certification from "./forms/certification";
import Documents from "./forms/documents";
import Language from "./forms/language";
import OldPersonalInfo from "../../GettingStarted/PersonalInfo";
import { DatePicker, Space } from "antd";

import bigarrow from "../images/arrow.svg";
import arrow from "../images/bigarrow.svg";
import attachment from "./images/attachment.svg";
import {
  StyledSteps,
  StyledParagraph,
  StyledSkip,
  StyledProfileImage,
  StyledPhoneInput,
  StyledSubmitButton,
  StyledSkipButton,
  StyledDatePicker,
  Styledlabel,
  StyledlabelSpan,
  StyledSocialButton,
  StyledTextArea,
  StyledSelectFile,
  StyledRadioButton,
  StyledAddButton,
} from "./PersonalInfo.styles.js";

import {
  Heading,
  Caption,
  ButtonWrapper,
  PageContainer,
  TopRowWrapper,
} from "../../styles/main.styles";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import axios, { baseUrl } from "../../../utils/axios";
import { useHistory, useParams } from "react-router-dom";
import { countries, nationalities, timeZones } from "../../../utils/data";
import moment from "moment";
import styled from "styled-components";
import { StyledButton } from "../JobDetails";

const AddJob = () => {
  const { action } = useParams();
  const editJob = action === "edit";
  const [personalInfoData, setPersonalInfoData] = useState(null);
  const [educationData, setEducationData] = useState(null);
  const [experienceData, setExperienceData] = useState(null);
  const [expertiseData, setExpertiseData] = useState(null);
  const [step, setStep] = useState(-1);

  // const Proficiency = (e) => {
  //   console.log("radio checked", e.target.value);
  //   setProficiency(e.target.value);
  // };

  useEffect(() => {
    (async () => {
      let res1 = await axios.get(`${baseUrl}/api/user/personal-info`);
      setPersonalInfoData(res1.data);

      let res2 = await axios.get(`${baseUrl}/api/user/education`);
      setEducationData(res2.data);

      let res3 = await axios.get(`${baseUrl}/api/user/experience`);
      setExperienceData(res3.data);

      let res4 = await axios.get(`${baseUrl}/api/user/expertise`);
      setExpertiseData(res4.data);

      let res = await axios.get(`${baseUrl}/api/user/get-step`);
      setStep(res?.data?.step);
      if (step === "PERSONAL_INFO") {
        setCurrent(0);
      } else if (step === "EDUCATION") {
        setCurrent(1);
      } else if (step === "EXPERIENCE") {
        setCurrent(2);
      } else if (step === "CONTACT") {
        setCurrent(3);
      } else if (step === "LOCATION") {
        setCurrent(4);
      } else if (step === "CERTIFICATION") {
        setCurrent(5);
      } else if (step === "DOCUMENT") {
        setCurrent(6);
      } else if (step === "LANGUAGE") {
        setCurrent(7);
      } else if (step === "COMPLETED") {
        setCurrent(7);
        console.log("completed");
      }
    })();
  }, []);

  // const props = {
  //   beforeupload: (file) => {
  //     const fileSize = File.type === ".pdf" && File.size > 5000;
  //     if (!fileSize) {
  //       message.error(`${file.name} is greater then 5MB`);
  //       return Upload.LIST_IGNORE;
  //     }
  //   },

  //   action: "//jsonplaceholder.typicode.com/posts/",
  //   listType: "picture",
  //   previewFile(file) {
  //     console.log("Your upload file:", file);
  //     // Your process logic. Here we just mock to the same file
  //     return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
  //       method: "POST",
  //       body: file,
  //     })
  //       .then((res) => res.json())
  //       .then(({ thumbnail }) => thumbnail);
  //   },
  // };

  const history = useHistory();
  //personalInfo
  // const [firstName, setFirstName] = useState(
  //   personalInfoData?.firstName ? personalInfoData.firstName : ""
  // );
  // const [lastName, setLastName] = useState(
  //   personalInfoData?.lastName ? personalInfoData.lastName : ""
  // );
  // const [numberCode, setNumberCode] = useState(
  //   personalInfoData?.phone ? personalInfoData.phone.split("-")[0] : "92"
  // );
  // const [phoneNumber, setPhoneNumber] = useState(
  //   personalInfoData?.phone ? personalInfoData.phone.split("-")[1] : ""
  // );
  // const [dateOfBirth, setDateOfBirth] = useState(
  //   personalInfoData?.dateOfBirth ? personalInfoData.dateOfBirth : ""
  // );
  // const [title, setTitle] = useState(
  //   personalInfoData?.title ? personalInfoData.title : ""
  // );

  //certification
  const [certifications, setCertifications] = useState([
    {
      certificate: "",
      authority: "",
      certificationDate: "",
    },
  ]);

  //contact
  const [email, setEmail] = useState("");
  const [skypeId, setSkypeId] = useState("");

  //documents
  const [documentType, setDocumentType] = useState("SSC");
  const [documentIssuer, setDocumentIssuer] = useState("");
  const [cnic, setCnic] = useState("");

  //education
  const [education, setEducation] = useState([
    {
      country: "Pakistan",
      institute: "",
      degree: "Doctrate/PHD",
      major: "",
      from: "",
      to: "",
    },
  ]);

  //language
  const [language, setLanguage] = useState("Urdu");
  const [proficiency, setProficiency] = useState("");

  //location
  const [country, setCountry] = useState("Pakistan");
  const [city, setCity] = useState("Islamabad");
  const [state, setState] = useState("Punjab");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");

  //workExperience
  const [workExperience, setWorkExperience] = useState([
    {
      jobTitle: "",
      company: "",
      country: "",
      city: "",
      from: "",
      to: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (current === 7) {
  //     setLoading(true);
  //     try {
  //       let phone = numberCode + phoneNumber;
  //       let dateOfBirth = dobYear + dobMonth + dobDay;
  //       let payload = {
  //         firstName,
  //         lastName,
  //         numberCode,
  //         phoneNumber,
  //         dobDay,
  //         dobMonth,
  //         dobYear,
  //         certifications,
  //         email,
  //         skypeId,
  //         documentType,
  //         documentIssuer,
  //         cnic,
  //         education,
  //         language,
  //         proficiency,
  //         country,
  //         city,
  //         state,
  //         streetAddress,
  //         zipCode,
  //         workExperience,
  //       };
  //       const res = await axios.post(
  //         `${baseUrl}/api/seeker/addSeeker`,
  //         payload
  //       );
  //       console.log(payload);
  //       // // resetFields();
  //       // if (res && res.status === 200) history.push("/dashboard");
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     setCurrent((prev) => prev + 1);
  //   }
  // };

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

  /**
   * List of all currencies that aur currently supported
   */
  const supportedCurrencies = [
    "USD",
    "PKR",
    "QR",
    "AED",
    "GBP",
    "INR",
    "EUR",
    "SAR",
  ];

  const { Step } = Steps;

  const onChange = (current) => {
    console.log(current);
    setCurrent(current);
  };

  // const handleEducationChange = (index, event, type, name) => {
  //   const values = [...education];
  //   switch (type) {
  //     case "countryDropDown":
  //       let value = event.target.value.split(" (")[0];
  //       values[index][name] = value;
  //       setEducation(values);
  //       break;
  //     case "input":
  //       values[index][name] = event.target.value;
  //       setEducation(values);
  //       break;
  //     case "select":
  //       values[index][name] = event;
  //       setEducation(values);
  //       break;
  //     case "datePicker":
  //       values[index][name] = event;
  //       setEducation(values);
  //       break;
  //   }
  // };

  // const addEducationFields = () => {
  //   setEducation([
  //     ...education,
  //     {
  //       country: "Pakistan",
  //       institute: "",
  //       degree: "Doctrate/PHD",
  //       major: "",
  //       from: "",
  //       to: "",
  //     },
  //   ]);
  // };

  // const handleDeleteEducation = (index, e) => {
  //   e.preventDefault();
  //   console.log(index);
  //   if (index > -1) {
  //     let values = education.splice(index, 1); // 2nd parameter means remove one item only
  //     setEducation([...education]);
  //   }
  // };

  return (
    <>
      {step === -1 ? (
        <div
          style={{
            width: "100%",
            // border: "1px solid black",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "20%",
          }}
        >
          <Spin spinning={true} />
        </div>
      ) : (
        <Row
          style={{
            border: "0px solid black",
            marginTop: "4%",
            marginRight: "2%",
            marginLeft: "2%",
            marginBottom: "4%",
          }}
          justify="center"
        >
          <Col span={22} style={{ border: "0px solid black" }}>
            {/* {step === -1 ? (
              <Spin spinning={true} />
            ) : ( */}
            <StyledBox>
              <Row style={{ padding: "0px" }} gutter={20}>
                <Col span={8}>
                  <StyledSteps
                    style={{
                      border: "0px solid black",
                      width: "100%",
                    }}
                    direction="vertical"
                    size="small"
                    //   style={{ marginTop: "auto", marginBottom: "auto" }}
                    current={current}
                    onChange={onChange}
                  >
                    <Step
                      title="Personal Info"
                      // style={{
                      //   backgroundColor: "rgba(26, 119, 242, 0.06)",
                      //   borderRadius: "15px",
                      //   marginTop: "auto",
                      //   marginBottom: "auto",

                      //   paddingTop: "5px",
                      // }}
                      disabled={true}
                      icon={<UserOutlined />}
                    />
                    <Step
                      title="Education"
                      disabled={true}
                      icon={<FileDoneOutlined />}
                    />
                    <Step
                      title="Work Experience"
                      disabled={true}
                      icon={<WalletOutlined />}
                    />
                    <Step
                      title="Contact info"
                      disabled={true}
                      icon={
                        <PhoneOutlined
                          style={{ transform: "rotateY(180deg)" }}
                        />
                      }
                    />
                    <Step
                      title="Location"
                      disabled={true}
                      icon={<EnvironmentOutlined />}
                    />
                    <Step
                      title="Certification"
                      disabled={true}
                      icon={<SafetyCertificateOutlined />}
                    />
                    <Step
                      title="Documents"
                      disabled={true}
                      icon={<FileTextOutlined />}
                    />
                    <Step
                      title="Language"
                      disabled={true}
                      icon={<FontSizeOutlined />}
                    />
                  </StyledSteps>
                </Col>
                <Col span={1}>
                  <Divider
                    type="vertical"
                    style={{
                      height: "100%",
                      color: "rgba(0, 0, 0, 0.1)",
                      paddingTop: "-10%",
                    }}
                  />
                </Col>
                <Col span={14}>
                  <div style={{ paddingTop: "16px" }}>
                    <br />
                    {current === 0 ? (
                      <>
                        {/* <OldPersonalInfo /> */}
                        <PersonalInfo
                          // firstName={firstName}
                          // setFirstName={setFirstName}
                          // lastName={lastName}
                          // setLastName={setLastName}
                          // numberCode={numberCode}
                          // setNumberCode={setNumberCode}
                          // phoneNumber={phoneNumber}
                          // setPhoneNumber={setPhoneNumber}
                          // dateOfBirth={dateOfBirth}
                          // setDateOfBirth={setDateOfBirth}
                          // title={title}
                          // setTitle={setTitle}
                          // setDOBDay={setDOBDay}
                          // setDOBMonth={setDOBMonth}
                          // setDOBYear={setDOBYear}
                          setCurrent={setCurrent}
                          data={personalInfoData}
                          // onSubmit={onSubmit}
                        />
                      </>
                    ) : null}
                    {current === 1 ? (
                      <Education
                        // education={education}
                        // setEducation={setEducation}
                        setCurrent={setCurrent}
                        data={educationData}
                        setData={setEducationData}
                        // onSubmit={onSubmit}
                      />
                    ) : null}
                    {current === 2 ? (
                      <WorkExperience
                        // workExperience={workExperience}
                        // setWorkExperience={setWorkExperience}
                        // countries={countries}
                        setCurrent={setCurrent}
                        data={experienceData}
                        // onSubmit={onSubmit}
                      />
                    ) : null}
                    {current === 3 ? (
                      <ContactInfo
                        // email={email}
                        // setEmail={setEmail}
                        // skypeId={skypeId}
                        // setSkypeId={setSkypeId}
                        setCurrent={setCurrent}
                        data={personalInfoData}
                        // onSubmit={onSubmit}
                      />
                    ) : null}
                    {current === 4 ? (
                      <Location
                        // country={country}
                        // setCountry={setCountry}
                        // city={city}
                        // setCity={setCity}
                        // state={state}
                        // setState={setState}
                        // streetAddress={streetAddress}
                        // setStreetAddress={setStreetAddress}
                        // zipCode={zipCode}
                        // setZipCode={setZipCode}
                        setCurrent={setCurrent}
                        data={personalInfoData}
                        // onSubmit={onSubmit}
                      />
                    ) : null}
                    {current === 5 ? (
                      <Certification
                        // certifications={certifications}
                        // setCertifications={setCertifications}
                        setCurrent={setCurrent}
                        data={expertiseData}
                        // onSubmit={onSubmit}
                      />
                    ) : null}
                    {current === 6 ? (
                      <Documents
                        // documentType={documentType}
                        // setDocumentType={setDocumentType}
                        // documentIssuer={documentIssuer}
                        // setDocumentIssuer={setDocumentIssuer}
                        // cnic={cnic}
                        // setCnic={setCnic}
                        setCurrent={setCurrent}
                        data={personalInfoData}
                        // onSubmit={onSubmit}
                      />
                    ) : null}
                    {current === 7 ? (
                      <Language
                        // language={language}
                        // setLanguage={setLanguage}
                        // proficiency={proficiency}
                        // Proficiency={Proficiency}
                        setCurrent={setCurrent}
                        data={personalInfoData}
                        // onSubmit={onSubmit}
                      />
                    ) : null}
                  </div>
                </Col>
              </Row>
            </StyledBox>
            {/* )} */}
          </Col>
        </Row>
      )}
    </>
  );
};

export default AddJob;

const StyledBox = styled.div`
  padding: 30px 30px 30px 30px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  align-items: center;
  height: 100%;
`;

const StyledButtonCancel = styled.button`
  /* border: none; */
  padding: 0 17px 0 17px;
  /* width: 7%; */
  border: 1px solid #1a77f2;
  background-color: white;
  height: 35px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: bolder;
  color: #1a77f2;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
    /* border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    color: ${(props) => (props.selected ? "white" : "grey")}; */
  }
`;
