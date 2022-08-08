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
import { getFileExtension } from "../../../../utils/index";
// import { useHistory, useParams } from "react-router-dom";
// import { countries, nationalities, timeZones } from "../../../utils/data";
// import moment from "moment";
// import styled from "styled-components";
// import { StyledButton } from "../JobDetails"

const Documents = ({
  // documentType,
  // setDocumentType,
  // documentIssuer,
  // setDocumentIssuer,
  // cnic,
  // setCnic,
  setCurrent,
  data,
  // onSubmit,
}) => {
  const [documentType, setDocumentType] = useState(
    data?.document_type ? data.document_type : ""
  );
  const [documentIssuer, setDocumentIssuer] = useState(
    data?.document_issuer ? data.document_issuer : ""
  );
  const [cnic, setCnic] = useState(data?.cnic ? data.cnic : "");

  const [attachment, setAttachment] = useState(null);
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const validFileTypes = [".pdf", "jpeg", "png", "jpg"];

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
      data = {
        documentType,
        documentIssuer,
        cnic,
        documentAttachment: "",
      };

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          `${baseUrl}/api/upload?type=images`,
          formData
        );
        console.log("image url", res.data.data);
        data.documentAttachment = res.data.data;
        setFile(null);
      }
      // setLoading(true);
      const res = await axios.put(`${baseUrl}/api/user/personal-info/`, data);
      // setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "LANGUAGE" })
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
  };

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

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
      <Row gutter={[80, 0]}>
        <Col span={24}>
          <div style={{ display: "flex", marginTop: "-3%" }}>
            <StyledParagraph>Documents</StyledParagraph>
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
            xs={24}
            md={12}
            lg={6}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>CNIC/Passport Number</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={15}>
            <Input
              inputType="withLabel"
              //   label="Benefits"
              type="tel"
              // pattern="[0-9]{4,20}"
              // min={1}
              // format={cnic}
              placeholder="enter valid passport or cnic number"
              value={cnic}
              onChange={(e) => {
                setCnic(e.target.value);
                data.cnic = e.target.value;
              }}
              // required
              style={{
                width: "80%",
                backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            md={12}
            lg={6}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Document Issuer</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={15}>
            <Input
              inputType="withLabel"
              //   label="Benefits"
              type="string"
              placeholder="Document Issuer Authority"
              value={documentIssuer}
              onChange={(e) => {
                setDocumentIssuer(e.target.value);
                data.document_issuer = e.target.value;
              }}
              // required
              style={{
                width: "80%",
                // backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
            {/* <Input
              inputType="withLabel"
              //   label="Benefits"
              type="string"
              placeholder="e.g. SSC"
              value={documentType}
              onChange={(e) => {
                setDocumentType(e.target.value);
                data.document_type = e.target.value;
              }}
              // required
              style={{
                width: "80%",
                // backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            /> */}
            {/* <Select
              type="withLabel"
              options={[
                "SSC",
                "HSSC",
                "University Degree/Certificate/Transcript",
              ]}
              value={documentType}
              placeholder="E.g. Male"
              onChange={(value) => setDocumentType(value)}
              required
              style={{ width: "60%" }}
            /> */}
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            md={12}
            lg={6}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Document Type</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={15}>
            <Input
              inputType="withLabel"
              //   label="Benefits"
              type="string"
              placeholder="e.g. SSC"
              value={documentType}
              onChange={(e) => {
                setDocumentType(e.target.value);
                data.document_type = e.target.value;
              }}
              // required
              style={{
                width: "80%",
                // backgroundColor: "rgba(26, 119, 242, 0.05)",
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "1%", marginBottom: "40px" }}>
          <Col
            xs={24}
            md={12}
            lg={6}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>Doc Attachment</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={15}>
            <Upload.Dragger
              // {...props}
              listType="picture"
              // multiple
              accept=".pdf, .jpg, .png"
              iconRender={() => {
                return <FilePdfOutlined></FilePdfOutlined>;
              }}
              progress={{
                strokeWidth: 3,
                strokeColor: {
                  "0%": "#1A77F2",
                  "100%": "#1A77F2",
                },
              }}
              maxCount={1}
              style={{
                border: "blue",
                // border: "1px dashed #1A77F2",
                border: "dashed 2px #1A77F2",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRadius: "8px",
                backgroundColor: "white",
                width: "80%",
                height: "100px",
              }}
              // action={"http://localhost:3000/"}
              onChange={handleFileDrop}
            >
              5MB : PDF, JPG, PNG
              <br />
              <StyledSelectFile>
                <img src={attachment} alt="" />
                &nbsp; Select File
              </StyledSelectFile>
            </Upload.Dragger>
          </Col>
        </Row>
        <Row style={{ marginTop: "1%" }}>
          {/* <Col
            xs={24}
            md={12}
            lg={6}
            style={{
              margin: "auto",
            }}
          >
            <Styledlabel>CNIC/Passport Attachment</Styledlabel>
          </Col>
          <Col xs={24} md={12} lg={15}>
            <Upload.Dragger
              // {...props}
              listType="picture"
              multiple
              accept=".pdf, .jpg, .png"
              iconRender={() => {
                return <FilePdfOutlined></FilePdfOutlined>;
              }}
              progress={{
                strokeWidth: 3,
                strokeColor: {
                  "0%": "#1A77F2",
                  "100%": "#1A77F2",
                },
              }}
              style={{
                border: "blue",
                // border: "1px dashed #1A77F2",
                border: "dashed 2px #1A77F2",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRadius: "8px",
                backgroundColor: "white",
                width: "80%",
                height: "200px",
              }}
              action={"http://localhost:3001/"}
            >
              5MB : PDF, JPG, PNG
              <br />
              <StyledSelectFile>
                <img src={attachment} alt="" />
                &nbsp; Select File
              </StyledSelectFile>
            </Upload.Dragger>
          </Col> */}
        </Row>
        {/* <Row>
          <Col xs={24} md={12} lg={24}>
            <StyledParagraph
              style={{
                marginTop: "4%",
                fontSize: "16px",
                fontWeight: "bold",
                marginLeft: "5%",
              }}
            >
              Other Docments
            </StyledParagraph>
          </Col>
        </Row> */}
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

export default Documents;
