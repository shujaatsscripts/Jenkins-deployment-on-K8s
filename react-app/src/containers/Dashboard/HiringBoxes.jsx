import { Row } from "antd";
import React, { useState, useEffect } from "react";
import {
  StyledHiringBox,
  StyledText,
  StyledHiringNumber,
  StyledCol,
} from "./styles/box.styles";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import Loading from "../../components/Loading";
import axios, { baseUrl } from "../../utils/axios";
import styled from "styled-components";
import icon from "../../images/recruiterDashboard/scheduledColor.svg";
import companyIcon from "../../images/recruiterDashboard/company.svg";
import SalaryIcon from "../../images/recruiterDashboard/location.svg";
import LocationIcon from "../../images/recruiterDashboard/salary.svg";

const HiringBoxes = () => {
  const history = useHistory();

  const boxColors = [
    "#EA5194",
    "#3366FF",
    "#F48670",
    "#CC9900",
    "#A21A24",
    "#7CB07C",
  ];

  const [statistics, setStatistics] = useState(null);

  const mapData = () => {
    const newDataArray = [];
    newDataArray.push({ text: "PC Manager", value: 5 });

    newDataArray.push({
      text: "QA Testing",
      value: 8,
    });

    newDataArray.push({
      text: "Project Manager",
      value: 2,
    });
    newDataArray.push({
      text: "HR Manager",
      value: 3,
    });
    // newDataArray.push({
    //   text: "Frontend Developer",
    //   value: -2,
    // });
    // newDataArray.push({
    //   text: "UX Researcher",
    //   value: 7,
    // });
    return newDataArray;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get(
        `${baseUrl}/api/job-description/jobs/getLatestJobs`
      );
      console.log("hello jobs");
      console.log(res.data);
      setStatistics(res.data);
    };
    fetchJobs();
  }, []);

  return !statistics ? (
    <Loading />
  ) : (
    <Row
      justify="center"
      gutter={26}
      // style={{ border: "1px solid black" }}
    >
      <StyledCol span={24}>
        <div
          style={{
            marginTop: "-10px",
            display: "flex",
            // flexDirection: "row",
            justifyContent: "space-between",
            // border: "1px solid black",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              // border: "1px solid black",
              fontSize: "20px",
              fontWeight: "bolder",
              paddingTop: "2px",
              // color: "grey",
            }}
          >
            My Jobs
          </div>
          <button
            style={{
              // fontSize: "14px",
              borderRadius: "8px",
              height: "40px",
              backgroundColor: "white",
              color: "#1877f2",
              borderColor: "#1877f2",
              padding: "0 20px 0 20px",
              fontWeight: "bolder",
            }}
            onClick={() => history.push("/jobs")}
          >
            View All
          </button>
        </div>
      </StyledCol>
      {statistics?.map((item, index) => {
        let backgroundColor = boxColors[index % boxColors.length];
        return (
          <StyledCol xs={22} sm={23} md={6} key={index}>
            <StyledBox>
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
                }}
              >
                <img
                  src={companyIcon}
                  alt={"icon"}
                  style={{
                    // float: "top",
                    // border: "1px solid black",
                    width: "14%",
                  }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ paddingTop: "4%", paddingBottom: "2%" }}>
                  <span style={{ fontSize: "15px", fontWeight: "bolder" }}>
                    {item.job_title}
                  </span>
                  <br />
                  <span style={{ fontSize: "13px" }}>{item.company_name}</span>
                </div>
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
                    {item.salary}&nbsp;{item.currency}
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
                <span style={{ fontSize: "13px" }}>{item.location}</span>
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
                <span style={{ fontSize: "13px" }}>{item.job_type}</span>
              </div>
              {/* <div
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
                  Total Applicants
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ fontWeight: "bolder" }}>
                    {item.total_applicants}
                  </span>
                </span>
              </div> */}
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
                  {item.status}
                </span>
                <span style={{ fontWeight: "500" }}>
                  <a
                    onClick={() =>
                      history.push(
                        `/jobs/details?job_id=${item.uuid}&status=${item.status}`
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
          </StyledCol>
        );
      })}
    </Row>
  );
};

export default HiringBoxes;

export const StyledBox = styled.div`
  /* ---------------------------------- */
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  align-items: center;
  /* height: 240px; */
`;
