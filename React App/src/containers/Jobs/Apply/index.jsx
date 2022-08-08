import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Row, Col, message, Spin } from "antd";
import Input from "../../../components/Input";
import { Label } from "../../../components/Input/styles/withLabel.styles";
import Button from "../../../components/Button";
import {
  PageHeading,
  JobTitle,
  JobSubText,
  UploadContainer,
  AcceptedTypes,
} from "./main.styles";
import { Container } from "../../../components/Seeker";
import DragAndDropFileInput from "../../../components/Drag&DropInput/DragAndDropFileInput";
import axios, { baseUrl } from "../../../utils/axios";
import { getFileExtension } from "../../../utils/index";
import moment from "moment";
import { TopRowWrapper, Heading } from "../../styles/main.styles";

const validFileTypesForResume = ["pdf", "doc", "docx"];

const ApplyJob = () => {
  const { id } = useParams();
  const history = useHistory();
  // const urlLocation = useLocation();
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [salaryExpectations, setSalaryExpectations] = useState("");
  const [years, setYears] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      axios.get(`${baseUrl}/api/user/personal-info`).then((res) => {
        console.log("data", res.data);
        let data = res.data;
        if (data) {
          setFirstName(data.first_name ? data.first_name : "");
          setLastName(data.last_name ? data?.last_name : "");
          setEmail(data.email ? data.email : "");
          setContact(data.phone ? data.phone : "");
          setLocation(data.location ? data.location : "");
        }
      });
      setLoading(false);
    };
    apiCall();
  }, []);

  const [attachment, setAttachment] = useState(null);

  const [jobInfo, setJobInfo] = useState({
    title: null,
    location: null,
    date: null,
  });

  const validateFiles = (list) => {
    // If more than 1 files are uploaded
    if (list.length > 1) {
      message.error("Only 1 file allowed");
      return false;
    }
    // if invalid file type is uploaded
    if (
      !validFileTypesForResume.includes(getFileExtension(list[0]).toLowerCase())
    ) {
      message.error("Invalid file type");
      return false;
    }
    return true;
  };

  const uploadFile = async (file) => {
    // const formData = new FormData();
    // formData.append("file", file);
    console.log("apply job", file);
    // for (var [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    setLoadingUpload(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `${baseUrl}/api/upload?type=resumes&id=${id}`,
        formData
      );
      setFile(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingUpload(false);
      message.success("Uploaded successfully");
    }
  };

  const handleFileDrop = (list) => {
    if (validateFiles(list)) {
      uploadFile(list[0]);
      let temp = [];
      Array.from(list).forEach((el) => temp.push(el));
      setAttachment(temp[0]);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        localStorage.removeItem("applied_job");
        const { data } = await axios.get(
          `${baseUrl}/api/job-description/jobs/getSeekerJobById/${id}`
        );
        console.log(data);
        setJobInfo({
          title: data?.jobTitle,
          location: data?.location,
          date: moment(data?.createdAt).format("LL"),
        });
      } catch (err) {
        console.log(err);
        message.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /**
   * Apply for a job
   */
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      firstName,
      lastName,
      email,
      phone: contact,
      salary: salaryExpectations,
      experience: years,
      location,
      resume: file,
      jobDescriptionID: id,
      source: localStorage.getItem("source") ? "LINK" : "PORTAL",
    };
    if (description) payload.about = description;

    try {
      const res = await axios.post(`${baseUrl}/api/applicant`, payload);
      console.log(res);
      message.success("You have applied successfully to this job!");
      localStorage.removeItem("source");
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Container justify="center">
        <Col span={22} style={{ border: "0px solid black" }}>
          <TopRowWrapper>
            <div>
              <Heading>Job Application</Heading>
            </div>
          </TopRowWrapper>
        </Col>
        <Col xs={23} sm={18} md={18}>
          <Row>
            <Col xs={24}>
              <br />
              <JobTitle>{jobInfo.title}</JobTitle>
              <JobSubText>{jobInfo.location}</JobSubText>
              <JobSubText>{jobInfo.date}</JobSubText>
            </Col>
          </Row>
          <form onSubmit={submit} style={{ marginTop: "10px" }}>
            <Row gutter={36} justify="center">
              <Col xs={24} md={12}>
                <Input
                  inputType="withLabel"
                  smallLabel={true}
                  placeholder="First Name"
                  label="First Name:"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <Input
                  inputType="withLabel"
                  smallLabel={true}
                  placeholder="Last Name"
                  label="Last Name:"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <Input
                  inputType="withLabel"
                  smallLabel={true}
                  placeholder="E.g. abc@example.com"
                  label="Email ID:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <Input
                  inputType="withLabel"
                  smallLabel={true}
                  placeholder="E.g. 03000000000"
                  label="Contact Number:"
                  value={contact}
                  phone
                  onChange={(phone) => setContact(phone)}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <Input
                  inputType="withLabel"
                  smallLabel={true}
                  placeholder="E.g. 3000"
                  label="Salary Expectations:"
                  value={salaryExpectations}
                  onChange={(e) => setSalaryExpectations(e.target.value)}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <Input
                  inputType="withLabel"
                  smallLabel={true}
                  placeholder="E.g. 3"
                  label="Years Of Experience:"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <Input
                  inputType="withLabel"
                  smallLabel={true}
                  placeholder="E.g. Islamabad"
                  label="Location:"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Col>
              <Col xs={24} md={12}>
                <Input
                  inputType="textarea_withLabel"
                  height="125px"
                  smallLabel={true}
                  textArea_totalWords={200}
                  textArea_wordsLeft={0}
                  placeholder="Write text here"
                  label="Tell us About yourself:"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
              <Col xs={24}>
                <Spin spinning={loadingUpload}>
                  <Label smallLabel={true}>Upload Resume:</Label>
                  <UploadContainer>
                    <DragAndDropFileInput
                      handleDrop={handleFileDrop}
                      file={attachment}
                    />
                    <AcceptedTypes>
                      Accepted file types: .doc, .docx, .pdf
                    </AcceptedTypes>
                  </UploadContainer>
                </Spin>
              </Col>
            </Row>
            <br />

            <Row justify="end">
              <Col>
                <Button
                  btnType="confirmSlot"
                  text="Apply"
                  htmlType="submit"
                  disabled={loading}
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Col>
            </Row>
          </form>
        </Col>
      </Container>
    </Spin>
  );
};

export default ApplyJob;
