import React, { useState } from "react";
import { Modal, Button, Row, Col, Tabs, Progress, Divider } from "antd";
import indeed from "../images/indeed.svg";

import { StyledTitle, StyledSubTitle } from "./details.styles.js";

const Details = ({ record }) => {
  return (
    <div>
      <Divider
        orientation="left"
        style={{
          fontFamily: "Montserrat-Regular",
          fontWeight: "bold",
          color: "#263238",
          //   margin: "0px",
          marginTop: "5%",
          marginBottom: "5%",
          padding: "0px",
        }}
      >
        CANDIDATES INFORMATION
      </Divider>
      <Row>
        {/* <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Name</StyledTitle>
          <StyledSubTitle>Muhammad Nadeem khan</StyledSubTitle>
        </Col> */}
        <Col span={12}>
          <StyledTitle>Candidate Email</StyledTitle>
          <StyledSubTitle>{record?.candidateEmail}</StyledSubTitle>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <StyledTitle>Recruiter Email</StyledTitle>
          <StyledSubTitle>{record?.recruiterEmail}</StyledSubTitle>
        </Col>
        <Col span={12}>
          <StyledTitle>Notes</StyledTitle>
          <StyledSubTitle>{record?.rejectionNotes}</StyledSubTitle>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <StyledTitle>Interview Date</StyledTitle>
          <StyledSubTitle>{record?.scheduledInterviewDate}</StyledSubTitle>
        </Col>
        {/* <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Source</StyledTitle>
          <StyledSubTitle>
            <img src={indeed} alt="" />
          </StyledSubTitle>
        </Col> */}
      </Row>
      <Row>
        <Col span={12}>
          <StyledTitle>Interview Time</StyledTitle>
          <StyledSubTitle>{record?.scheduledInterviewTime}</StyledSubTitle>
        </Col>
        {/* <Col span={12}>
          <StyledTitle>Gender</StyledTitle>
          <StyledSubTitle>{record?.gender}</StyledSubTitle>
        </Col> */}
        {/* <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Martial Status</StyledTitle>
          <StyledSubTitle>Married</StyledSubTitle>
        </Col> */}
      </Row>
      {/* <Divider
        orientation="left"
        style={{
          fontFamily: "Montserrat-Regular",
          fontWeight: "bold",
          color: "#263238",
          //   margin: "0px",
          marginTop: "5%",
          marginBottom: "5%",
          padding: "0px",
        }}
      >
        Professional Details
      </Divider>
      <Row>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Current Job Title</StyledTitle>
          <StyledSubTitle>UI/UX</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Qualification</StyledTitle>
          <StyledSubTitle>Ms. Computer Science</StyledSubTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Experience</StyledTitle>
          <StyledSubTitle>5 Years</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Job Type</StyledTitle>
          <StyledSubTitle>Full Time</StyledSubTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Current Salary</StyledTitle>
          <StyledSubTitle>60,000 PKR</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Expected Salary</StyledTitle>
          <StyledSubTitle>90,000 PKR</StyledSubTitle>
        </Col>
      </Row>
      <StyledTitle style={{ marginTop: "2%" }}>Job Skills</StyledTitle>
      <span>
        <Button
          style={{
            backgroundColor: "#EBEBEB",
            color: "#888888",
            borderRadius: "8px",
            border: "none",
            fontFamily: "Montserrat-Regular",
          }}
        >
          Wireframe
        </Button>
        <Button
          style={{
            backgroundColor: "#EBEBEB",
            color: "#888888",
            borderRadius: "8px",
            border: "none",
            fontFamily: "Montserrat-Regular",
            marginLeft: "2%",
          }}
        >
          Prototyping
        </Button>
        <Button
          style={{
            backgroundColor: "#EBEBEB",
            color: "#888888",
            borderRadius: "8px",
            border: "none",
            fontFamily: "Montserrat-Regular",
            marginLeft: "2%",
          }}
        >
          User Flow
        </Button>
        <Button
          style={{
            backgroundColor: "#EBEBEB",
            color: "#888888",
            borderRadius: "8px",
            border: "none",
            fontFamily: "Montserrat-Regular",
            marginLeft: "2%",
          }}
        >
          creativity
        </Button>
      </span>*/}
    </div>
  );
};

export default Details;
