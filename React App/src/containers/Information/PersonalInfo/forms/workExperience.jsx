import React, { useState, useEffect } from "react";
import { Row, Col, Spin, message, Steps, Divider, Upload, Radio } from "antd";
import moment from "moment";
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

const WorkExperience = ({
  // workExperience,
  // setWorkExperience,
  countries,
  setCurrent,
  data,
  // onSubmit,
}) => {
  const [workExperience, setWorkExperience] = useState(
    data.length
      ? data
      : [
          {
            title: "",
            company: "",
            country: "Pakistan",
            city: "",
            startDate: "",
            endDate: "",
          },
        ]
  );

  useEffect(() => {
    if (data.length === 0) {
      data.push({
        title: "",
        company: "",
        country: "Pakistan",
        city: "",
        startDate: "",
        endDate: "",
      });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const res = await axios.post(
        `${baseUrl}/api/user/experience`,
        workExperience
      );
      // setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "CONTACT" })
          .then((res) => {
            message.success("Updated successfully!");
            setCurrent((prev) => prev + 1);
          })
          .catch((err) => console.log(err));
      } else {
        message.error("Something went wrong!");
      }
    } catch (err) {
      // setLoading(false);
      console.log(err);
      message.error("Something went wrong!");
    }
  };

  const startDate = "YYYY/MM/DD";

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleChange = (index, event, type, name) => {
    const values = [...workExperience];
    switch (type) {
      case "countryDropDown":
        let value = event.target.value.split(" (")[0];
        values[index][name] = value;
        data[index][name] = value;
        setWorkExperience(values);
        break;
      case "input":
        values[index][name] = event.target.value;
        data[index][name] = event.target.value;
        setWorkExperience(values);
        break;
      case "select":
        values[index][name] = event;
        data[index][name] = event;
        setWorkExperience(values);
        break;
      case "datePicker":
        values[index][name] = event;
        data[index][name] = event;
        setWorkExperience(values);
        break;
    }
  };

  const addFields = () => {
    data.push({
      title: "",
      company: "",
      country: "Pakistan",
      city: "",
      startDate: "",
      endDate: "",
    });

    setWorkExperience([
      ...workExperience,
      {
        title: "",
        company: "",
        country: "Pakistan",
        city: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleDelete = (index, e) => {
    e.preventDefault();
    console.log(index);
    if (index > -1) {
      workExperience.splice(index, 1); // 2nd parameter means remove one item only
      data.splice(index, 1);
      setWorkExperience([...workExperience]);
    }
  };

  return (
    <>
      <Row gutter={[80, 0]}>
        <Col span={24}>
          <div style={{ display: "flex", marginTop: "-3%" }}>
            <StyledParagraph>Work Experience</StyledParagraph>
            <StyledSkip style={{ alignContent: "right" }}>
              <a onClick={() => setCurrent((prev) => prev + 1)}>
                Skip this step <img src={arrow} alt="" />
                <img src={bigarrow} alt="" />
              </a>
            </StyledSkip>
          </div>
        </Col>
      </Row>

      <form onSubmit={onSubmit}>
        {workExperience.map((work, index) => (
          <>
            <Row>
              <Col span={24}>
                <Divider
                  type="horizontal"
                  style={{
                    height: "100%",
                    color: "rgba(0, 0, 0, 0.1)",
                    marginTop: "-1%",
                  }}
                />
              </Col>
              <Col
                span={5}
                style={{
                  margin: "auto",
                }}
              >
                <Styledlabel>Job Title</Styledlabel>
              </Col>
              <Col span={10}>
                <Input
                  inputType="withLabel"
                  type="string"
                  placeholder="UI/UX Designer"
                  value={work.title}
                  onChange={(event) =>
                    handleChange(index, event, "input", "title")
                  }
                  required
                  style={{
                    // width: "60%",
                    backgroundColor: "rgba(26, 119, 242, 0.05)",
                    border: "1px solid #F4F8FE",
                  }}
                />
              </Col>
              <Col span={9} style={{ textAlign: "right" }}>
                <a onClick={(e) => handleDelete(index, e)}>
                  <DeleteOutlined style={{ color: "red" }} />
                </a>
              </Col>
            </Row>
            <Row>
              <Col
                span={5}
                style={{
                  margin: "auto",
                }}
              >
                <Styledlabel>Company</Styledlabel>
              </Col>
              <Col span={10}>
                <Input
                  inputType="withLabel"
                  type="string"
                  placeholder="Nets International"
                  value={work.company}
                  onChange={(event) =>
                    handleChange(index, event, "input", "company")
                  }
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
              <Col
                span={5}
                style={{
                  margin: "auto",
                }}
              >
                <Styledlabel>Country</Styledlabel>
              </Col>

              <Col span={10} style={{ marginTop: "1%" }}>
                {/* <Select
                  type="withLabel"
                  options={countries}
                  placeholder="E.g: Spain"
                  // value={work.country}
                  onChange={(event) =>
                    handleChange(index, event, "select", "country")
                  }
                  required
                  style={{ width: "95%", marginLeft: "3%" }}
                /> */}
                <div style={{ height: "15px" }}></div>
                <CountryDropdown
                  className="CountryList"
                  // preferredCountries={["pk"]}
                  name="country"
                  value={work.country}
                  handleChange={(event) =>
                    handleChange(index, event, "countryDropDown", "country")
                  }
                ></CountryDropdown>
              </Col>
              <Col span={1}></Col>
              <Col span={8} style={{ marginTop: "-2px" }}>
                <Input
                  inputType="withLabel"
                  type="string"
                  placeholder="City"
                  value={work.city}
                  onChange={(event) =>
                    handleChange(index, event, "input", "city")
                  }
                  required
                  style={{
                    // marginLeft: "10%",
                    // width: "50%",
                    backgroundColor: "rgba(26, 119, 242, 0.05)",
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "3%" }}>
              <Col
                span={5}
                style={{
                  margin: "auto",
                }}
              >
                <Styledlabel style={{ marginLeft: "0px" }}>
                  Dates Attend
                </Styledlabel>
              </Col>
              <Col span={19} style={{ marginRight: "0" }}>
                <Space direction="horizontal">
                  <StyledDatePicker
                    // defaultValue={
                    //   work.startDate ? moment(work.startDate) : null
                    // }
                    value={work.startDate ? moment(work.startDate) : null}
                    onChange={(date, dateString) => {
                      let endDate = work?.endDate
                        ? new Date(work?.endDate)
                        : false;
                      if (date < endDate || !endDate) {
                        handleChange(
                          index,
                          dateString,
                          "datePicker",
                          "startDate"
                        );
                      } else {
                        alert("start date can not be greater than end date.");
                      }
                    }}
                    suffixIcon={
                      <CalendarOutlined
                        style={{
                          fontSize: "20px",
                          color: "#1a77f2",
                        }}
                      />
                    }
                    format={startDate}
                    placeholder="Start Date"
                    style={{
                      width: "150px",
                      backgroundColor: "rgba(26, 119, 242, 0.05)",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                  />
                  <span>to</span>
                  <StyledDatePicker
                    // defaultValue={work.endDate ? moment(work.endDate) : null}
                    value={work.endDate ? moment(work.endDate) : null}
                    onChange={(date, dateString) => {
                      let startDate = work?.startDate
                        ? new Date(work?.startDate)
                        : false;
                      if (date > startDate || !startDate) {
                        handleChange(
                          index,
                          dateString,
                          "datePicker",
                          "endDate"
                        );
                      } else {
                        alert("end date can not be less than start date.");
                      }
                    }}
                    suffixIcon={
                      <CalendarOutlined
                        style={{
                          fontSize: "20px",
                          color: "#1a77f2",
                        }}
                      />
                    }
                    format={startDate}
                    placeholder="End Date"
                    style={{
                      width: "150px",
                      backgroundColor: "rgba(26, 119, 242, 0.05)",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                  />
                </Space>
                {/* </span> */}
              </Col>
            </Row>
            <br />
            <br />
          </>
        ))}
        <br />
        <Row>
          <Col xs={24} md={12} lg={12}>
            <StyledAddButton onClick={addFields}>+ Add</StyledAddButton>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} lg={24}>
            <div
              style={{
                float: "right",
                marginTop: "3%",
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

export default WorkExperience;
