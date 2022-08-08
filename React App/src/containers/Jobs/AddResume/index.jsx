import React, { useEffect, useRef, useState } from "react";
import SingleFile from "./SingleFile";
import Button from "../../../components/Button";
import { Caption, PageContainer } from "../../styles/main.styles";
import {
  SubHeading,
  StyledTextCol,
  AttachmentText,
} from "./styles/addResume.styles";
import { Row, Col, message, Spin } from "antd";
import { getFileExtension } from "../../../utils";
import { useHistory } from "react-router-dom";
import axios, { baseUrl } from "../../../utils/axios";
import { TopRowWrapper, Heading } from "../../styles/main.styles";
import doc from "../../../images/doc.png";

const AddResume = (props) => {
  const history = useHistory();
  const validFileExtensions = [
    "pdf",
    "PDF",
    "jpeg",
    "JPEG",
    "png",
    "PNG",
    "docx",
    "doc",
    "odt",
  ];
  const fileRef = useRef();
  const [files, setFiles] = useState([]);
  // const [uploadedState, setUploadedState] = useState(false);
  const [loading, setLoading] = useState(false);
  const record = props.location?.state?.record;

  // Validate all the criteria for upload of resumes and populate files array accordingly
  const validateAndPopulateFiles = (e) => {
    let invalidFiles = 0;

    // Check if total files are less then 10
    if (e.target.files.length > 10) {
      message.error("Maximum 10 files are allowed!");
      return;
    }

    // check if all files are of valid extensions
    Array.from(e.target.files).forEach((element) => {
      !validFileExtensions.includes(getFileExtension(element)) &&
        invalidFiles++;
    });
    if (invalidFiles > 0) {
      message.error("Invalid file types");
      return;
    }

    // if clear, set files
    setFiles(Array.from(e.target.files));
  };

  const upload = async (type) => {
    setLoading(true);
    try {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("resumes", files[i]);
      }

      const result = await axios.post(
        `${baseUrl}/api/job-description/upload/${record.uuid}${
          type && "?type=" + type
        }`,
        formData
      );
      if (result.status === 200) {
        message.success("Upload successful!");
        setLoading(false);
        // setUploadedState(true);
        history.push("/jobs");
      } else {
        setLoading(false);
        message.error("Error uploading fields!");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error("Error uploading fields!");
    }
  };

  useEffect(() => {
    !record && history.push("/jobs");
  }, [record, history]);

  const formatCaption = (text) => {
    var a = text.split(".");
    var toAppend = [];
    a.forEach(function (t, i) {
      // toAppend += t + ".<br/>";
      toAppend.push(
        <span
          style={{
            height: "12px",
            width: "12px",
            backgroundColor: "grey",
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: "#1877F2",
          }}
        ></span>
      );
      toAppend.push(`${t}.`);
      toAppend.push(<br />);
      toAppend.push(<br />);
    });
    return toAppend;
  };

  return record ? (
    <>
      <PageContainer>
        <TopRowWrapper>
          <Heading>
            <span style={{ color: "#1A77F2" }}>Job:</span> {record.job_title}
          </Heading>
        </TopRowWrapper>
        <Row justify="space-between">
          {/* <Col xs={24} lg={13}>
            <br />
            <SubHeading>Job Description</SubHeading>
            <Caption>
              <pre
                style={{
                  fontFamily: 'ProductSans-Regular',
                  fontSize: '16px',
                  color: '#000',
                  // opacity: '0.69',
                  overflowX: 'hidden',
                  whiteSpace: 'initial',
                  fontWeight: 600,
                  // fontWeight: 'bolder',
                  fontFamily: 'montserrat',
                }}
              >
                {formatCaption(record.desc)}
              </pre>
            </Caption>
          </Col> */}
          {/* <div
            style={{ borderLeft: '1px solid blue', marginTop: '2rem' }}
          ></div> */}
          {/* <Col span={24}>
            <div
              style={{
                height: "30%",
                width: "4px",
                backgroundColor: "#1877F2",
                marginLeft: "20px",
                marginTop: "100px",
                borderRadius: "20px",
              }}
            ></div>
          </Col> */}
          <Col xs={24} lg={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "10px",
              }}
            >
              <div>
                <br />
                <Spin spinning={loading}>
                  <input
                    type="file"
                    multiple
                    style={{ display: "none" }}
                    ref={fileRef}
                    onChange={validateAndPopulateFiles}
                  />

                  {/* <StyledTextCol onClick={() => fileRef.current.click()}>
                <img src={doc} alt="doc-icon" width="20px" />
                <AttachmentText> Attach Resume &nbsp; </AttachmentText>
              </StyledTextCol> */}

                  <div
                    onClick={() => fileRef.current.click()}
                    style={{
                      // border: "1px dashed #1A77F2",
                      border: "dashed 2px #1A77F2",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      width: "400px",
                      height: "100px",
                      cursor: "pointer",
                      textAlign: "center",
                      paddingTop: "35px",
                      color: "#1A77F2",
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    Attach Resume
                  </div>

                  <br />
                  {/* <Caption>Note: You can only upload 10 files at a time</Caption> */}
                </Spin>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {files.length > 0 &&
                    files.map((file, index) => (
                      <SingleFile
                        key={index}
                        name={file.name}
                        remove={(name) =>
                          setFiles(files.filter((file) => file.name !== name))
                        }
                      />
                    ))}
                </div>
                {files.length > 0 && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <Button
                        style={{ fontSize: "14px", width: "400px" }}
                        text="Upload Resume"
                        btnType="basic_gradient"
                        onClick={upload}
                        disabled={loading}
                        height="30px"
                      />
                      {/* &nbsp;
                  <Button
                    style={{ fontSize: "14px" }}
                    text="Upload LinkedIn Resume"
                    btnType="basic_gradient"
                    onClick={() => upload("linkedin")}
                    disabled={loading}
                    height="30px"
                  /> */}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Col>
          <br />
        </Row>
      </PageContainer>
    </>
  ) : (
    <></>
  );
};

export default AddResume;
