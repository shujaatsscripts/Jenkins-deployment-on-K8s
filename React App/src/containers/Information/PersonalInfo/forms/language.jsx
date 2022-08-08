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
import attachment from "../images/attachment.svg";
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

const Language = ({
  // language,
  // setLanguage,
  // proficiency,
  // Proficiency,
  setCurrent,
  data,
  // onSubmit,
}) => {
  const [language, setLanguage] = useState(
    data?.language ? data.language : "English"
  );
  const [proficiency, setProficiency] = useState(
    data?.proficiency ? data.proficiency : ""
  );

  const Proficiency = (e) => {
    console.log("radio checked", e.target.value);
    data.proficiency = e.target.value;
    setProficiency(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
        language,
        proficiency,
      });
      // setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "COMPLETED" })
          .then((res) => {
            message.success("Updated successfully!");
            // setCurrent((prev) => prev + 1);
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
  };

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

  const onChange = (current) => {
    console.log(current);
    setCurrent(current);
  };

  return (
    <>
      <Row gutter={[80, 0]}>
        <Col span={24}>
          <div style={{ display: "flex", marginTop: "-3%" }}>
            <StyledParagraph>Language</StyledParagraph>
            {/* <StyledSkip style={{ alignContent: "right" }}>
              <a onClick={() => setCurrent((prev) => prev + 1)}>
                Skip this step <img src={arrow} alt="" />
                <img src={bigarrow} alt="" />
              </a>
            </StyledSkip> */}
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
            xs={24}
            md={12}
            lg={6}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Select Language</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={15}>
            <Select
              type="withLabel"
              options={["Urdu", "English", "Punjabi", "Pushto", "Sindhi"]}
              value={language}
              placeholder="Select Language"
              onChange={(value) => {
                setLanguage(value);
                data.language = value;
              }}
              required
              style={{ width: "60%" }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "2%" }}>
          <Col
            xs={24}
            md={12}
            lg={6}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Proficiency</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={15}>
            <Radio.Group onChange={Proficiency} value={proficiency}>
              <Row>
                <Col xs={24} md={12} lg={12}>
                  <StyledRadioButton value="basic">Basic</StyledRadioButton>
                </Col>
                <Col xs={24} md={12} lg={12}>
                  <StyledRadioButton value="intermeidate">
                    Intermeidate
                  </StyledRadioButton>
                </Col>
              </Row>

              <Row style={{ marginTop: "2%" }}>
                <Col xs={24} md={12} lg={12}>
                  <StyledRadioButton value="expert">Expert</StyledRadioButton>
                </Col>
                <Col xs={24} md={12} lg={12}>
                  <StyledRadioButton value="native">Native</StyledRadioButton>
                </Col>
              </Row>
            </Radio.Group>
          </Col>
        </Row>
        <br />
        <br />
        {/* <Row>
          <Col xs={24} md={12} lg={12}>
            <StyledAddButton
              style={{
                // width: "110px",
                // height: "42px",
                marginLeft: "12%",
                fontWeight: "bold",
              }}
            >
              + Add
            </StyledAddButton>
          </Col>
        </Row> */}
        <Row>
          <Col xs={24} md={24} lg={24}>
            <div
              style={{
                float: "right",
                marginTop: "10%",
                display: "flex",
              }}
            >
              {/* <button>Next</button> */}
              <StyledSkipButton
                onClick={handleBack}
                style={{
                  marginRight: "5%",
                  fontWeight: "bold",
                }}
              >
                Back
              </StyledSkipButton>
              <StyledSubmitButton htmlType="submit">Save</StyledSubmitButton>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default Language;
