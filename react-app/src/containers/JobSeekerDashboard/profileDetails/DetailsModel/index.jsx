import React, { useState } from "react";
import { Modal, Button, Row, Col, Tabs, Progress, Divider } from "antd";
import indeed from "../images/indeed.svg";

import { StyledTitle, StyledSubTitle } from "./details.styles.js";

const Details = ({ record, educationData, experienceData, expertiseData }) => {
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
        PERSONAL INFORMATION
      </Divider>
      <Row>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>CNIC</StyledTitle>
          <StyledSubTitle>{record?.cnic}</StyledSubTitle>
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Phone Number</StyledTitle>
          <StyledSubTitle>{record?.phone}</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Email Address</StyledTitle>
          <StyledSubTitle>{record?.email}</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Skype Id</StyledTitle>
          <StyledSubTitle>{record?.skype_id}</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Date of Birth</StyledTitle>
          <StyledSubTitle>
            {record?.date_of_birth?.split("T")[0]}
          </StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Postal Code</StyledTitle>
          <StyledSubTitle>{record?.zip}</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Address</StyledTitle>
          <StyledSubTitle>{record?.street_address}</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>City</StyledTitle>
          <StyledSubTitle>{record?.city}</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Country</StyledTitle>
          <StyledSubTitle>{record?.country}</StyledSubTitle>
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Province</StyledTitle>
          <StyledSubTitle>{record?.state}</StyledSubTitle>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Language</StyledTitle>
          <StyledSubTitle>{record?.language}</StyledSubTitle>
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <StyledTitle>Proficiency</StyledTitle>
          <StyledSubTitle>{record?.proficiency}</StyledSubTitle>
        </Col>
      </Row>
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
        Education Details
      </Divider>

      {educationData.map((record, index) => (
        <>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Institute Name</StyledTitle>
              <StyledSubTitle>{record?.school}</StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Institute Country</StyledTitle>
              <StyledSubTitle>{record?.country}</StyledSubTitle>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Degree Title</StyledTitle>
              <StyledSubTitle>{record?.degree}</StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Degree Major</StyledTitle>
              <StyledSubTitle>{record?.major}</StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Degree Starting Date</StyledTitle>
              <StyledSubTitle>
                {record?.startDate?.split("T")[0]}
              </StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Degree Starting Date</StyledTitle>
              <StyledSubTitle>{record?.endDate?.split("T")[0]}</StyledSubTitle>
            </Col>
          </Row>
          {educationData.length === index + 1 ? null : <Divider />}
        </>
      ))}
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
        Professional Details
      </Divider>
      {experienceData.map((record, index) => (
        <>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Organization</StyledTitle>
              <StyledSubTitle>{record?.company}</StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Organization City</StyledTitle>
              <StyledSubTitle>{record?.city}</StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Organization Country</StyledTitle>
              <StyledSubTitle>{record?.country}</StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Job Title</StyledTitle>
              <StyledSubTitle>{record?.title}</StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Job Starting Date</StyledTitle>
              <StyledSubTitle>
                {record?.startDate?.split("T")[0]}
              </StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Job Ending Date</StyledTitle>
              <StyledSubTitle>{record?.endDate?.split("T")[0]}</StyledSubTitle>
            </Col>
          </Row>
          {experienceData.length === index + 1 ? null : <Divider />}
        </>
      ))}
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
        Certifications
      </Divider>
      {expertiseData.map((record, index) => (
        <>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Certification Organization</StyledTitle>
              <StyledSubTitle>{record?.authority}</StyledSubTitle>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Certification Name</StyledTitle>
              <StyledSubTitle>{record?.certificate}</StyledSubTitle>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <StyledTitle>Certification Date</StyledTitle>
              <StyledSubTitle>
                {record?.certificationDate?.split("T")[0]}
              </StyledSubTitle>
            </Col>
          </Row>
          {experienceData.length === index + 1 ? null : <Divider />}
        </>
      ))}
    </div>
  );
};

export default Details;
