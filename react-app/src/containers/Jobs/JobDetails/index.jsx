import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import axios, { baseUrl } from "../../../utils/axios";
import { Heading, TopRowWrapper, Box } from "../../styles/main.styles";
import Empty from "../DisplayJobs/Empty";
import Records from "../DisplayJobs/Table";
import FullPageLoader from "../../../components/FullPageLoader";
import { useSelector } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";

import {
  // StyledBox,
  StyledText,
  StyledNumber,
  StyledCol,
} from "../../Dashboard/styles/box.styles";
import { Row, Col, Tabs, Switch, Tooltip } from "antd";
import SearchBar from "../../searchBar";
import styled from "styled-components";
import companyIcon from "../../../images/recruiterDashboard/companyLogo.svg";
import icon from "../../../images/recruiterDashboard/scheduledColor.svg";
import SalaryIcon from "../../../images/recruiterDashboard/location.svg";
import LocationIcon from "../../../images/recruiterDashboard/salary.svg";
import Candidate from "./Candidate";
import Source from "./Source";
import JobDetail from "./JobDetail";
import Evaluation from "./Evaluation";
import candidateIcon from "../../../images/recruiterDashboard/candidates.svg";
import profileBlueIcon from "../../../images/jobs/profileBlue.svg";
import evaluationIcon from "../../../images/jobs/evaluation.svg";
import EvaluationBlueIcon from "../../../images/jobs/evaluation.svg";
import sourceIcon from "../../../images/jobs/source.svg";
import sourceBlueIcon from "../../../images/jobs/sourceBlue.svg";
import jobBlueIcon from "../../../images/jobs/job.svg";
import jobIcon from "../../../images/jobs/jobBlue.svg";
import CandidateDetail from "../../Shortlisted";

let searchData = [];
const DisplayJobs = () => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [checked, setChecked] = useState(
    searchParams.get("status") === "OPEN" ? true : false
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { value: expired } = useSelector((state) => state.jobsExpired);
  const [tabKey, setTabKey] = useState("1");

  useEffect(() => {
    console.log(checked);
    const apiCall = async () => {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/api/job-description/${searchParams.get("job_id")}`
      );
      console.log("hello job bhalo");
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    };
    apiCall();
  }, []);

  function callback(key) {
    console.log(key);
    setTabKey(key);
  }

  const onSwitchChange = async (checked) => {
    setChecked(checked);
    console.log(`switch to ${checked}`);
    setLoading(true);
    if (!checked) {
      const res = await axios.put(
        `${baseUrl}/api/job-description/close-job/${searchParams.get("job_id")}`
      );
      console.log("hello job status");
      console.log(res);
    } else {
      const res = await axios.put(
        `${baseUrl}/api/job-description/open-job/${searchParams.get("job_id")}`
      );
      console.log("hello job status");
      console.log(res);
    }

    // setData(res.data);
    setLoading(false);
  };

  return !loading ? (
    true ? (
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
                {data.jobTitle}
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
            <Row
              style={{
                border: "0px solid black",
                marginBottom: "15px",
                marginTop: "20px",
              }}
            >
              <Col span={16} style={{ display: "flex" }}>
                <div
                  style={{
                    // border: "1px solid black",
                    // paddingLeft: "5%",
                    marginTop: "5px",
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
                    Salary &nbsp;&nbsp;&nbsp;&nbsp;
                    <spsn style={{ fontWeight: "bolder" }}>
                      {data.salary}&nbsp;{data.currency}
                    </spsn>{" "}
                    /month
                  </span>
                </div>
                <div
                  style={{
                    // border: "1px solid black",
                    paddingLeft: "5%",
                    marginTop: "5px",
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
                  <span style={{ fontSize: "13px" }}>{data.location}</span>
                </div>
                <div
                  style={{
                    // border: "1px solid black",
                    paddingLeft: "5%",
                    marginTop: "5px",
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
                  <span style={{ fontSize: "13px" }}>{data.jobType}</span>
                </div>
              </Col>
              <Col
                span={8}
                style={{ display: "flex", justifyContent: "right" }}
              >
                {/* {console.log("hi checked" + checked)} */}
                <Tooltip title={`${checked ? "Close Job" : "Open Job"}`}>
                  <Switch
                    // defaultChecked={checked}
                    checked={checked}
                    onChange={onSwitchChange}
                    style={{ marginTop: "7px", marginRight: "0rem" }}
                  />
                </Tooltip>
                {/* <StyledButton>Share & Promote</StyledButton> */}
              </Col>
            </Row>

            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane
                tab={
                  <span style={{ fontSize: "12px" }}>
                    <img
                      src={tabKey === "1" ? profileBlueIcon : candidateIcon}
                      alt={"icon"}
                      style={{
                        width: "14px",
                        height: "14px",
                        padding: "0px",
                        marginRight: "7px",
                        marginTop: "-4px",
                      }}
                    />
                    {/* &nbsp; &nbsp; */}

                    <span
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        color: `${tabKey === "1" ? "#1A77F2" : "silver"}`,
                      }}
                    >
                      CANDIDATES
                    </span>
                  </span>
                }
                key="1"
              >
                <Candidate jobId={searchParams.get("job_id")} />
              </TabPane>
              {/* <TabPane
                tab={
                  <span style={{ fontSize: "12px" }}>
                    <img
                      src={tabKey === "2" ? sourceBlueIcon : sourceIcon}
                      alt={"icon"}
                      style={{
                        width: "14px",
                        height: "14px",
                        padding: "0px",
                        marginRight: "7px",
                        marginTop: "-4px",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        color: `${tabKey === "2" ? "#1A77F2" : "silver"}`,
                      }}
                    >
                      BY SOURCE
                    </span>
                  </span>
                }
                key="2"
              >
                <Source />
              </TabPane> */}
              <TabPane
                tab={
                  <span style={{ fontSize: "12px" }}>
                    <img
                      src={tabKey === "3" ? jobIcon : jobBlueIcon}
                      alt={"icon"}
                      style={{
                        width: "14px",
                        height: "14px",
                        padding: "0px",
                        marginRight: "7px",
                        marginTop: "-4px",
                      }}
                    />
                    {/* &nbsp; &nbsp; */}

                    <span
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        color: `${tabKey === "3" ? "#1A77F2" : "silver"}`,
                      }}
                    >
                      JOB DETAILS
                    </span>
                  </span>
                }
                key="3"
              >
                <JobDetail jobId={searchParams.get("job_id")} />
              </TabPane>
              <TabPane
                tab={
                  <span style={{ fontSize: "12px" }}>
                    <img
                      src={tabKey === "4" ? jobIcon : jobBlueIcon}
                      alt={"icon"}
                      style={{
                        width: "14px",
                        height: "14px",
                        padding: "0px",
                        marginRight: "7px",
                        marginTop: "-4px",
                      }}
                    />
                    {/* &nbsp; &nbsp; */}

                    <span
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        color: `${tabKey === "4" ? "#1A77F2" : "silver"}`,
                      }}
                    >
                      EVALUATION
                    </span>
                  </span>
                }
                key="4"
                style={{ padding: "5px" }}
              >
                <Evaluation jobId={searchParams.get("job_id")} />
              </TabPane>
            </Tabs>

            {/* <div style={{ display: "flex" }}>
              <SearchBar searchValue={searchValue} onChange={onChange} />
              &nbsp;&nbsp;&nbsp;
              <StyledButton onClick={() => search(searchValue)}>
                Search
              </StyledButton>
            </div>

            <br />
            <Records jobData={jobData} history={history} expired={expired} /> */}
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

export const StyledButton = styled.button`
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
