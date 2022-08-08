import React, { useState, useEffect } from "react";
import { MainContainer, SectionHeading } from "./styles/main.styles";
import { Tag } from "antd";
import { StyledTable, CellText } from "../../components/Table";
import applicantIcon from "../../images/recruiterDashboard/Male.svg";
// import Loading from '../../components/Loading';
import axios, { baseUrl } from "../../utils/axios";

const HiringPipeline = () => {
  const renderText = (text) => <CellText>{text}</CellText>;
  let data = [
    { name: "Floyed Miles", post: "UX Designer" },
    { name: "Sara Edwards", post: "Java Developer" },
    { name: "George Lincon", post: "IOS Developer" },
    { name: "Ralph Lauren", post: "Design Lead" },
    { name: "Ralph Lauren", post: "Design Lead" },
  ];
  const columns = [
    {
      title: () => {
        return (
          <span
            style={{
              backgroundColor: "#f4a5a2",
              padding: "3px 0px 3px 7px",
              width: "90%",
              display: "block",
            }}
          >
            Job Title
          </span>
        );
      },
      dataIndex: "jobTitle",
      key: "title",
      render: renderText,
      responsive: ["sm"],
    },
    {
      title: () => {
        return (
          <span
            style={{
              backgroundColor: "#91A6B4",
              padding: "3px 0px 3px 7px",
              width: "100%",
              display: "block",
            }}
          >
            Status
          </span>
        );
      },
      dataIndex: "",
      key: "",
      render: ({ status }) => (
        <Tag
          color={status === "OPEN" ? "success" : "default"}
          style={{ borderRadius: "25px" }}
        >
          {status}
        </Tag>
      ),

      responsive: ["sm"],
    },
  ];

  const [hiringData, setHiringData] = useState(null);

  useEffect(() => {
    // setHiringData(data);
    const fetchHiringPipeline = async () => {
      const res = await axios.get(`${baseUrl}/api/applicant/recent-applicants`);
      setHiringData(res.data);
      console.log("new applicants");
      console.log(res.data);
    };
    fetchHiringPipeline();
  }, []);

  return !hiringData ? (
    // <Loading />
    <></>
  ) : (
    <MainContainer style={{ height: "408px" }}>
      {console.log(hiringData)}
      <SectionHeading bg="#DB4035" style={{ marginBottom: "30px" }}>
        New Applications
      </SectionHeading>
      {hiringData.map((item, index) => (
        <div
          style={{
            // backgroundColor,
            // borderBottom: "2px solid #f3f6ef",
            width: "100%",
            display: "flex",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            // flexDirection: "column",
            // justifyContent: "center",
            // textAlign: "center",
            // height: "40%",
            marginBottom: "15px",
            paddingLeft: "5%",
          }}
        >
          <img
            src={applicantIcon}
            alt={"icon"}
            style={{
              // float: "top",
              // border: "1px solid black",
              width: "14%",
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div style={{}}>
            <span style={{ fontSize: "15px", fontWeight: "bolder" }}>
              {item.name}
            </span>
            <br />
            <span
              style={{
                fontSize: "11px",
                color: "grey",
                fontFamily: "Montserrat",
              }}
            >
              Applied For{" "}
              <span style={{ fontWeight: "500", color: "black" }}>
                {item.job_title}
              </span>
            </span>
          </div>
        </div>
      ))}
      {/* <div style={{ marginBottom: "5px" }}>
        <StyledTable
          marginLeft="0"
          marginRight="0"
          cellHeight="30px"
          align="left"
          columns={columns}
          dataSource={hiringData}
          rowClassName={(record, index) =>
            `table_row_pointer ${index % 2 === 0 ? "dark" : "light"}`
          }
          pagination={false}
          spacing
        />
      </div> */}
    </MainContainer>
  );
};

export default HiringPipeline;
