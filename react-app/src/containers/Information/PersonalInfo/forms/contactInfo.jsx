import React, { useState, useEffect } from "react";
import { Row, Col, Spin, message, Steps, Divider, Upload, Radio } from "antd";
// import facebook from "./images/facebook.svg";
// import linkedin from "./images/linkedin.svg";
// import github from "./images/github.svg";
// import be from "./images/be.svg";
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
// import "./styles.css";
// import Education from "./forms/education";
import { DatePicker, Space } from "antd";

import bigarrow from "../../images/arrow.svg";
import arrow from "../../images/bigarrow.svg";
// import attachment from "./images/attachment.svg";
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
} from "../PersonalInfo.styles.js";

// import {
//   Heading,
//   Caption,
//   ButtonWrapper,
//   PageContainer,
//   TopRowWrapper,
// } from "../../styles/main.styles";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
// import Button from "../../../components/Button";
import axios, { baseUrl } from "../../../../utils/axios";
// import { useHistory, useParams } from "react-router-dom";
// import { countries, nationalities, timeZones } from "../../../utils/data";
// import moment from "moment";
// import styled from "styled-components";
// import { StyledButton } from "../JobDetails"

const ContactInfo = ({
  // githubURL,
  // linkedInURL,
  // email,
  // setEmail,
  // skypeId,
  // setSkypeId,
  setCurrent,
  data,
  // onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [linkedInURL, setLinkedInURL] = useState(
    data?.linked_In_URL ? data.linked_In_URL : ""
  );
  const [gitHubURL, setGitHubURL] = useState(
    data?.github_URL ? data.github_URL : ""
  );
  const [skypeId, setSkypeId] = useState(data?.skype_id ? data.skype_id : "");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!linkedInURL.startsWith("www.linkedin.com/in/") && linkedInURL !== "") {
      alert("please enter linkedin url in mentioned format");
    } else if (!gitHubURL.startsWith("github.com/") && gitHubURL !== "") {
      alert("please enter github url in mentioned format");
    } else if (skypeId.length < 4 && skypeId !== "") {
      alert("please enter a valid skype Id");
    } else {
      // if (!location) {
      //   message.error("Location is required!");
      //   return;
      // }
      // if (!languages) {
      //   message.error("Language is required!");
      //   return;
      // }
      try {
        // setLoading(true);
        const res = await axios.put(`${baseUrl}/api/user/personal-info/`, {
          linkedInURL,
          gitHubURL,
          skypeId,
        });
        // setLoading(false);
        if (res.status === 200) {
          axios
            .put(`${baseUrl}/api/user/update-step`, { step: "LOCATION" })
            .then((res) => {
              message.success("Updated successfully!");
              setCurrent((prev) => prev + 1);
              // forward();
            })
            .catch((err) => console.log(err));
        } else {
          message.error("Something went wrong!");
        }
      } catch (err) {
        // setLoading(false);
        console.log(err.response);
        // message.error("Something went wrong!");
      }
    }
  };

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

  return (
    <>
      <Row gutter={[80, 0]}>
        <Col span={24}>
          <div style={{ display: "flex", marginTop: "-3%" }}>
            <StyledParagraph>Contact Information</StyledParagraph>
            <StyledSkip style={{ alignContent: "right" }}>
              <a onClick={() => setCurrent((prev) => prev + 1)}>
                Skip this step <img src={arrow} alt="" />
                <img src={bigarrow} alt="" />
              </a>
            </StyledSkip>
          </div>
          <Divider
            type="horizontal"
            style={{
              height: "100%",
              color: "rgba(0, 0, 0, 0.1)",
              marginTop: "-1%",
            }}
          />
        </Col>
      </Row>

      <form onSubmit={onSubmit}>
        <Row>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>LinkedIn</Styledlabel>
          </Col>
          <Col span={19}>
            <Input
              inputType="withLabel"
              //   label="Benefits"
              // type="email"
              placeholder="www.linkedin.com/in/your_profile_id"
              value={linkedInURL}
              onChange={(e) => {
                setLinkedInURL(e.target.value);
                data.linked_In_URL = e.target.value;
              }}
              // required
              style={{
                width: "80%",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
                border: "1px solid #F4F8FE",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Github</Styledlabel>
          </Col>
          <Col span={19}>
            <Input
              inputType="withLabel"
              //   label="Benefits"
              // type="email"
              placeholder="github.com/your_username"
              value={gitHubURL}
              onChange={(e) => {
                setGitHubURL(e.target.value);
                data.github_URL = e.target.value;
              }}
              // required
              style={{
                width: "80%",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
                border: "1px solid #F4F8FE",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Skype Id</Styledlabel>
          </Col>
          <Col span={19}>
            <Input
              inputType="withLabel"
              //   label="Benefits"
              type="string"
              placeholder="skype Id"
              value={skypeId}
              onChange={(e) => {
                setSkypeId(e.target.value);
                data.skype_id = e.target.value;
              }}
              // required
              style={{
                width: "80%",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
          </Col>
        </Row>
        {/* <Row>
                          <Col
                            xs={24}
                            md={12}
                            lg={24}
                            style={{
                              marginLeft: "6%",
                              marginTop: "5%",
                            }}
                          >
                            <StyledParagraph
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              Linked Accounts
                            </StyledParagraph>
                          </Col>
                        </Row> */}
        {/* <Row>
                          <Col
                            xs={24}
                            md={12}
                            lg={24}
                            style={{
                              // color: "#f00",
                              marginLeft: "6%",
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <StyledSocialButton type="primary">
                                <img src={facebook} alt="" /> &nbsp; FaceBook
                              </StyledSocialButton>
                              <StyledSocialButton
                                style={{ marginLeft: "15px" }}
                                type="primary"
                              >
                                <img src={linkedin} alt="" /> &nbsp; LinkedIn
                              </StyledSocialButton>
                              <StyledSocialButton
                                style={{ marginLeft: "15px" }}
                                type="primary"
                              >
                                <img src={github} alt="" /> &nbsp; Github
                              </StyledSocialButton>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            xs={24}
                            md={12}
                            lg={24}
                            style={{
                              // color: "#f00",

                              marginTop: "2%",
                              marginLeft: "6%",
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <StyledSocialButton type="primary">
                                <img src={be} alt="" /> &nbsp; Behance
                              </StyledSocialButton>
                              <StyledSkipButton
                                style={{
                                  marginLeft: "15px",
                                  backgroundColor: "rgba(26, 119, 242, 0.03)",
                                  color: "#1a77f2",
                                  width: "150px",
                                  borderRadius: "8px",
                                  height: "42px",
                                }}
                                type="primary"
                              >
                                + Add
                              </StyledSkipButton>
                            </div>
                          </Col>
                        </Row> */}
        <Row>
          <Col xs={24} md={24} lg={24}>
            <div
              style={{
                float: "right",
                marginTop: "3%",
                display: "flex",
              }}
            >
              <StyledSkipButton
                onClick={handleBack}
                style={{
                  marginRight: "5%",
                  fontWeight: "bold",
                }}
              >
                Back
              </StyledSkipButton>
              <StyledSubmitButton htmlType="submit">Next</StyledSubmitButton>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default ContactInfo;
