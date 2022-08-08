import { Caption, Heading } from "../../components/Auth";
import { Row, Col, message } from "antd";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import { ButtonWrapper } from "./styles/main.styles";
import React, { useState } from "react";
import { countries, languages as languageList } from "../../utils/data";
import axios, { baseUrl } from "../../utils/axios";
import { useHistory } from "react-router-dom";

const PersonalInfo = ({ forward, fname, lname }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [firstName, setFirstName] = useState(fname ? fname : "");
  const [lastName, setLastName] = useState(lname ? lname : "");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [languages, setLanguages] = useState(null);
  const [linkedIn, setLinkedIn] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      message.error("Location is required!");
      return;
    }
    if (!languages) {
      message.error("Language is required!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.put(`${baseUrl}/api/user/personal-info/`, {
        firstName,
        lastName,
        title: profession,
        phone,
        location,
        zip: postalCode,
        language: languages,
        linkedInURL: linkedIn,
      });
      setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "EXPERTISE" })
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
      console.log(err.response);
      message.error("Something went wrong!");
    }
  };

  return (
    <>
      <Heading>Personal Info</Heading>
      <Caption>Please fill in the details below to proceed.</Caption>
      <form onSubmit={onSubmit}>
        <Row justify="space-between" gutter={24}>
          <Col xs={24} md={12} lg={8}>
            <Input
              inputType="withLabel"
              label="First Name"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              inputType="withLabel"
              label="Last Name"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              inputType="withLabel"
              label="Title Of Profession"
              placeholder="E.g: Product Designer"
              required
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              inputType="withLabel"
              label="Phone Number"
              placeholder="111 222 14253"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
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
          <Col xs={24} md={12} lg={8}>
            <Input
              inputType="withLabel"
              label="Postal Code"
              placeholder="10349"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12}>
            <Select
              required
              type="withLabel"
              options={languageList}
              value={languages}
              onChange={(value) => setLanguages(value)}
              placeholder="Language"
              label="Language"
            />
          </Col>
          <Col xs={24} md={12}>
            <Input
              inputType="withLabel"
              label="LinkedIn Profile"
              placeholder="URL"
              required
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
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

export default PersonalInfo;
