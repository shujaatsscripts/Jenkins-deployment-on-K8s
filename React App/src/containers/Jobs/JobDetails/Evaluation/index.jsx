import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Calendar, Badge, Radio, Select, Typography } from "antd";
import { StyledText } from "../../../Dashboard/styles/box.styles";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Box } from "../../../styles/main.styles";
import styled from "styled-components";
import companyIcon from "../../../../images/recruiterDashboard/companyLogo.svg";
import icon from "../../../../images/recruiterDashboard/scheduledColor.svg";
import SalaryIcon from "../../../../images/recruiterDashboard/location.svg";
import LocationIcon from "../../../../images/recruiterDashboard/salary.svg";
import ProfilePic from "../../../../images/recruiterDashboard/profilePic.svg";
import MailIcon from "../../../../images/jobs/mail.svg";
import axios, { baseUrl } from "../../../../utils/axios";

const boxColors = [
  "#63D6E7",
  "#28B446",
  "#FFA258",
  "#4F98E4",
  "#672EFB",
  "#EA5194",
  "#3366FF",
  "#F48670",
  "#CC9900",
  "#A21A24",
  "#7CB07C",
];

let data = {
  new_candidates: [],
  resume_review: [],
  screening: [
    {
      name: "mohammed ashfaq habeeb",
      date: "2022-01-06T07:20:28.251Z",
      email: "qumber.zaidi14@gmail.com",
    },
    {
      name: "mohd khaleel mirza",
      date: "2022-01-07T06:17:37.438Z",
      email: "qumber.zaidi14@gmail.com",
    },
  ],
  tech_interview: [],
  task: [],
};

const Columns = ({ scheduleData }) => {
  let columns = [];
  let length = scheduleData.length;
  scheduleData.map((item, index) => {
    let borderRight = length === index + 1 ? "" : "1px solid silver";
    let rand = Math.floor(Math.random() * 10);
    let borderTop = `4px solid ${boxColors[(index + rand) % boxColors.length]}`;

    columns.push(
      <Col
        style={{
          borderRight,
          padding: "1%",
          width: "20%",
        }}
      >
        <div
          style={{
            fontWeight: "500",
            color: "grey",
            borderTop,
            backgroundColor: "white",
            marginBottom: "20px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            textAlign: "center",

            // display: "flex",
            // direction: "column",
            // justifyContent: "center",
            padding: "10px 5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
          }}
        >
          {item.title}
        </div>
        {item.candidates?.map((candidate, index) => {
          let rand = Math.floor(Math.random() * 10);
          let backgroundColor = boxColors[(index + rand) % boxColors.length];
          return (
            <StyledBox
              style={{
                height: "auto",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  borderBottom: "2px solid #f3f6ef",
                  width: "100%",
                  display: "flex",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  height: "40%",
                  paddingLeft: "5%",
                  padding: "3% 5%",
                }}
              >
                <img
                  src={ProfilePic}
                  alt={"icon"}
                  style={{
                    width: "15%",
                  }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div style={{ paddingTop: "3%", paddingBottom: "2%" }}>
                  <span style={{ fontSize: "15px", fontWeight: "bolder" }}>
                    {candidate.name}
                  </span>
                </div>
              </div>
              <div
                style={{
                  // border: "1px solid black",
                  paddingLeft: "5%",
                  marginTop: "15px",
                  textAlign: "left",
                }}
              >
                <img
                  src={icon}
                  alt={"icon"}
                  style={{
                    marginTop: "-5px",
                    // border: "1px solid black",
                    width: "8%",
                  }}
                />
                &nbsp;&nbsp;
                <span style={{ fontSize: "13px" }}>{candidate.date}</span>
              </div>
              <div
                style={{
                  // border: "1px solid black",
                  paddingLeft: "5%",
                  marginTop: "15px",
                }}
              >
                <img
                  src={MailIcon}
                  alt={"icon"}
                  style={{
                    // marginTop: "-5px",
                    // border: "1px solid black",
                    width: "8%",
                  }}
                />
                &nbsp;&nbsp;
                <span style={{ fontSize: "13px" }}>{candidate.email}</span>
              </div>
              <br />
            </StyledBox>
          );
        })}
      </Col>
    );
  });

  return <>{columns}</>;
};

//  <StyledBox
//    style={{
//      // color: "white",
//      // backgroundColor,
//      marginBottom: "20px",
//      padding: "10%",
//      height: "auto",
//      fontFamily: "Montserrat",
//      fontSize: "13px",
//    }}
//  >
//    <span style={{ fontWeight: "500", fontSize: "18px" }}>{candidate.name}</span>
//    {candidate.date}
//    <br />
//    {candidate.email}
//  </StyledBox>;

const scheduleData = [
  {
    title: "New Candidates",
    candidates: [
      {
        name: "Khalid Mirza",
        date: "05 July, 2020",
        email: "qwerty.abc@gmail.com",
      },
      {
        name: "Khalid Mirza",
        date: "05 July, 2020",
        email: "qwerty.abc@gmail.com",
      },
    ],
  },
  {
    title: "Resume Review",
    candidates: [
      {
        name: "Khalid Mirza",
        date: "05 July, 2020",
        email: "qwerty.abc@gmail.com",
      },
    ],
  },
  {
    title: "Screening",
    candidates: [
      {
        name: "Khalid Mirza",
        date: "05 July, 2020",
        email: "qwerty.abc@gmail.com",
      },
      {
        name: "Khalid Mirza",
        date: "05 July, 2020",
        email: "qwerty.abc@gmail.com",
      },
      {
        name: "Khalid Mirza",
        date: "05 July, 2020",
        email: "qwerty.abc@gmail.com",
      },
    ],
  },
  {
    title: "Tech Interview",
    candidates: [
      {
        name: "Khalid Mirza",
        date: "05 July, 2020",
        email: "qwerty.abc@gmail.com",
      },
    ],
  },
  {
    title: "Task",
    candidates: [],
  },
];

const Index = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const formatData = (data) => {
    return Object.keys(data).map((key) => {
      console.log(data[key]);
      let obj = null;
      let candidates = data[key];
      switch (key) {
        case "new_candidates":
          obj = { title: "New Candidates", candidates };
          break;
        case "resume_review":
          obj = { title: "Resume Review", candidates };
          break;
        case "screening":
          obj = { title: "Screening", candidates };
          break;
        case "tech_interview":
          obj = { title: "Tech Interview", candidates };
          break;
        case "task":
          obj = { title: "Selected", candidates };
          break;
        default:
          obj = { title: "No Candidate", candidates: [] };
      }
      return obj;
    });
  };

  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get(
        `${baseUrl}/api/candidate/getEvaluationData/${props.jobId}`
        // `${baseUrl}/api/candidate/getEvaluationData`
      );
      console.log(res.data);
      setData(formatData(res.data));
      setLoading(false);
    };
    apiCall();
  }, []);

  return data ? (
    <div style={{ marginBottom: "20px", padding: "20px" }}>
      <Row
        style={{ marginTop: "-25px", paddingBottom: "50px" }}
        justify="center"
        gutter={0}
      >
        <Columns scheduleData={data} />
      </Row>
    </div>
  ) : (
    <Box>{/* <FullPageLoader /> */}</Box>
  );
};

export default Index;

const StyledContainer = styled.div`
  /* ---------------------------------- */
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  border-radius: 15px;
  /* display: flex; */
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* height: 90px; */
`;

export const StyledBox = styled.div`
  /* ---------------------------------- */
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  height: 90px;
`;
