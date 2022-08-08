import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Tabs, Progress } from "antd";
import profile from "./images/profile.svg";
import email from "./images/email.svg";
import detail from "./images/detail.svg";
import resume from "./images/resume.svg";
import { StyledTitle, StyledSubTitle } from "./MainModels.styles.js";
import {
  FileTextOutlined,
  AppleOutlined,
  AndroidOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Details from "./DetailsModel";
import Resume from "./Resume";

const Shortlisted = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { TabPane } = Tabs;

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
      <span onClick={showModal}>Show</span>
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
          <Col span={3}>
            <img src={profile} alt="" />
          </Col>
          <Col span={15} style={{ padding: "1%", textAlign: "left" }}>
            <span>
              <StyledTitle>{record?.candidateName}</StyledTitle>
              <StyledSubTitle>{record?.title}</StyledSubTitle>
            </span>
          </Col>
          <Col span={6} style={{ padding: "1%" }}>
            <Button
              style={{
                backgroundColor: `${
                  record?.status == "REJECTED" ? "#ffe6e6" : "#28B4461F"
                }`,
                color: `${
                  record?.status == "REJECTED" ? "#e60000" : "#28B446F5"
                }`,
                borderRadius: "8px",
                border: "none",
                fontFamily: "Montserrat-Regular",
              }}
            >
              {record?.status}
            </Button>
          </Col>
          {/* <Col
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
            <Details record={record} />
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
