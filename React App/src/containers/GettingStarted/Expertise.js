import React, { useState } from "react";
import { Caption, Heading } from "../../components/Auth";
import { Row, Col, Tag, message } from "antd";
import Button from "../../components/Button";
import { ButtonWrapper, Label } from "./styles/main.styles";
import Select from "../../components/Select";
import Input from "../../components/Input";
import axios, { baseUrl } from "../../utils/axios";
import { useHistory } from "react-router-dom";

const Expertise = ({ forward }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [expertise, setExpertise] = useState(null);
  const [skillsText, setSkillsText] = useState("");
  const [skillsList, setSkillsList] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!expertise) {
      message.error("Please select an expertise level");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/api/user/expertise/`, {
        skills: skillsList,
        level: expertise,
      });
      setLoading(false);
      if (res.status === 200) {
        axios
          .put(`${baseUrl}/api/user/update-step`, { step: "EDUCATION" })
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

  return (
    <>
      <Heading>Expertise</Heading>
      <Caption>Please fill in the details below to proceed.</Caption>
      <form onSubmit={onSubmit}>
        <Row justify="space-between" gutter={24}>
          <Col xs={24}>
            <Label>Select Your Skills</Label>
          </Col>
          <Col xs={24}>
            <Input
              inputType="withLabel"
              placeholder="E.g. Javascript"
              label="Skills"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === "enter") {
                  e.preventDefault();
                  if (e.target.value.length > 0) {
                    setSkillsList((prev) => {
                      return [...prev, skillsText];
                    });
                    setSkillsText("");
                  }
                }
              }}
            />
            {skillsList.map((item, index) => (
              <Tag
                key={index}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  setSkillsList((prev) => {
                    return prev.filter((el) => el !== item);
                  });
                }}
              >
                {item}
              </Tag>
            ))}
          </Col>

          <Col xs={24}>
            <Select
              type="withLabel"
              options={["Beginner", "Intermediate", "Expert"]}
              placeholder="E.g. Expert"
              label="Expertise Level"
              value={expertise}
              onChange={(value) => setExpertise(value)}
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

export default Expertise;
