import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import logo from "../../../../images/recruiterDashboard/Job.svg";
import calender from "../images/calender.svg";
import fulltime from "../images/fulltime.svg";
import location from "../images/location.svg";
import profile from "../images/profile.svg";
import JobsData from "./JobsData";
import profileImg from "../images/myprofile.svg";
import setting from "../images/dots.svg";
import {
  CardStyling,
  CompanyLogo,
  JobTitle,
  SpanStyle,
  IconStyle,
  SalaryStyle,
  MonthStyle,
  TableStyle,
  HeadingStyle,
  // SpanStyle,
  BoxStyle,
  // TableStyle,
} from "./main.styles.js";

const JobList = ({ dataSource, setJob }) => {
  // const [jobData, setJobData] = useState(JobsData);

  const columns = [
    {
      title: "",
      // width: "5%",
      dataIndex: `${logo}`,
      render: () => (
        <img src={`${logo}`} style={{ marginLeft: "10%" }} width="40px" />
      ),
    },
    {
      dataIndex: "key",
      key: "key",
      // width: "60%",
      render(text, record) {
        return (
          <a onClick={() => setJob(record)}>
            <Row justify="space-between">
              <Col>
                <span>
                  <SalaryStyle>{record.company}</SalaryStyle>
                  <br />
                  <span>{record.job_title}</span>
                  <br />
                  <br />
                  <SpanStyle>
                    <IconStyle src={fulltime} alt="" />
                    &nbsp; {record.job_type}
                  </SpanStyle>
                  <br />
                  <SpanStyle>
                    <IconStyle src={location} alt="" />
                    &nbsp;{record.location}
                  </SpanStyle>
                </span>
              </Col>
              <Col style={{ marginRight: "6%" }}>
                <SalaryStyle>
                  {record.salary} {record.currency}
                </SalaryStyle>
                <MonthStyle>&nbsp;/month</MonthStyle>

                <br />
                <br />
                <br />

                <SpanStyle>
                  <IconStyle src={profile} alt="" />
                  &nbsp; {record.level}
                  {record.total_candidates > 1 ? "s" : ""}
                </SpanStyle>
                <br />
                <SpanStyle>
                  <IconStyle src={calender} alt="" />
                  &nbsp; {record.createdAt.split("T")[0]}
                </SpanStyle>
              </Col>
            </Row>
          </a>
        );
      },
    },
  ];

  console.log(JobsData);
  return (
    <>
      <TableStyle
        spacing={true}
        bordered={false}
        showHeader={false}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 4 }}
        style={{
          // width: "100%",
          marginTop: "-8px",
          // border: "1px solid black",
        }}
      ></TableStyle>
    </>
    // <div>
    //   {jobData.map((curElem) => {
    //     return (
    //       <>
    //         <CardStyling key={curElem.id}>
    //           <Row gutter={[16, 16]} style={{ padding: "8px", width: "100%" }}>
    //             <Col span={4}>
    //               <CompanyLogo src={curElem.logo} alt="" />
    //             </Col>
    //             <Col span={12} style={{ paddingLeft: "15px" }}>
    //               <JobTitle>{curElem.jobTitle}</JobTitle>
    //               <p style={{ color: "rgba(0,0,0,0.5" }}>
    //                 {curElem.company_name}
    //               </p>
    //               <br />
    //               <SpanStyle>
    //                 <IconStyle src={fulltime} alt="" />
    //                 &nbsp; {curElem.jobStatus}
    //               </SpanStyle>
    //               <br />
    //               <SpanStyle>
    //                 <IconStyle src={location} alt="" />
    //                 &nbsp; {curElem.location}
    //               </SpanStyle>
    //             </Col>
    //             <Col span={8}>
    //               <SalaryStyle>{curElem.salary}</SalaryStyle>
    //               <MonthStyle>&nbsp;/month</MonthStyle>

    //               <br />
    //               <br />
    //               <br />
    //               <div style={{ marginTop: "10px" }}>
    //                 <SpanStyle>
    //                   <IconStyle src={profile} alt="" />
    //                   &nbsp; {curElem.applicant} Applicant
    //                 </SpanStyle>
    //                 <br />
    //                 <SpanStyle>
    //                   <IconStyle src={calender} alt="" />
    //                   &nbsp; {curElem.date}
    //                 </SpanStyle>
    //               </div>
    //             </Col>
    //           </Row>
    //         </CardStyling>
    //       </>
    //     );
    //   })}
    // </div>
  );
};

export default JobList;
