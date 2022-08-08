import React, { useState } from "react";
import { Modal, Button, Row, Col, Tabs, Progress, Divider } from "antd";
import bg from "../images/yellobg.png";
import grey from "../images/grey.png";
import pro from "../images/pro.png";
import {
  StyledTitle,
  StyledSubTitle,
  StyledList,
  StyledPeriodBg,
  StyledEdu,
  StyledTitleName,
  StyledNameSubTitle,
  StyledNormalText,
  StyledExpSubTitle,
  StyledWorkNormalText,
  StyledBulletList,
  StyledListText,
  Styledbg,
} from "./Resume.styles.js";

const Resume = () => {
  return (
    <div>
      <Row>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={9}
          style={{ backgroundColor: "#F0F4F7", paddingBottom: "8%" }}
        >
          <Styledbg>
            <img
              src={pro}
              alt=""
              width="70%"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "8%",
              }}
            />
            <StyledTitle style={{ marginLeft: "20%", marginTop: "8%" }}>
              CONTACT
            </StyledTitle>
            <div style={{ marginLeft: "18%", marginTop: "8%" }}>
              <StyledList>
                <li>03335352186</li>
                <li>razaraheem21@gmail.com</li>
                <li>Ghazi Pur Coloney</li>
                <li>LinkedIn</li>
                <li>Facebook</li>
                <li>Instagram</li>
              </StyledList>
            </div>
            <StyledTitle style={{ marginLeft: "20%", marginTop: "8%" }}>
              EDUCATION
            </StyledTitle>
            <div style={{ marginLeft: "20%", marginTop: "8%" }}>
              <StyledPeriodBg>2014-2018</StyledPeriodBg>
              <br />
              <StyledEdu>Bachular in Computer Science</StyledEdu>
              <br />
              <StyledEdu>Pristan University Kohat</StyledEdu>
            </div>
            <div style={{ marginLeft: "20%", marginTop: "8%" }}>
              <StyledPeriodBg>2011-2013</StyledPeriodBg>
              <br />
              <StyledEdu>FSC(Pre-Eng)</StyledEdu>
              <br />
              <StyledEdu>Central Science Collage Kohat</StyledEdu>
            </div>
            <div style={{ marginLeft: "20%", marginTop: "8%" }}>
              <StyledPeriodBg>2009-2010</StyledPeriodBg>
              <br />
              <StyledEdu>Matric</StyledEdu>
              <br />
              <StyledEdu>Global Inter Collage and School Kohat</StyledEdu>
            </div>
            <div style={{ marginLeft: "20%", marginTop: "8%" }}>
              <StyledTitle>TOOLS</StyledTitle>
              <Row>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <StyledEdu>Figma</StyledEdu>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <span>
                    <img src={bg} width="15px" height="15px" />

                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={grey}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <StyledEdu>Adobe XD</StyledEdu>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <span>
                    <img src={bg} width="15px" height="15px" />

                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={grey}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={grey}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <StyledEdu>Framer</StyledEdu>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <span>
                    <img src={bg} width="15px" height="15px" />

                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <StyledEdu>Photoshop</StyledEdu>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <span>
                    <img src={bg} width="15px" height="15px" />

                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={bg}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                    <img
                      src={grey}
                      width="15px"
                      height="15px"
                      style={{ marginLeft: "5px" }}
                    />
                  </span>
                </Col>
              </Row>
            </div>
          </Styledbg>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <div style={{ marginLeft: "8%", marginTop: "6%" }}>
            <StyledTitleName style={{ fontWeight: "bold" }}>
              Raza Raheem
            </StyledTitleName>
            <StyledNameSubTitle>UI/UX Designer</StyledNameSubTitle>
          </div>
          <div style={{ marginLeft: "8%", marginTop: "15%" }}>
            <StyledTitle>OBJECTIVE</StyledTitle>
            <StyledNormalText>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </StyledNormalText>
          </div>
          <div style={{ marginLeft: "8%", marginTop: "8%" }}>
            <StyledTitle>WORK EXPERIENCE</StyledTitle>
            <StyledExpSubTitle>
              UI/UX Designer | Motion Designer
            </StyledExpSubTitle>
            <StyledPeriodBg>2021-Present</StyledPeriodBg>
            <StyledWorkNormalText>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour...
            </StyledWorkNormalText>
            <StyledList>
              <StyledBulletList>
                <StyledListText>
                  It is a long established fact that a reader will be distracted
                </StyledListText>
              </StyledBulletList>
              <StyledBulletList>
                <StyledListText>
                  It is a long established fact that a reader
                </StyledListText>
              </StyledBulletList>
              <StyledBulletList>
                <StyledListText>
                  It is a long established fact that a reader will be distracted
                  by the readable
                </StyledListText>
              </StyledBulletList>
            </StyledList>
          </div>
          <div style={{ marginLeft: "8%", marginTop: "6%" }}>
            <StyledExpSubTitle>
              UI/UX Designer | Graphic Designer
            </StyledExpSubTitle>
            <StyledPeriodBg>2021-Present</StyledPeriodBg>
            <StyledWorkNormalText>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour...
            </StyledWorkNormalText>
          </div>
          <div style={{ marginLeft: "8%", marginTop: "6%" }}>
            <StyledExpSubTitle>
              UI/UX Designer | Motion Designer
            </StyledExpSubTitle>
            <StyledPeriodBg>2021-Present</StyledPeriodBg>
            <StyledWorkNormalText>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour...
            </StyledWorkNormalText>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Resume;
