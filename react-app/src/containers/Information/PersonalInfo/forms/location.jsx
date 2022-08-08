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

const Location = ({
  // country,
  // setCountry,
  // city,
  // setCity,
  // state,
  // setState,
  // streetAddress,
  // setStreetAddress,
  // zipCode,
  // setZipCode,
  setCurrent,
  data,
  // onSubmit,
}) => {
  const [country, setCountry] = useState(
    data?.country ? data.country : "Pakistan"
  );
  const [city, setCity] = useState(data?.city ? data.city : "");
  const [state, setState] = useState(data?.state ? data.state : "");
  const [streetAddress, setStreetAddress] = useState(
    data?.street_address ? data.street_address : ""
  );
  const [zip, setZip] = useState(data?.zip ? data.zip : "");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      let location =
        streetAddress + ", " + city + ", " + state + ", " + country;
      const res = await axios.put(`${baseUrl}/api/user/personal-info/`, {
        location,
        country,
        city,
        state,
        streetAddress,
        zip,
      });
      // setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "CERTIFICATION" })
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
      message.error("Something went wrong!");
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
            <StyledParagraph>Location</StyledParagraph>
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
            <Styledlabel>Country</Styledlabel>
          </Col>
          <Col span={10}>
            <CountryDropdown
              //   style={{ margin: "auto" }}
              className="CountryList"
              preferredCountries={["pk", "gb"]}
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              handleChange={(event) => {
                let value = event.target.value.split(" (")[0];
                data.country = event.target.value.split(" (")[0];
                setCountry(value);
              }}
              required
            ></CountryDropdown>
          </Col>
          <Col span={9}></Col>
        </Row>
        <Row style={{ marginTop: "2%" }}>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>City</Styledlabel>
          </Col>
          <Col span={10}>
            <Input
              inputType="withLabel"
              type="string"
              placeholder="e.g. London"
              pattern
              value={city}
              onChange={(e) => {
                if (
                  /^[\sa-zA-Z\s]+$/.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setCity(e.target.value);
                  data.city = e.target.value;
                } else {
                  alert("only letters are allowed in city.");
                }
              }}
              required
              style={{
                // width: "60%",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
            {/* <Select
                              type="withLabel"
                              options={[
                                "Rawalpindi",
                                "Lahore",
                                "Fasaliabad",
                                "Islamabad",
                                "Peshawar",
                                "Attock",
                                "Texila",
                              ]}
                              value={cityLocation}
                              placeholder="City"
                              onChange={(value) => setCityLocation(value)}
                              required
                              style={{
                                width: "49%",
                                backgroundColor: "#40a9ff",
                                display: "flex",
                                borderRadius: "6px",
                              }}
                            /> */}
          </Col>
          <Col span={9}></Col>
        </Row>
        <Row>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>State/Province</Styledlabel>
          </Col>
          <Col span={10}>
            <Input
              inputType="withLabel"
              type="string"
              placeholder="Nets International"
              value={state}
              onChange={(e) => {
                if (
                  /^[\sa-zA-Z\s]+$/.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setState(e.target.value);
                  data.state = e.target.value;
                } else {
                  alert("only letters are allowed in state/province.");
                }
              }}
              // required
              style={{
                // width: "60%",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
            {/* <Select
                              type="withLabel"
                              options={[
                                "Baluchistan",
                                "Fedral Capital Area",
                                "Northern Areas",
                                "Punjab",
                                "Sindth",
                                "KPK",
                              ]}
                              value={stateLocation}
                              placeholder="State/Province"
                              onChange={(value) => setStateLocation(value)}
                              required
                              style={{
                                width: "49%",
                                backgroundColor: "#40a9ff",
                                display: "flex",
                                borderRadius: "6px",
                              }}
                            /> */}
          </Col>
          <Col span={9}></Col>
        </Row>
        <Row style={{ marginTop: "2%" }}>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Street Address</Styledlabel>
          </Col>
          <Col span={10}>
            <StyledTextArea
              value={streetAddress}
              onChange={(e) => {
                setStreetAddress(e.target.value);
                data.street_address = e.target.value;
              }}
              placeholder="Street Address"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Col>
          <Col span={9}></Col>
        </Row>
        <Row style={{ marginTop: "1%" }}>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Zip/Postal Code</Styledlabel>
          </Col>
          <Col span={10}>
            <Input
              inputType="withLabel"
              //   label="Benefits"
              type="string"
              placeholder="Code"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value);
                data.zip = e.target.value;
              }}
              required
              style={{
                // width: "60%",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
          </Col>
          <Col span={9}></Col>
        </Row>

        <Row>
          <Col xs={24} md={24} lg={24}>
            <div
              style={{
                float: "right",
                marginTop: "4%",
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
              <StyledSubmitButton htmlType="submit">Next</StyledSubmitButton>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default Location;
