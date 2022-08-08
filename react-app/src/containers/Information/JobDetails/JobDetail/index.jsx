import { Col, message, Modal, Row, Spin, DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import axios, { baseUrl } from "../../../../utils/axios";
import { Box } from "../../../styles/main.styles";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SearchBar from "../../../searchBar";
import FullPageLoader from "../../../../components/FullPageLoader";
import { Table } from "antd";
import Empty from "../../../Jobs/DisplayJobs/Empty";
import { EditOutlined } from "@ant-design/icons";

const DisplayJobs = () => {
  const [loading, setLoading] = useState(false);
  const data = {
    details: [
      { title: "Job Title", value: "UX/UI Designer" },
      { title: "Experience", value: "3+ Years" },
      { title: "No. of Positions", value: "3 Positions" },
      { title: "Level", value: "Experienced" },
      { title: "Open Date", value: "05 Jul, 2020" },
      { title: "Close Date", value: "05 Jul, 2020" },
      { title: "Salary Range", value: "65K - 80K" },
      { title: "Currency", value: "USD" },
      { title: "Location", value: "Islamabad, Pakistan" },
      { title: "Job Type", value: "12 Month Contract" },
      { title: "Gender", value: "Prefferd Male, Both" },
    ],
    description: [
      "3-5 years of demonstrated experience in creating and implementing UX design",
      "Proficient with visual design programs such as Adobe Photoshop and others",
      "Experience with coding and ability to troubleshoot using HTML, CSS and comparable languages",
      "Continued education and research into UX trends and current design strategy and technologies",
      "Ability to prioritize and manage several milestones and projects efficiently",
      "Experience creating storyboards and website mapping",
      "Account for challenges using problem-solving skills and seek to optimize data for the best possible outcome",
    ],
  };

  return !loading ? (
    <Row style={{ padding: "5px" }} gutter={20}>
      <Col span={10}>
        <StyledBox>
          <Row gutter={[16, 16]}>
            <Col span={12} style={{ fontWeight: "bolder" }}>
              Job Details
            </Col>
            <Col
              span={12}
              style={{
                fontWeight: "bolder",
                color: "silver",
                textAlign: "right",
              }}
            >
              <a>
                <EditOutlined /> Edit
              </a>
            </Col>
            {data.details.map((item) => {
              return (
                <Col span={12}>
                  <div style={{ color: "silver" }}>{item.title}</div>
                  <div style={{ fontWeight: "500" }}>{item.value}</div>
                </Col>
              );
            })}
          </Row>
        </StyledBox>
      </Col>
      <Col span={14}>
        <StyledBox>
          <Row gutter={[16, 16]}>
            <Col span={24} style={{ fontWeight: "bolder" }}>
              Job Description
            </Col>
            {data.description.map((item) => {
              return (
                <Col span={24}>
                  <div style={{ fontWeight: "500" }}>. {item}</div>
                </Col>
              );
            })}
          </Row>
        </StyledBox>
      </Col>
    </Row>
  ) : (
    <Box>
      <FullPageLoader />
    </Box>
  );
};

export default DisplayJobs;

const StyledButton = styled.button`
  border: none;
  padding: 0 17px 0 17px;
  /* width: 7%; */
  border-color: #1a77f2;
  background-color: #1a77f2;
  height: 35px;
  font-family: Montserrat;
  font-size: 12px;
  color: white;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
    /* border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    color: ${(props) => (props.selected ? "white" : "grey")}; */
  }
`;

const StyledBox = styled.div`
  padding: 30px 30px 60px 30px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  align-items: center;
  height: 100%;
`;
