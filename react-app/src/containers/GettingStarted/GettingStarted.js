import React, { useState } from "react";
import Button from "../../components/Button";
import { Heading } from "../../components/Auth";
import { SubHeading, DetailText } from "./styles/gettingStarted.styles";
import { ButtonWrapper } from "./styles/main.styles";
import { Row, Col, message } from "antd";
import Input from "../../components/Input";
import axios, { baseUrl } from "../../utils/axios";
import { useHistory } from "react-router-dom";

const GettingStarted = ({ forward }) => {
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${baseUrl}/api/user/personal-info/`, {
        about: intro,
      });
      message.success("Updated Successfully!");
      setLoading(false);
      if (res.status === 200) {
        forward();
      } else {
        message.error("Something went wrong!");
      }
    } catch (err) {
      setLoading(false);
      message.error("Something went wrong!");
      console.log(err.response);
    }
  };

  return (
    <>
      <Heading>Getting Started</Heading>
      <br />
      <SubHeading>
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Nulla Facilisis
        A Odio A Accumsan.
      </SubHeading>
      <DetailText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis
        a odio a accumsan. Ut pellentesque velit ac tincidunt lobortis. Nulla
        felis velit, mattis id lobortis eget, faucibus sit amet dui. Sed
        elementum aug <br />
        ue sit amet risus efficitur, eu bibendum lacus malesuada. Nulla ut risus
        quis elit dignissim volutpat eget sit amet purus.
      </DetailText>
      <form onSubmit={onSubmit}>
        <Row>
          <Col xs={24}>
            <Input
              inputType="textarea_withLabel"
              label="Tell us something about yourself"
              placeholder="Tell us something about yourself"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              required
            />
          </Col>
        </Row>
        <ButtonWrapper>
          <Button
            btnType="createProfile"
            text="Skip"
            disabled={loading}
            onClick={() => history.push("/dashboard")}
            margin="0 1rem 0 0"
          />
          <Button
            btnType="createProfile"
            text="Continue"
            htmlType="submit"
            disabled={loading}
          />
        </ButtonWrapper>
      </form>
    </>
  );
};

export default GettingStarted;
