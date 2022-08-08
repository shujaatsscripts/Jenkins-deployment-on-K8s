import React, { useState, useEffect } from "react";
import { Row, Col, Spin, message, Steps, Divider, Upload, Radio } from "antd";
// import facebook from "./images/facebook.svg";
// import linkedin from "./images/linkedin.svg";
// import github from "./images/github.svg";
// import be from "./images/be.svg";
import ProfilePic from "../../../../images/recruiterDashboard/Male.svg";
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
import moment from "moment";
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
// import Select from "../../../components/Select";
// import Button from "../../../components/Button";
import axios, { baseUrl } from "../../../../utils/axios";
// import { useHistory, useParams } from "react-router-dom";
// import { countries, nationalities, timeZones } from "../../../utils/data";
// import moment from "moment";
// import styled from "styled-components";
// import { StyledButton } from "../JobDetails";
import { getFileExtension } from "../../../../utils/index";
import { useDispatch, useSelector } from "react-redux";

const PersonalInfo = ({
  // firstName,
  // setFirstName,
  // lastName,
  // setLastName,
  // numberCode,
  // setNumberCode,
  // phoneNumber,
  // setPhoneNumber,
  // dateOfBirth,
  // setDateOfBirth,
  // title,
  // setTitle,
  // setDOBDay,
  // setDOBMonth,
  // setDOBYear,
  setCurrent,
  data,
  // onSubmit,
}) => {
  const dispatch = useDispatch();
  // const { profileURL } = useSelector((state) => state.auth);

  const style = {
    backgroundColor: "rgba(26, 119, 242, 0.05)",
    // marginLeft: "15px",
    // "@media (max-width: 576px)": {
    //   marginLeft: "0px",
    // },
  };
  const dateFormat = "YYYY/MM/DD";
  const monthFormat = "MM";

  const [firstName, setFirstName] = useState(
    data?.first_name ? data.first_name : ""
  );
  const [lastName, setLastName] = useState(
    data?.last_name ? data.last_name : ""
  );
  const [numberCode, setNumberCode] = useState(
    data?.phone ? data.phone.split("-")[0] : "92"
  );
  const [phoneNumber, setPhoneNumber] = useState(
    data?.phone ? data.phone.split("-")[1] : ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    data?.date_of_birth ? data.date_of_birth : ""
  );
  const [title, setTitle] = useState(data?.title ? data.title : "");
  const [profileURL, setProfileURL] = useState(
    data?.profile_URL ? data.profile_URL : ""
  );

  // const [dobDay, setDOBDay] = useState(
  //   data?.dateOfBirth ? data.dateOfBirth : ""
  // );
  // const [dobMonth, setDOBMonth] = useState(
  //   data?.dateOfBirth ? data.dateOfBirth : ""
  // );
  // const [dobYear, setDOBYear] = useState(
  //   data?.dateOfBirth ? data.dateOfBirth : ""
  // );
  const [attachment, setAttachment] = useState(null);
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const validFileTypes = ["jpeg", "png", "jpg"];

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      let phone = numberCode + "-" + phoneNumber;
      // let dateOfBirth = dobYear + "/" + dobMonth + "/" + dobDay;
      let personalInfo = {
        firstName,
        lastName,
        title,
        phone,
        dateOfBirth,
        profileURL: "",
      };

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          `${baseUrl}/api/upload?type=images`,
          formData
        );
        console.log("image url", res.data.data);
        data.profile_URL = res.data.data;
        personalInfo.profileURL = res.data.data;
        setProfileURL(res.data.data);
        dispatch({
          type: "auth/update_profile",
          payload: { profileURL: res.data.data },
        });
        setFile(null);
      }

      const res = await axios.put(
        `${baseUrl}/api/user/personal-info/`,
        personalInfo
      );
      // setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "EDUCATION" })
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

  // const handleCancel = () => {
  //   setVisible(false);
  // };

  const validateFiles = (list) => {
    // If more than 1 files are uploaded
    console.log("file name", list);
    if (list.fileList.length > 1) {
      message.error("Only 1 file allowed");
      return false;
    }
    // if invalid file type is uploaded
    if (!validFileTypes.includes(getFileExtension(list.file).toLowerCase())) {
      message.error("Invalid file type");
      return false;
    }
    return true;
  };

  const uploadFile = async (file) => {
    let singleFile = file.originFileObj;
    setFile(singleFile);
  };

  const handleFileDrop = (list) => {
    if (validateFiles(list)) {
      uploadFile(list.file);
      let temp = [];
      Array.from(list.fileList).forEach((el) => temp.push(el));
      setAttachment(temp[0]);
    }
  };

  return (
    <>
      {/* <Modal
        visible={visible}
        okText="Save"
        onOk={handleOk}
        // onCancel={handleCancel}
      >
        <Upload
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          file={attachment}
          onChange={handleFileDrop}
          // onPreview={onPreview}
          // handleFileDrop={handleFileDrop}
          // file={attachment}
          maxCount={1}
        >
          {fileList.length < 2 && "+ Upload"}
        </Upload>
      </Modal> */}
      <Row gutter={[80, 0]}>
        <Col span={24}>
          <div style={{ display: "flex", marginTop: "-3%" }}>
            <StyledParagraph>Personal information</StyledParagraph>
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
            <Styledlabel>Profile Picture*</Styledlabel>
          </Col>
          <Col span={19}>
            <div style={{ display: "flex" }}>
              <Upload
                listType="picture-card"
                file={attachment}
                onChange={handleFileDrop}
                maxCount={1}
              >
                {fileList.length < 2 && "+ Upload"}
              </Upload>
              <img
                src={profileURL ? profileURL : ProfilePic}
                style={{ width: "22%", borderRadius: "100px" }}
                alt="avatar"
              />
            </div>
            {/* <UserOutlined
              style={{
                display: "block",
                margin: "auto",
                // height: "20px",
                width: "15%",
                padding: "20px",
                backgroundColor: "#F7F7F7",
                borderRadius: "50%",
              }}
            /> */}
          </Col>
        </Row>
        <Row style={{ border: "0px solid black" }}>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel style={{ marginTop: "10px" }}>Your Name*</Styledlabel>
          </Col>
          <Col span={9}>
            <Input
              inputType="withLabel"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                data.first_name = e.target.value;
              }}
              required
              style={{
                backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={9}>
            <Input
              inputType="withLabel"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                data.last_name = e.target.value;
              }}
              required
              style={style}
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
            <Styledlabel style={{ marginTop: "10px" }}>
              Current Title*
            </Styledlabel>
          </Col>
          <Col span={9}>
            <Input
              inputType="withLabel"
              type="text"
              placeholder="Current Job Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                data.title = e.target.value;
              }}
              required
              style={style}
            />
          </Col>
          <Col span={10}></Col>
        </Row>
        <Row style={{ border: "0px solid black" }}>
          <Col
            span={5}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel style={{ marginBottom: "10px" }}>
              Phone Number*
            </Styledlabel>
          </Col>

          <Col span={6}>
            <PhoneInput
              inputStyle={{
                borderRadius: "5px",
                // marginLeft: "10px",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
                height: "40px",
                width: "100%",
              }}
              countryCodeEditable={false}
              country={"pk"}
              value={numberCode}
              onChange={(e) => {
                setNumberCode(e);
                data.phone = e + "-" + data.phone.split("-")[1];
              }}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={12} style={{ border: "0px solid black" }}>
            <Input
              inputType="withLabel"
              type="tel"
              pattern="[0-9]{4,15}"
              min={1}
              placeholder="enter 4 to 15 digit phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                data.phone = data?.phone?.split("-")[0] + "-" + e.target.value;
              }}
              required
              style={{
                width: "100%",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
                marginTop: "-27px",
                // marginLeft: "15px",
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
            <Styledlabel>Date of Birth*</Styledlabel>
          </Col>
          <Col span={19}>
            <Space direction="horizontal">
              <StyledDatePicker
                defaultValue={dateOfBirth ? moment(dateOfBirth) : null}
                disabledDate={(current) => {
                  // Can not select days before today and today
                  return current && current.valueOf() > Date.now();
                }}
                onChange={(date, dateString) => {
                  setDateOfBirth(dateString);
                  data.date_of_birth = dateString;
                }}
                suffixIcon={
                  <CalendarOutlined
                    style={{
                      fontSize: "20px",
                      color: "#1a77f2",
                    }}
                  />
                }
                format={dateFormat}
                placeholder="Date of Birth"
                style={{
                  width: "100%",
                  backgroundColor: "rgba(26, 119, 242, 0.05)",
                  height: "40px",
                  borderRadius: "8px",
                }}
              />
              {/* <StyledDatePicker
                onChange={(date, dateString) => setDOBMonth(dateString)}
                picker="month"
                format={monthFormat}
                suffixIcon={null}
                placeholder="Month"
                style={{
                  width: "95px",
                  backgroundColor: "rgba(26, 119, 242, 0.05)",
                  height: "40px",
                  borderRadius: "8px",
                }}
              />
              <StyledDatePicker
                onChange={(date, dateString) => setDOBYear(dateString)}
                picker="year"
                suffixIcon={null}
                placeholder="Year"
                style={{
                  width: "170px",
                  backgroundColor: "rgba(26, 119, 242, 0.05)",
                  height: "40px",
                  borderRadius: "8px",
                }}
              /> */}
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
              <StyledSubmitButton htmlType="submit">Next</StyledSubmitButton>
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default PersonalInfo;
