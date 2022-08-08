import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../components/Button";
import axios, { baseUrl } from "../../../utils/axios";
import { Heading, TopRowWrapper, Box } from "../../styles/main.styles";
import Empty from "./Empty";
import Records from "./Table";
import FullPageLoader from "../../../components/FullPageLoader";
import { useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  // StyledBox,
  StyledText,
  StyledNumber,
  StyledCol,
} from "../../Dashboard/styles/box.styles";
import { Row, Col, Tabs, Switch, Dropdown, Menu, message } from "antd";
import SearchBar from "../../searchBar";
import styled from "styled-components";
import companyIcon from "../../../images/recruiterDashboard/companyLogo.svg";
import icon from "../../../images/recruiterDashboard/scheduledColor.svg";
import SalaryIcon from "../../../images/recruiterDashboard/location.svg";
import LocationIcon from "../../../images/recruiterDashboard/salary.svg";
import { MoreOutlined } from "@ant-design/icons";
import closeJobIcon from "../../../images/dropdown/closeJob.png";
import {
  CellText,
  OptionsText,
  ResponsiveViewHeading,
  StyledJD,
  DropDownIcon,
  StyledParagraph,
} from "../../../components/Table";
// import { DropDown } from "./Table/columns";
import addResume from "../../../images/dropdown/addResume.png";
import screening from "../../../images/dropdown/screening.png";
import linkIcon from "../../../images/dropdown/link.png";
import { Link } from "react-router-dom";
import entryLevelIcon from "../../../images/jobs/entry_level.svg";
import locationIcon from "../../../images/jobs/location.svg";
import dateIcon from "../../../images/jobs/date.svg";
import profileIcon from "../../../images/jobs/profile.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

let searchData = [];

export const getJobCards = (
  // data,
  // status,
  history,
  startScreening,
  closeJob,
  expired,
  data
) => {
  let cards = [];
  data?.map((record, index) => {
    cards.push(
      <Col xs={22} sm={23} md={6} key={index}>
        <StyledBox style={{ height: "auto" }}>
          <div
            style={{
              // backgroundColor,
              borderBottom: "2px solid #f3f6ef",
              width: "100%",
              display: "flex",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              // flexDirection: "column",
              // justifyContent: "center",
              // textAlign: "center",
              height: "40%",
              paddingLeft: "5%",
              padding: "3% 5%",
            }}
          >
            <img
              src={companyIcon}
              alt={"icon"}
              style={{
                // float: "top",
                // border: "1px solid black",
                width: "15%",
              }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{ paddingTop: "3%", paddingBottom: "2%" }}>
              <span style={{ fontSize: "15px", fontWeight: "bolder" }}>
                {record.job_title}
              </span>
              <br />
              <span style={{ fontSize: "13px" }}>
                {record.organization_name}
              </span>
            </div>
            {/* <DropDown
              history={history}
              startScreening={startScreening}
              closeJob={closeJob}
              expired={expired}
              record={job}
            /> */}
            {/* -------------------------------------------------------------------------------------- */}
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <OptionsText
                    onClick={() => history.push("/add_resume", { record })}
                  >
                    <DropDownIcon src={addResume} />
                    Add Resume
                  </OptionsText>
                  <OptionsText onClick={() => startScreening(record)}>
                    <DropDownIcon src={screening} />
                    Start Screening
                  </OptionsText>
                  {record.result?.length && (
                    <OptionsText
                      onClick={() =>
                        history.push("/screened_result", {
                          data: record.result,
                          jobDescriptionID: record.uuid,
                        })
                      }
                    >
                      <DropDownIcon src={screening} />
                      View Screened Results
                    </OptionsText>
                  )}
                  <OptionsText
                    onClick={() => {
                      message.success("Link Copied!");
                    }}
                  >
                    <DropDownIcon src={linkIcon} />
                    <CopyToClipboard text={record?.jobLink}>
                      Get Shareable Link
                    </CopyToClipboard>
                  </OptionsText>
                  <OptionsText onClick={() => closeJob(record.uuid)}>
                    <DropDownIcon src={closeJobIcon} />
                    Close Job
                  </OptionsText>
                </Menu>
              }
            >
              <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
            </Dropdown>
            {/* -------------------------------------------------------------------------------------- */}
          </div>
          <div
            style={{
              // border: "1px solid black",
              paddingLeft: "5%",
              marginTop: "15px",
            }}
          >
            <img
              src={SalaryIcon}
              alt={"icon"}
              style={{
                marginTop: "-5px",
                // border: "1px solid black",
                // width: "100%",
              }}
            />
            &nbsp;&nbsp;
            <span style={{ fontSize: "13px" }}>
              Total Candidates &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#e8f4f8",
                  color: "#1A77F2",
                  padding: "1px 5px 3px 5px",
                  fontWeight: "500",
                }}
              >
                {record.applicants}
              </span>
            </span>
          </div>
          <div
            style={{
              // border: "1px solid black",
              paddingLeft: "5%",
              marginTop: "15px",
            }}
          >
            <img
              src={SalaryIcon}
              alt={"icon"}
              style={{
                marginTop: "-5px",
                // border: "1px solid black",
                // width: "100%",
              }}
            />
            &nbsp;&nbsp;
            <span style={{ fontSize: "13px" }}>
              Salary &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ fontWeight: "bolder" }}>
                {record.salary}&nbsp;{record.currency}
              </span>{" "}
              /month
            </span>
          </div>
          <div
            style={{
              // border: "1px solid black",
              paddingLeft: "5%",
              marginTop: "15px",
            }}
          >
            <img
              src={LocationIcon}
              alt={"icon"}
              style={{
                marginTop: "-5px",
                // border: "1px solid black",
                // width: "100%",
              }}
            />
            &nbsp;&nbsp;
            <span style={{ fontSize: "13px" }}>{record.location}</span>
          </div>
          <div
            style={{
              // border: "1px solid black",
              paddingLeft: "5%",
              marginTop: "15px",
            }}
          >
            <img
              src={icon}
              alt={"icon"}
              style={{
                marginTop: "-5px",
                // border: "1px solid black",
                // width: "100%",
              }}
            />
            &nbsp;&nbsp;
            <span style={{ fontSize: "13px" }}>{record.jobType}</span>
          </div>
          <br />
          <div
            style={{
              // margingTop: "20px",
              borderTop: "2px solid #f3f6ef",
              width: "100%",
              display: "flex",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
              // height: "40%",
              padding: "5%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "#1A77F2", fontWeight: "500" }}>
              {record.status}
            </span>
            <span style={{ fontWeight: "500" }}>
              <a
                onClick={() =>
                  history.push(
                    `/jobs/details?job_id=${record.uuid}&status=${record.status}`
                  )
                }
              >
                See Details {`>`}
              </a>
            </span>
          </div>
          {/* Islamabad, PK <br />
              Full Time */}
        </StyledBox>
      </Col>
    );
  });
  return cards;
};

const DisplayJobs = (props) => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const [activeJobs, setActiveJobs] = useState([]);
  const [inActiveJobs, setInActiveJobs] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { value: expired } = useSelector((state) => state.jobsExpired);
  let [searchValue, setSearchValue] = useState("");
  const data = ["", "", "", "", "", "", "", "", "", ""];
  useEffect(() => {
    const func = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/job-description`);
        setJobData(res.data.jobs);

        const res1 = await axios.get(
          `${baseUrl}/api/job-description/jobs/getAllActiveJobs`
        );
        setActiveJobs(res1.data.jobs);
        console.log("hello active jobs");
        console.log(res1.data);

        const res2 = await axios.get(
          `${baseUrl}/api/job-description/jobs/getAllInActiveJobs`
        );
        setInActiveJobs(res2.data.jobs);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.response);
      }
    };
    func();
  }, []);

  const onChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  // const search = (searchInput) => {
  //   // console.log("in search");
  //   // console.log(searchData);
  //   let filteredSuggestions = searchData.filter(
  //     (d) =>
  //       JSON.stringify(d).replace(" ", "").toLowerCase().indexOf(searchInput) >
  //       -1
  //   );
  //   // setRowCount(filteredSuggestions.length);
  //   setJobData(filteredSuggestions);
  // };

  function callback(key) {
    console.log(key);
  }

  return !loading ? (
    activeJobs?.length > 0 ? (
      <div style={{ backgroundColor: "#FCFCFC", paddingBottom: "100px" }}>
        <Row justify="center">
          <Col span={22}>
            <div
              style={{
                marginTop: "13px",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bolder",
                  paddingTop: "2px",
                  color: "grey",
                }}
              >
                Jobs Posted
              </div>
              <StyledBox
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: "8px",
                  justifyContent: "space-between",
                  height: "40px",
                  backgroundColor: "#1877f2",
                  padding: "0 20px 0 20px",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/job/add")}
              >
                <PlusCircleOutlined
                  style={{
                    fontSize: 20,
                    color: "white",
                    marginRight: "10px",
                  }}
                />
                <StyledText color="white" bold>
                  Create Job
                </StyledText>
              </StyledBox>
            </div>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="ACTIVE JOBS" key="1">
                <Row gutter={[30, 30]} style={{ padding: "5px" }}>
                  <Records
                    jobData={activeJobs}
                    history={history}
                    expired={expired}
                  />
                  {/* {getJobCards(activeJobs, true)} */}
                </Row>
              </TabPane>
              <TabPane tab="INACTIVE JOBS" key="2">
                <Row gutter={[30, 30]} style={{ padding: "5px" }}>
                  <Records
                    jobData={inActiveJobs}
                    history={history}
                    expired={expired}
                  />
                  {/* {getJobCards(inActiveJobs, false)} */}
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    ) : (
      <Box>
        <Empty history={history} expired={expired} />
      </Box>
    )
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
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  align-items: center;
  height: 195px;
`;
