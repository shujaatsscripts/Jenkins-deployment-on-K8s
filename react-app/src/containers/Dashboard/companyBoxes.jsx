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
import companyIcon from "../../images/recruiterDashboard/companyLogo.svg";
import SalaryIcon from "../../images/recruiterDashboard/location.svg";
import LocationIcon from "../../images/recruiterDashboard/salary.svg";

const CompanyBoxes = () => {
  //   const history = useHistory();

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
    newDataArray.push({
      text: "Frontend Developer",
      value: -2,
    });
    newDataArray.push({
      text: "UX Researcher",
      value: 7,
    });
    return newDataArray;
  };

  useEffect(() => {
    const fetchCandidates = () => {
      setStatistics(mapData());
    };
    fetchCandidates();
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
            Featured Companies
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
          >
            View All
          </button>
        </div>
      </StyledCol>
      {statistics?.map((item, index) => {
        let backgroundColor = boxColors[index % boxColors.length];
        return (
          <StyledCol xs={22} sm={23} md={4} key={index}>
            <StyledBox>
              <div
                style={{
                  // backgroundColor,
                  //   borderBottom: "2px solid #f3f6ef",
                  width: "100%",
                  //   display: "flex",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  //   flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  height: "40%",
                  paddingTop: "15%",
                }}
              >
                <img
                  src={companyIcon}
                  alt={"icon"}
                  style={{
                    // float: "top",
                    // border: "1px solid black",
                    width: "40%",
                  }}
                />
                {/* <br /> */}
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                <div style={{ paddingTop: "9%" }}>
                  <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
                    UX Designer
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#1A77F2",
                      fontWeight: "bold",
                    }}
                  >
                    21 Vacancies
                  </span>
                </div>
              </div>
            </StyledBox>
          </StyledCol>
        );
      })}
    </Row>
  );
};

export default CompanyBoxes;

export const StyledBox = styled.div`
  /* ---------------------------------- */
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  align-items: center;
  height: 195px;
`;
