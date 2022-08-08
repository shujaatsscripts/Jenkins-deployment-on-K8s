import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Calendar, Badge, Radio, Select, Typography } from "antd";
import { StyledBox, StyledText } from "../Dashboard/styles/box.styles";
import { PlusCircleOutlined } from "@ant-design/icons";
import Empty from "../Jobs/DisplayJobs/Empty";
import { Box } from "../styles/main.styles";
import FullPageLoader from "../../components/FullPageLoader";
import Week from "./week";
import axios, { baseUrl } from "../../utils/axios";
import { SwitchToggle } from "./switchToggle";
import moment from "moment";

const Index = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [monthIndex, setMonthIndex] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [period, setPeriod] = useState("month");

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/candidate/getAllSchedules`);
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    };
    apiCall();
  }, []);

  const scheduleData = {
    "2022-02-01": [
      { type: "warning", content: "This is warning event.", time: "11:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
    ],

    "2022-02-02": [
      { type: "warning", content: "This is warning event.", time: "11:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
    ],
    "2022-02-03": [
      { type: "warning", content: "This is warning event.", time: "11:30" },
    ],
    "2022-02-04": [
      { type: "warning", content: "This is warning event.", time: "11:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
    ],
    "2022-02-06": [
      { type: "warning", content: "This is warning event.", time: "11:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
    ],
    "2022-02-07": [
      { type: "warning", content: "This is warning event.", time: "11:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
      { type: "success", content: "This is usual event.", time: "12:30" },
    ],
  };

  // const newData = [
  //   { scheduledInterviewDate: "2022-01-07", scheduledInterviewTime: "12:00" },
  //   { scheduledInterviewDate: "2022-01-20", scheduledInterviewTime: "7:00" },
  //   { scheduledInterviewDate: "2022-01-07", scheduledInterviewTime: "15:00" },
  // ];

  function dateCellRender(value) {
    // console.log(value.format("YYYY-MM-DD"));
    let key = value.format("YYYY-MM-DD");
    // const listData = scheduleData[key];
    let newData = data?.filter(
      (item) => item?.scheduled_interview_date.split("T")[0] == key
    );
    return (
      <div style={{ border: "0px solid black" }}>
        <ul>
          {newData?.map((item, index) => (
            <li key={index}>
              <Badge
                status={"success"}
                text={`Interview scheduled at ${item?.scheduled_interview_time}`}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  function onChange(object) {
    console.log("here");
    console.log(object);

    let monthIndex = object._d.getMonth();
    let month = object._locale._months[monthIndex];
    let year = object._d.getFullYear();
    setMonthIndex(monthIndex);
    setMonth(month);
    setYear(year);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const getDaysArray = (year, monthIndex) => {
    // var monthIndex = month - 1; // 0..11 instead of 1..12
    var names = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    let week = [];
    while (date.getMonth() == monthIndex) {
      let temp = [];
      let tempMonth =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let tempDate =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let datestring = date.getFullYear() + "-" + tempMonth + "-" + tempDate;
      temp.push(datestring);
      temp.push(names[date.getDay()]);
      temp.push(date.getDate());
      week.push(temp);
      date.setDate(date.getDate() + 1);
      if (date.getDay() === 1) {
        result.push(week);
        week = [];
      }
    }
    if (week.length) {
      result.push(week);
    }
    return result;
  };

  return !loading ? (
    <div style={{ backgroundColor: "#FCFCFC", paddingBottom: "50px" }}>
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
              Schedules
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
          {/* //=================================================================== */}
        </Col>
        <Col span={22}>
          <div
            style={{
              border: "0px solid black",
              display: "flex",
              // justifyContent: "space-between",
            }}
          >
            <SwitchToggle
              setPeriod={setPeriod}
              // style={{ border: "1px solid black" }}
            />
            <div style={{ fontWeight: "bolder" }}>
              {month}&nbsp;{year}
            </div>
          </div>
          <br />
          {/* {period === "week" ? (
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Select
                defaultValue="week 1"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Select.Option value="1">week 1</Select.Option>
                <Select.Option value="2">week 2</Select.Option>
              </Select>
            </div>
          ) : null} */}
          {period === "month" ? (
            <Calendar
              style={{ borderRadius: "15px" }}
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
              onChange={onChange}
              headerRender={({ value, type, onChange, onTypeChange }) => {
                const start = 0;
                const end = 12;
                const monthOptions = [];

                const current = value.clone();
                const localeData = value.localeData();
                const months = [];
                for (let i = 0; i < 12; i++) {
                  current.month(i);
                  months.push(localeData.monthsShort(current));
                }

                for (let index = start; index < end; index++) {
                  monthOptions.push(
                    <Select.Option className="month-item" key={`${index}`}>
                      {months[index]}
                    </Select.Option>
                  );
                }
                const month = value.month();

                const year = value.year();
                const options = [];
                for (let i = year - 10; i < year + 10; i += 1) {
                  options.push(
                    <Select.Option key={i} value={i} className="year-item">
                      {i}
                    </Select.Option>
                  );
                }
                return (
                  <div style={{ padding: 8 }}>
                    <Row justify="end" style={{ border: "0px solid black" }}>
                      {/* <Col>
                      <Radio.Group
                        size="small"
                        onChange={(e) => onTypeChange(e.target.value)}
                        value={type}
                      >
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                      </Radio.Group>
                    </Col> */}
                      <Col>
                        <Select
                          style={{ marginRight: "10px" }}
                          size="small"
                          dropdownMatchSelectWidth={false}
                          className="my-year-select"
                          onChange={(newYear) => {
                            const now = value.clone().year(newYear);
                            onChange(now);
                          }}
                          value={String(year)}
                        >
                          {options}
                        </Select>
                      </Col>
                      <Col>
                        <Select
                          size="small"
                          dropdownMatchSelectWidth={false}
                          value={String(month)}
                          onChange={(selectedMonth) => {
                            const newValue = value.clone();
                            newValue.month(parseInt(selectedMonth, 10));
                            onChange(newValue);
                          }}
                        >
                          {monthOptions}
                        </Select>
                      </Col>
                    </Row>
                  </div>
                );
              }}
            />
          ) : (
            <Week dates={getDaysArray(year, monthIndex)} scheduleData={data} />
          )}
        </Col>
      </Row>
    </div>
  ) : (
    <Box>
      <FullPageLoader />
    </Box>
  );
};

export default Index;
