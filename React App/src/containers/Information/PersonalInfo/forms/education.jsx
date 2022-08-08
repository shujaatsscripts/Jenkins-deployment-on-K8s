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
import "../styles.css";

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
// import { StyledButton } from "../JobDetails";

const Education = ({
  // education,
  // setEducation,
  setCurrent,
  data,
  setData,
  // onSubmit
}) => {
  const [education, setEducation] = useState(
    data?.length
      ? data
      : [
          {
            country: "Pakistan",
            school: "",
            degree: "Doctrate/PHD",
            major: "",
            startDate: "",
            endDate: "",
          },
        ]
  );

  useEffect(() => {
    console.log("education");
    console.log(data);
    if (data?.length === 0) {
      data.push({
        country: "Pakistan",
        school: "",
        degree: "Doctrate/PHD",
        major: "",
        startDate: "",
        endDate: "",
      });
      console.log(data);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const res = await axios.post(`${baseUrl}/api/user/education`, education);
      // setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "EXPERIENCE" })
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
      console.log(err);
      // message.error("Something went wrong!");
    }
  };

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleEducationChange = (index, event, type, name) => {
    const values = [...education];
    switch (type) {
      case "countryDropDown":
        let value = event.target.value.split(" (")[0];
        values[index][name] = value;
        data[index][name] = value;
        console.log(data);
        setEducation(values);
        // education[index][name] = value;
        break;
      case "input":
        values[index][name] = event.target.value;
        data[index][name] = event.target.value;
        setEducation(values);
        break;
      case "select":
        values[index][name] = event;
        data[index][name] = event;
        setEducation(values);
        break;
      case "datePicker":
        values[index][name] = event;
        data[index][name] = event;
        setEducation(values);
        break;
    }
  };

  const addEducationFields = () => {
    data.push({
      country: "Pakistan",
      school: "",
      degree: "Doctrate/PHD",
      major: "",
      startDate: "",
      endDate: "",
    });

    setEducation([
      ...education,
      {
        country: "Pakistan",
        school: "",
        degree: "Doctrate/PHD",
        major: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleDeleteEducation = (index, e) => {
    e.preventDefault();
    console.log(index);
    if (index > -1) {
      education.splice(index, 1);
      data.splice(index, 1);
      setEducation([...education]);
    }
  };

  const startDate = "YYYY/MM/DD";

  return (
    <>
      <Row gutter={[80, 0]}>
        <Col span={24}>
          <div style={{ display: "flex", marginTop: "-3%" }}>
            <StyledParagraph>Education</StyledParagraph>
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
        {education.map((level, index) => (
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
                <Styledlabel>
                  Country
                  <br />
                  <StyledlabelSpan>of College/ University</StyledlabelSpan>
                </Styledlabel>
              </Col>

              <Col span={10}>
                <CountryDropdown
                  className="CountryList"
                  // preferredCountries={["pk"]}
                  name="country"
                  value={level.country}
                  handleChange={(event) =>
                    handleEducationChange(
                      index,
                      event,
                      "countryDropDown",
                      "country"
                    )
                  }
                ></CountryDropdown>
              </Col>
              <Col span={9} style={{ textAlign: "right" }}>
                <a onClick={(e) => handleDeleteEducation(index, e)}>
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
                <Styledlabel>
                  Name
                  <br />
                  <StyledlabelSpan>of College/ University</StyledlabelSpan>
                </Styledlabel>
              </Col>
              <Col span={10}>
                <Input
                  inputType="withLabel"
                  type="string"
                  placeholder="e.g NUST"
                  value={level.school}
                  name="school"
                  onChange={(event) =>
                    handleEducationChange(index, event, "input", "school")
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
                <Styledlabel>Degree</Styledlabel>
              </Col>
              <Col span={9}>
                <Select
                  className="Selectcolor"
                  type="withLabel"
                  dropdownStyle={{
                    minWidth: "20%",
                  }}
                  options={[
                    "Secondary Education",
                    "Higher Secondary Education",
                    "College/Diploma",
                    "Undergrad/Bachelor",
                    "Post Graduate/Masters",
                    "Doctrate/PHD",
                    "Postdoc/Specialization",
                  ]}
                  name="degree"
                  value={level.degree}
                  placeholder="Title"
                  onChange={(event) =>
                    handleEducationChange(index, event, "select", "degree")
                  }
                  required
                  style={{
                    // width: "50%",
                    borderRadius: "5px",
                  }}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={9}>
                <Input
                  inputType="withLabel"
                  type="text"
                  placeholder="Major"
                  value={level.major}
                  name="major"
                  onChange={(event) =>
                    handleEducationChange(index, event, "input", "major")
                  }
                  required
                  style={{
                    // width: "90%",
                    // marginLeft: "-26%",
                    backgroundColor: "rgba(26, 119, 242, 0.05)",
                    marginTop: "-4%",
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "1%" }}>
              <Col
                span={5}
                style={{
                  margin: "auto",
                }}
              >
                <Styledlabel>Dates Attended</Styledlabel>
              </Col>
              <Col span={19} style={{ marginBottom: "3%" }}>
                <Space direction="horizontal">
                  <StyledDatePicker
                    name="from"
                    // defaultValue={
                    //   level.startDate ? moment(level.startDate) : null
                    // }
                    value={level.startDate ? moment(level.startDate) : null}
                    onChange={(date, dateString) => {
                      let endDate = level?.endDate
                        ? new Date(level?.endDate)
                        : false;
                      if (date < endDate || !endDate) {
                        handleEducationChange(
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
                      // width: "150px",
                      backgroundColor: "rgba(26, 119, 242, 0.05)",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                  />
                  &nbsp;<span>to</span>&nbsp;
                  <StyledDatePicker
                    name="to"
                    defaultValue={level.endDate ? moment(level.endDate) : null}
                    value={level.endDate ? moment(level.endDate) : null}
                    onChange={(date, dateString) => {
                      let startDate = level?.startDate
                        ? new Date(level?.startDate)
                        : false;
                      if (date > startDate || !startDate) {
                        handleEducationChange(
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
                      // width: "150px",
                      backgroundColor: "rgba(26, 119, 242, 0.05)",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                  />
                </Space>
              </Col>
            </Row>
          </>
        ))}
        <br />
        <br />
        <Col xs={24} md={12} lg={12}>
          <StyledAddButton onClick={addEducationFields}>+ Add</StyledAddButton>
        </Col>

        <Col xs={24} md={24} lg={24}>
          <div
            style={{
              float: "right",
              marginTop: "7%",
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
      </form>
    </>
  );
};

export default Education;
