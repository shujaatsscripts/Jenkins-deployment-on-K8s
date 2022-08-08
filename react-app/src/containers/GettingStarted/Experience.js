import React, { useState } from "react";
import { Caption, Heading } from "../../components/Auth";
import { Row, Col, message } from "antd";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import { ButtonWrapper } from "./styles/main.styles";
import { countries } from "../../utils/data";
import axios, { baseUrl } from "../../utils/axios";
import moment from "moment";
import { useHistory } from "react-router-dom";

const Experience = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [employmentType, setEmploymentType] = useState(null);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!employmentType) {
      message.error("Please select an employment type!");
      return;
    }
    if (!location) {
      message.error("Location is required!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/api/user/experience/`, {
        title,
        employmentType,
        company,
        location,
        startDate: moment.utc(startDate).format(),
        endDate: moment.utc(endDate).format(),
      });
      setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "COMPLETED" })
          .then((res) => {
            message.success("Updated successfully!");
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

  return (
    <>
      <Heading>Experience</Heading>
      <Caption>Please fill in the details below to proceed.</Caption>
      <form onSubmit={onSubmit}>
        <Row justify="space-between" gutter={24}>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              required
              label="Title"
              placeholder="E.g. Designer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12}>
            <Select
              type="employmentType"
              options={[
                { text: "Part-Time", value: "PART_TIME" },
                { text: "Full-Time", value: "FULL_TIME" },
              ]}
              placeholder="Employment Type"
              label="Employment Type"
              value={employmentType}
              onChange={(value) => setEmploymentType(value)}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              label="Company"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <Select
              type="withLabel"
              options={countries}
              placeholder="E.g: Spain"
              label="Location"
              value={location}
              onChange={(value) => setLocation(value)}
              required
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              label="Start Date"
              required
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              label="End Date"
              required
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>

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

export default Experience;
