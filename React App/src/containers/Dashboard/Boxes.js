import { Row } from "antd";
import React, { useState, useEffect } from "react";
import {
  StyledBox,
  StyledText,
  StyledNumber,
  StyledCol,
} from "./styles/box.styles";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import Loading from "../../components/Loading";
import axios, { baseUrl } from "../../utils/axios";
import totalCandidatesIcon from "../../images/recruiterDashboard/totalCandidates.svg";
import shortlistedIcon from "../../images/recruiterDashboard/shortlisted.svg";
import hiredIcon from "../../images/recruiterDashboard/hired.svg";
import rejectedIcon from "../../images/recruiterDashboard/rejected.svg";
import averageTimeIcon from "../../images/recruiterDashboard/averageTime.svg";

const Box = () => {
  const history = useHistory();

  const boxColors = ["#0073B6", "#FFB200", "#00A65A", "#E3543F", "#00C0EF"];
  const boxIcons = {
    "Total Candidates": totalCandidatesIcon,
    Shortlisted: shortlistedIcon,
    Rejected: rejectedIcon,
    "In Progress": hiredIcon,
    Hired: hiredIcon,
    "Average Time": averageTimeIcon,
  };

  const [statistics, setStatistics] = useState(null);

  const mapData = (total, statuses) => {
    const newDataArray = [];
    newDataArray.push({ text: "Total Candidates", value: total || 0 });

    newDataArray.push({
      text: "Shortlisted",
      value: statuses?.find((i) => i.status === "SHORTLISTED")?.value || 0,
    });

    newDataArray.push({
      text: "Hired",
      value: statuses?.find((i) => i.status === "SELECTED")?.value || 0,
    });
    newDataArray.push({
      text: "Average Time",
      value: "10",
    });
    newDataArray.push({
      text: "Rejected",
      value: statuses?.find((i) => i.status === "REJECTED")?.value || 0,
    });
    return newDataArray;
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      const res = await axios.get(
        `${baseUrl}/api/candidate/status/organization`
      );
      console.log("dashboard summary");
      console.log(res.data);
      // setStatistics(mapData(res.data.totalCandidates, res.data.statuses));
      setStatistics(res.data);
    };
    fetchCandidates();
  }, []);

  return !statistics ? (
    <Loading />
  ) : (
    <Row justify="center" gutter={16}>
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
              fontSize: "24px",
              fontWeight: "bolder",
              paddingTop: "2px",
              color: "grey",
            }}
          >
            Dashboard
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
      </StyledCol>
      {statistics?.map((item, index) => {
        let backgroundColor = boxColors[index % boxColors.length];
        {
          /* let width = index < 4 ? "24%" : "30%"; */
        }
        let width = "30%";
        {
          /* let colWidth = index < 4 ? 5 : 4; */
        }
        let icon = boxIcons[item.name];
        return (
          <StyledCol xs={22} sm={23} md={4} key={index}>
            <StyledBox>
              <div
                style={{
                  // border: "1px solid black",
                  width: "90%",
                  height: "60%",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                }}
              >
                <div
                  style={{
                    // border: "1px solid black",
                    width,
                    backgroundColor,
                    borderRadius: "10px",
                    textAlign: "center",
                    paddingTop: "7px",
                  }}
                >
                  <img
                    src={icon}
                    alt={"icon"}
                    style={{
                      padding: "0px",
                    }}
                  />
                </div>
                <StyledNumber>
                  {item.value}{" "}
                  <span style={{ fontSize: "14px" }}>
                    {index === 5 ? "(hrs)" : ""}
                  </span>
                </StyledNumber>
              </div>
              <div style={{ width: "90%", textAlign: "left" }}>
                <StyledText>{item.name}</StyledText>
              </div>
            </StyledBox>
          </StyledCol>
        );
      })}
    </Row>
  );
};

export default Box;
