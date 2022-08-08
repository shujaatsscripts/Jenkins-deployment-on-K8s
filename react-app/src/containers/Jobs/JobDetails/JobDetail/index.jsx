import { Col, message, Modal, Button, Row, Spin, DatePicker } from "antd";
import moment from "moment";
import React from "react";
// import { Modal, Button } from 'antd';
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
import { Link } from "react-router-dom";

const DisplayJobs = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const data1 = {
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

  const [myJobTitle, setMyJobTitle] = useState("");
  const [myExperience, setMyExperience] = useState("");
  const [myNoOfPosition, setMyNoOfPosition] = useState("");
  const [myLevel, setMyLevel] = useState("");
  const [myOpeningDate, setMyOpeningDate] = useState("");
  const [myClosingDate, setMyClosingDate] = useState("");
  const [mySalary, setMySalary] = useState("");
  const [myCurrency, setMyCurrency] = useState("");
  const [myLocation, setMyLocation] = useState("");
  const [myJobType, setMyJobType] = useState("");
  const [myGender, setMyGender] = useState("");

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/api/job-description/${props.jobId}`
      );

      console.log("hello job candidates");
      console.log(res.data);
      setData(res.data);
      setLoading(false);
      setMyJobTitle(res.data?.jobTitle);
      setMyExperience(res.data?.experience);
      setMyNoOfPosition(res.data?.positions);
      setMyLevel(res.data?.level);
      setMyOpeningDate(res.data?.openingDate);
      setMyClosingDate(res.data?.closingDate);
      setMySalary(res.data?.salary);
      setMyCurrency(res.data?.currency);
      setMyLocation(res.data?.location);
      setMyJobType(res.data?.jobType);
      setMyGender(res.data?.preferredGender);
    };
    apiCall();
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const AllData = {
      myJobTitle,
      myExperience,
      myNoOfPosition,
      myLevel,
      myOpeningDate,
      myClosingDate,
      mySalary,
      myCurrency,
      myLocation,
      myJobType,
      myGender,
    };

    console.log(AllData);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return data ? (
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
              {/* <a onClick={showModal}>
                <EditOutlined /> Edit
              </a> */}
              <Link
                to={{ pathname: "/job/edit", query: { data } }}
                style={{ color: "silver" }}
              >
                <EditOutlined />
                &nbsp; Edit
              </Link>
              <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
                width="70%"
                style={{
                  fontFamily: "ProductSans-Regular",
                  marginTop: "-25px",
                }}
              >
                <form>
                  <Row justify="space-between" gutter={24}>
                    <Col span={8}>
                      <Input
                        name="jobTitle"
                        inputType="withLabel"
                        label="Job Title"
                        placeholder="Candidate Name"
                        value={myJobTitle}
                        onChange={(e) => setMyJobTitle(e.target.value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        name="experience"
                        inputType="withLabel"
                        label="Experience"
                        placeholder="Experience"
                        value={myExperience}
                        onChange={(e) => setMyExperience(e.target.value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        inputType="withLabel"
                        label="No. of Positions"
                        placeholder="No. of Positions"
                        value={myNoOfPosition}
                        onChange={(e) => setMyNoOfPosition(e.target.value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Select
                        type="employmentType"
                        options={[
                          { text: "Beginner", value: "BEGINNER" },
                          { text: "Intermediate", value: "INTERMEDIATE" },
                          { text: "Advanced", value: "ADVANCED" },
                        ]}
                        // placeholder={rowData?.status}
                        label="Level"
                        value={myLevel}
                        onChange={(value) => setMyLevel(value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        inputType="withLabel"
                        label="Opening Date"
                        placeholder="Opening Date"
                        value={myOpeningDate}
                        onChange={(e) => setMyOpeningDate(e.target.value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        inputType="withLabel"
                        label="Closing Date"
                        placeholder="Closing Date"
                        value={myClosingDate}
                        onChange={(e) => setMyClosingDate(e.target.value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        inputType="withLabel"
                        label="Salary"
                        placeholder="Salary"
                        value={mySalary}
                        onChange={(e) => setMySalary(e.target.value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        inputType="withLabel"
                        label="Currency"
                        placeholder="Currency"
                        value={myCurrency}
                        onChange={(e) => setMyCurrency(e.target.value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        inputType="withLabel"
                        label="Location"
                        placeholder="Location"
                        value={myLocation}
                        onChange={(e) => setMyLocation(e.target.value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Select
                        type="employmentType"
                        options={[
                          { text: "Permanent", value: "PERMANENT" },
                          { text: "Non-Permanent", value: "NON_PERMANENT" },
                        ]}
                        // placeholder={rowData?.status}
                        label="Job Type"
                        value={myJobType}
                        onChange={(value) => setMyJobType(value)}
                        required
                      />
                    </Col>
                    <Col span={8}>
                      <Select
                        type="employmentType"
                        options={[
                          { text: "Male", value: "MALE" },
                          { text: "Female", value: "FEMALE" },
                          {
                            text: "Prefer not to say",
                            value: "PREFER_NOT_TO_SAY",
                          },
                        ]}
                        placeholder={myGender}
                        label="Gender"
                        value={myGender}
                        onChange={(value) => setMyGender(value)}
                        required
                      />
                    </Col>
                  </Row>
                </form>
              </Modal>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Job Title</div>
              <div style={{ fontWeight: "500" }}>{data.jobTitle}</div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Experience</div>
              <div style={{ fontWeight: "500" }}>{data.experience}</div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>No. of Positions</div>
              <div style={{ fontWeight: "500" }}>{data.positions}</div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Level</div>
              <div style={{ fontWeight: "500" }}>{data.level}</div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Opening Date</div>
              <div style={{ fontWeight: "500" }}>
                {new Date(data.openingDate).toISOString().split("T")[0]}
              </div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Closing Date</div>
              <div style={{ fontWeight: "500" }}>
                {new Date(data.closingDate).toISOString().split("T")[0]}
              </div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Salary</div>
              <div style={{ fontWeight: "500" }}>{data.salary}</div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Currency</div>
              <div style={{ fontWeight: "500" }}>{data.currency}</div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Location</div>
              <div style={{ fontWeight: "500" }}>{data.location}</div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Job Type</div>
              <div style={{ fontWeight: "500" }}>{data.jobType}</div>
            </Col>
            <Col span={12}>
              <div style={{ color: "silver" }}>Gender</div>
              <div style={{ fontWeight: "500" }}>{data.preferredGender}</div>
            </Col>
          </Row>
        </StyledBox>
      </Col>
      <Col span={14}>
        <StyledBox>
          <Row gutter={[16, 16]}>
            <Col span={24} style={{ fontWeight: "bolder" }}>
              Job Description
            </Col>
            {data.detailedJobDescription.split("\n").map((item) => {
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
