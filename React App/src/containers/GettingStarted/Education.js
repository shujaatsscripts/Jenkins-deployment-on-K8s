import React, { useState } from "react";
import { Caption, Heading } from "../../components/Auth";
import { Row, Col, Tag, message } from "antd";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { ButtonWrapper } from "./styles/main.styles";
import axios, { baseUrl } from "../../utils/axios";
import moment from "moment";
import { useHistory } from "react-router-dom";

// import {
//   StyledPaperClipIcon,
//   AttachmentText,
//   StyledTextCol,
// } from './styles/education.styles';

const Education = ({ forward }) => {
  const history = useHistory();

  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [certificationsText, setCertificationsText] = useState("");
  const [certificationsList, setCertificationsList] = useState([]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/api/user/education`, {
        school,
        degree,
        startDate: moment.utc(startDate).format(),
        endDate: moment.utc(endDate).format(),
        certifications: certificationsList,
      });
      setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "EXPERIENCE" })
          .then((res) => {
            message.success("Updated successfully!");
            forward();
          })
          .catch((err) => console.log(err));
      } else {
        message.error("Something went wrong!");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      message.error("Something went wrong!");
    }
  };

  // const fileRef = useRef();
  // const [files, setFiles] = useState([]);

  return (
    <>
      <Heading>Education</Heading>
      <Caption>Please fill in the details below to proceed.</Caption>
      <form onSubmit={onSubmit}>
        <Row justify="space-between" gutter={24}>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              label="School"
              placeholder="E.g. Boston University"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              label="Degree"
              placeholder="E.g. Bachelors"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              label="Start Year"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              label="End Year"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </Col>
          <Col xs={24}>
            <Input
              inputType="withLabel"
              label="Certifications"
              placeholder="E.g. Coursera"
              value={certificationsText}
              onChange={(e) => setCertificationsText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === "enter") {
                  e.preventDefault();
                  if (e.target.value.length > 0) {
                    setCertificationsList((prev) => {
                      return [...prev, certificationsText];
                    });
                    setCertificationsText("");
                  }
                }
              }}
            />
            {certificationsList.map((item, index) => (
              <Tag
                key={index}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  setCertificationsList((prev) => {
                    return prev.filter((el) => el !== item);
                  });
                }}
              >
                {item}
              </Tag>
            ))}
          </Col>
          {/* <input
            type="file"
            style={{ display: 'none' }}
            ref={fileRef}
            onChange={(e) => setFiles(e.target.files[0])}
          /> */}
          {/* <StyledTextCol onClick={() => fileRef.current.click()}>
            <StyledPaperClipIcon />
            <AttachmentText>Attach Documents</AttachmentText>
          </StyledTextCol> */}
          <ButtonWrapper>
            <Button
              btnType="createProfile"
              text="Skip"
              disabled={loading}
              onClick={() => history.push("/dashboard")}
              margin="0 1rem 0 0"
            />
            <Button
              text="Continue"
              btnType="createProfile"
              htmlType="submit"
              disabled={loading}
            />
          </ButtonWrapper>
        </Row>
      </form>
    </>
  );
};

export default Education;
