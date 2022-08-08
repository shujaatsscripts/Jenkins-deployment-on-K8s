import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Calendar, Badge, Radio, Select, Typography } from "antd";
import { StyledBox, StyledText } from "../Dashboard/styles/box.styles";
import { PlusCircleOutlined } from "@ant-design/icons";
import Empty from "../Jobs/DisplayJobs/Empty";
import { Box } from "../styles/main.styles";
import FullPageLoader from "../../components/FullPageLoader";
import styled from "styled-components";

const boxColors = [
  "#EA5194",
  "#3366FF",
  "#F48670",
  "#CC9900",
  "#A21A24",
  "#7CB07C",
];

const getColumns = (week, data) => {
  let columns = [];
  let weekLength = week.length;
  week.map((dayData, index) => {
    let borderRight = weekLength === index + 1 ? "" : "1px solid silver";
    let scheduleData = data?.filter(
      (item) => item?.scheduled_interview_date.split("T")[0] == dayData[0]
    );
    console.log(dayData);
    console.log(scheduleData);
    columns.push(
      <Col
        // span={3}
        style={{
          borderRight,
          // borderLeft: "2px solid grey",

          // height: "70vh",
          textAlign: "center",
          // padding: "1%",
          width: "14.2%",
        }}
      >
        {dayData[2]} <br />
        <span style={{ fontWeight: "500", color: "grey" }}>
          {dayData[1]} <br /> <br />
        </span>
        {scheduleData?.map((task, index) => {
          let rand = Math.floor(Math.random() * 10);
          let backgroundColor = boxColors[(index + rand) % boxColors.length];
          return (
            <StyledBox
              style={{
                color: "white",
                // boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px",
                backgroundColor,
                // color,
                margin: "0 4% 20px 4%",
                padding: "10%",

                height: "auto",
                // backgroundColor: "white",
                fontFamily: "Montserrat",
                fontSize: "13px",
              }}
            >
              <span style={{ fontWeight: "500", fontSize: "18px" }}>
                {task.scheduled_interview_time}
              </span>
              {/* <br /> */}
              <div style={{ border: "0px solid red", margin: "0px" }}>
                Candidate Name <br /> {task.candidate_name}. <br /> Interview
                time <br />
                {task.scheduled_interview_time}. <br /> Candidate Emil <br />
                {task.candidate_email}. <br /> Recruiter Email:
                <br />
                {task.recruiter_email}.
              </div>
            </StyledBox>
          );
        })}
      </Col>
    );
  });
  return columns;
};

const Index = ({ dates, scheduleData }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(true);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [panel, setPanel] = useState("month");
  const [columns, setColumns] = useState(getColumns(dates[0], scheduleData));

  useEffect(() => {
    console.log(dates);
    console.log(scheduleData);
  }, []);

  function handleChange(value) {
    console.log(value);
    let weekIndex = parseInt(value) - 1;
    setColumns(getColumns(dates[weekIndex], scheduleData));
  }

  const getOptions = (dates) => {
    let options = [];
    dates.map((week, index) => {
      options.push(
        <Select.Option value={index + 1}>week {index + 1}</Select.Option>
      );
    });
    return options;
  };

  return !loading ? (
    <StyledContainer style={{ marginBottom: "20px", padding: "20px" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Select
            defaultValue="week 1"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            {getOptions(dates)}
          </Select>
        </div>

        <Row
          style={{ marginTop: "20px", paddingBottom: "50px" }}
          justify="center"
          gutter={0}
        >
          {columns}
        </Row>
      </div>
    </StyledContainer>
  ) : (
    <Box>
      <FullPageLoader />
    </Box>
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
