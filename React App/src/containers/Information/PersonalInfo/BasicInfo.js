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
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import "./styles.css";

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

const BasicInfo = ({
  basicInfoData,
  //   setFirstName,
  //   setLastName,
  //   setPhoneNumber,
  //   setNumberCode,
}) => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
    // day: "",
    // month: "",
    // year: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e);
  };
  const handleday = (m) => {
    const day = m._d.getDay();
    console.log(m.getDay());
    // setformData({ ...formData, day });
  };
  const handleMonth = (date, dateString) => {
    // const SelectedDay = moment.day._d.getDay();
    console.log(date, dateString);
    // const SelectedDay = moment.day._d.getDay();
    // setformData({ ...formData, SelectedDay });
  };
  const handleYear = (date, dateString) => {
    // const SelectedDay = moment.day._d.getDay();
    console.log(date, dateString);
    // const SelectedDay = moment.day._d.getDay();
    // setformData({ ...formData, SelectedDay });
  };
  const handleNumberCodeChange = (countryCode) => {
    setformData({
      ...formData,
      countryCode,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    basicInfoData(formData);
    console.log(formData);
  };
  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setFormData((prevState) => {
  //       return {
  //         ...prevState,
  //         [name]: value,
  //       };
  //     });
  //   };
  //   const { firstName, lastName, countryCode, phoneNumber } = formData;

  const dateFormat = "DD";
  const monthFormat = "MM";
  function date(date, dateString) {
    console.log(date, dateString);
  }

  const history = useHistory();
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");

  //   const [phoneNumber, setPhoneNumber] = useState("");
  //   const [NumberCode, setNumberCode] = useState("92");

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     const a = setFirstName((prev) => [...prev, formData]);
  //     const b = setLastName((prev) => [...prev, formData]);
  //     const c = setNumberCode((prev) => [...prev, formData]);
  //     const d = setPhoneNumber((prev) => [...prev, formData]);
  //     console.log(a, b, c, d);
  //   };

  return (
    <>
      <Row gutter={[80, 0]}>
        <Col span={24}>
          <div style={{ display: "flex", marginTop: "-3%" }}>
            <StyledParagraph>Personal information</StyledParagraph>
            <StyledSkip style={{ alignContent: "right" }}>
              Skip this step <img src={arrow} alt="" />
              <img src={bigarrow} alt="" />
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
      <form onSubmit={handleSubmit}>
        <Row>
          <Col
            xs={24}
            md={12}
            lg={6}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Profile Picture*</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={15}>
            <UserOutlined
              style={{
                display: "block",
                margin: "auto",
                width: "20%",
                padding: "30px",
                backgroundColor: "#F7F7F7",
                borderRadius: "50%",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            md={12}
            lg={7}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel style={{ marginTop: "10px" }}>Your Name*</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={7}>
            <Input
              inputType="withLabel"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              //   onChange={(e) => setFirstName(e.target.value)}
              required
              style={{
                backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
          </Col>
          <Col xs={24} md={12} lg={7}>
            <Input
              inputType="withLabel"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              //   value={lastName}
              //   onChange={(e) => setLastName(e.target.value)}
              required
              style={{
                backgroundColor: "rgba(26, 119, 242, 0.05)",
                marginLeft: "15px",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col
            xs={24}
            md={12}
            lg={7}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel style={{ marginBottom: "10px" }}>
              Phone Number*
            </Styledlabel>
          </Col>

          <Col xs={24} md={12} lg={4}>
            <PhoneInput
              inputStyle={{
                borderRadius: "5px",
                marginLeft: "10px",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
                height: "40px",
                width: "95px",
              }}
              countryCodeEditable={false}
              country={"pk"}
              name="countryCode"
              value={formData.countryCode}
              onChange={handleNumberCodeChange}
              //   value={NumberCode}
              // onChange={(e) => setNumberCode(e)}
            />
          </Col>
          <Col xs={24} md={12} lg={10}>
            <Input
              inputType="withLabel"
              type="number"
              min={1}
              placeholder="1234567890"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              //   value={phoneNumber}
              //   onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={{
                backgroundColor: "rgba(26, 119, 242, 0.05)",
                marginTop: "-27px",
                marginLeft: "15px",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            md={12}
            lg={7}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Date of Birth*</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={14}>
            <Space direction="horizontal">
              <StyledDatePicker
                onChange={date}
                suffixIcon={null}
                format={dateFormat}
                placeholder="Day"
                style={{
                  width: "80px",
                  backgroundColor: "rgba(26, 119, 242, 0.05)",
                  height: "40px",
                  borderRadius: "8px",
                }}
              />
              <StyledDatePicker
                onChange={date}
                picker="month"
                format={monthFormat}
                suffixIcon={null}
                placeholder="Month"
                style={{
                  width: "95px",
                  backgroundColor: "rgba(26, 119, 242, 0.05)",
                  height: "40px",
                  borderRadius: "8px",
                  //   marginLeft: "-2%",
                }}
              />
              <StyledDatePicker
                onChange={date}
                picker="year"
                suffixIcon={null}
                placeholder="Year"
                style={{
                  width: "170px",
                  backgroundColor: "rgba(26, 119, 242, 0.05)",
                  height: "40px",
                  borderRadius: "8px",
                  //   marginLeft: "-5%",
                }}
              />
              <StyledDatePicker
                onChange={date}
                placeholder=""
                suffixIcon={
                  <CalendarOutlined
                    style={{
                      color: "#1a77f2",
                    }}
                  />
                }
                style={{
                  width: "30%",
                  backgroundColor: "rgba(26, 119, 242, 0.05)",
                  border: "1px solid rgba(26, 119, 242, 0.05)",
                  height: "40px",
                  borderRadius: "20px",
                  color: "blue",
                  paddingRight: "33px",
                  marginLeft: "20%",
                }}
              />
            </Space>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} lg={24}>
            <div
              style={{
                float: "right",
                marginTop: "7%",
                display: "flex",
              }}
            >
              {/* <button>Next</button> */}
              <StyledSkipButton
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

export default BasicInfo;
