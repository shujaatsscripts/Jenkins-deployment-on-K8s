import React, { useState, useEffect } from "react";
import moment from "moment";
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

const Certification = ({
  // certifications,
  // setCertifications,
  setCurrent,
  data,
  // onSubmit,
}) => {
  const [certifications, setCertifications] = useState(
    data.length
      ? data
      : [
          {
            certificate: "",
            authority: "",
            certificationDate: "",
          },
        ]
  );

  useEffect(() => {
    if (data.length === 0) {
      data.push({
        certificate: "",
        authority: "",
        certificationDate: "",
      });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const res = await axios.post(
        `${baseUrl}/api/user/expertise`,
        certifications
      );
      // setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "DOCUMENT" })
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
      message.error("Something went wrong!");
    }
  };

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleChange = (index, event, type, name) => {
    const values = [...certifications];
    switch (type) {
      case "countryDropDown":
        let value = event.target.value.split(" (")[0];
        values[index][name] = value;
        data[index][name] = value;
        setCertifications(values);
        break;
      case "input":
        values[index][name] = event.target.value;
        data[index][name] = event.target.value;
        setCertifications(values);
        break;
      case "select":
        values[index][name] = event;
        data[index][name] = event;
        setCertifications(values);
        break;
      case "datePicker":
        values[index][name] = event;
        data[index][name] = event;
        setCertifications(values);
        break;
    }
  };

  const addFields = () => {
    data.push({
      certificate: "",
      authority: "",
      certificationDate: "",
    });

    setCertifications([
      ...certifications,
      {
        certificate: "",
        authority: "",
        certificationDate: "",
      },
    ]);
  };

  const handleDelete = (index, e) => {
    e.preventDefault();
    console.log(index);
    if (index > -1) {
      certifications.splice(index, 1);
      data.splice(index, 1);
      setCertifications([...certifications]);
    }
  };

  const date = "YYYY/MM/DD";

  return (
    <>
      <Row gutter={[80, 0]}>
        <Col span={24}>
          <div style={{ display: "flex", marginTop: "-3%" }}>
            <StyledParagraph>Certification</StyledParagraph>
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
        {certifications.map((level, index) => (
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
                span={6}
                style={{
                  margin: "auto",
                }}
              >
                <Styledlabel>Certificate</Styledlabel>
              </Col>
              <Col span={10}>
                <Input
                  inputType="withLabel"
                  //   label="Benefits"
                  type="string"
                  placeholder="Certificate or Award"
                  value={level.certificate}
                  onChange={(event) =>
                    handleChange(index, event, "input", "certificate")
                  }
                  // required
                  style={{
                    // width: "60%",
                    backgroundColor: "rgba(26, 119, 242, 0.05)",
                  }}
                />
              </Col>
              {/* <Col span={9}></Col> */}
              <Col span={8} style={{ textAlign: "right" }}>
                <a onClick={(e) => handleDelete(index, e)}>
                  <DeleteOutlined style={{ color: "red" }} />
                </a>
              </Col>
            </Row>
            <Row>
              <Col
                span={6}
                style={{
                  margin: "auto",
                }}
              >
                <Styledlabel>
                  Certification Authority
                  <br />
                  <StyledlabelSpan>e.g Amazon</StyledlabelSpan>
                </Styledlabel>
              </Col>
              <Col span={10}>
                <Input
                  inputType="withLabel"
                  //   label="Benefits"
                  type="string"
                  placeholder="e.g Amazon"
                  value={level.authority}
                  onChange={(event) =>
                    handleChange(index, event, "input", "authority")
                  }
                  // required
                  style={{
                    // width: "60%",
                    backgroundColor: "rgba(26, 119, 242, 0.05)",
                  }}
                />
              </Col>
              <Col span={8}></Col>
            </Row>
            <Row style={{ marginTop: "2%" }}>
              <Col
                span={6}
                style={{
                  margin: "auto",
                }}
              >
                <Styledlabel>Certification Date</Styledlabel>
              </Col>
              <Col span={10}>
                <StyledDatePicker
                  defaultValue={
                    level.certificationDate
                      ? moment(level.certificationDate)
                      : null
                  }
                  onChange={(date, dateString) =>
                    handleChange(
                      index,
                      dateString,
                      "datePicker",
                      "certificationDate"
                    )
                  }
                  // picker="year"
                  format={date}
                  suffixIcon={
                    <CalendarOutlined
                      style={{
                        color: "#1a77f2",
                      }}
                    />
                  }
                  placeholder="Certification Date"
                  style={{
                    // width: "100px",
                    backgroundColor: "rgba(26, 119, 242, 0.05)",
                    height: "40px",
                    borderRadius: "8px",
                    //   marginLeft: "-5%",
                  }}
                />
              </Col>
              <Col span={8}></Col>
            </Row>
            <br />
            <br />
          </>
        ))}

        <Row style={{ marginLeft: "7%" }}>
          <Col xs={24} md={12} lg={12}>
            <StyledAddButton
              type="button"
              onClick={addFields}
              style={{
                marginLeft: "0%",
              }}
            >
              + Add
            </StyledAddButton>
          </Col>
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

export default Certification;
