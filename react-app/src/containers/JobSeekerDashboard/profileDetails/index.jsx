import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Tabs, Progress } from "antd";
import profile from "../../../images/recruiterDashboard/Male.svg";
import email from "./images/email.svg";
import detail from "./images/detail.svg";
import resume from "./images/resume.svg";
import axios, { baseUrl } from "../../../utils/axios";
import { StyledTitle, StyledSubTitle } from "./MainModels.styles.js";
import {
  FileTextOutlined,
  AppleOutlined,
  AndroidOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Details from "./DetailsModel";
import Resume from "./Resume";
import styled from "styled-components";

const Shortlisted = ({ record }) => {
  const [educationData, setEducationData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [expertiseData, setExpertiseData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { TabPane } = Tabs;

  useEffect(() => {
    (async () => {
      let res2 = await axios.get(`${baseUrl}/api/user/education`);
      setEducationData(res2.data);

      let res3 = await axios.get(`${baseUrl}/api/user/experience`);
      setExperienceData(res3.data);

      let res4 = await axios.get(`${baseUrl}/api/user/expertise`);
      setExpertiseData(res4.data);
    })();
  }, []);
  useEffect(() => {
    console.log(record);
  }, [record]);

  function callback(key) {
    console.log(key);
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <StyledAnchor onClick={showModal}>View Profile</StyledAnchor>
      {/* <span onClick={showModal}>Show</span> */}
      <Modal
        style={{
          float: "right",
          padding: "0.5%",
          borderRadius: "8px",
          position: "absolute",
          top: "0px",
          right: "0px",
        }}
        bodyStyle={{ height: "100%", marginTop: "0px" }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"60%"}
        closable={false}
      >
        <Row>
          <Col span={4}>
            <img
              src={record?.profile_URL ? record.profile_URL : profile}
              alt=""
              width="70%"
              style={{ borderRadius: "100px" }}
            />
          </Col>
          <Col span={20} style={{ paddingTop: "3%", margin: "auto" }}>
            <span>
              <StyledTitle>
                {record?.first_name} {record?.last_name}
              </StyledTitle>
              <StyledSubTitle>{record?.title}</StyledSubTitle>
            </span>
          </Col>
          {/* <Col xs={24} sm={6} md={3} lg={4} style={{ padding: "1%" }}>
            <Button
              style={{
                backgroundColor: "#28B4461F",
                color: "#28B446F5",
                borderRadius: "8px",
                border: "none",
                fontFamily: "Montserrat-Regular",
              }}
            >
              ShortListed
            </Button>
          </Col>
          <Col
            xs={24}
            sm={6}
            md={6}
            lg={11}
            style={{ padding: "1%", float: "right" }}
          >
            <Button
              type="primary"
              style={{
                height: "45px",
                float: "right",
                borderRadius: "8px",
                border: "none",
                fontFamily: "Montserrat-Regular",
              }}
            >
              <img src={email} alt="" />
              &nbsp; Send Email
            </Button>
            <br />
            <br />
            <br />
            <StyledSubTitle style={{ float: "right" }}>
              Job Match
            </StyledSubTitle>
            <br />
            <br />
            <Progress
              type="circle"
              percent={67}
              width={70}
              style={{ float: "right" }}
            />
          </Col> */}
        </Row>
        <Tabs>
          <TabPane
            tab={
              <span style={{ fontFamily: "Montserrat-Regular" }}>
                <UserOutlined />
                DETAILS
              </span>
            }
            key="1"
          >
            <Details
              record={record}
              educationData={educationData}
              experienceData={experienceData}
              expertiseData={expertiseData}
            />
          </TabPane>
          {/* <TabPane
            tab={
              <span style={{ fontFamily: "Montserrat-Regular" }}>
                <FileTextOutlined />
                RESUME
              </span>
            }
            key="2"
          >
            <Resume />
          </TabPane> */}
        </Tabs>
      </Modal>
    </>
  );
};

export default Shortlisted;

const StyledAnchor = styled.a`
  margin-top: 25px;
  font-size: 15px;
  font-weight: 600;
  color: #1a77f2;
  text-decoration: underline;
`;
