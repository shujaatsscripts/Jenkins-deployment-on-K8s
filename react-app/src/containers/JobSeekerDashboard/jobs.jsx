import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePic from "../../images/recruiterDashboard/profilePic.svg";
import JobIcon from "../../images/recruiterDashboard/Job.svg";
import axios, { baseUrl } from "../../utils/axios";
import { EditOutlined, CalendarOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

function SuggestionCard({ data }) {
  const history = useHistory();

  const handleClick = (id) => {
    history.push({
      pathname: "/jobseeker_jobs",
      state: { id },
    });
  };

  return (
    <div
      style={{
        width: "80%",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        marginBottom: "20px",
      }}
    >
      <a
        onClick={() => handleClick(data.uuid)}
        to={`/jobseeker_jobs`}
        style={{
          display: "flex",
          textDecoration: "none",
          color: "black",
        }}
      >
        <img
          src={JobIcon}
          alt={"icon"}
          style={{
            // float: "top",
            // border: "1px solid black",
            width: "10%",
          }}
        />
        &nbsp;&nbsp;&nbsp;
        <div style={{}}>
          <span style={{ fontSize: "15px", fontWeight: "bolder" }}>
            {data.job_title}
          </span>
          <br />
          <div
            style={{
              display: "flex",
              marginTop: "5px",
              fontSize: "11px",
              color: "grey",
              fontFamily: "Montserrat",
              // border: "1px solid black",
            }}
          >
            <CalendarOutlined style={{ marginTop: "0px", fontSize: "15px" }} />
            <span style={{ fontWeight: "500", color: "black" }}>
              &nbsp;&nbsp;&nbsp;{data.createdAt.split("T")[0]}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

function Index(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      axios
        .get(`${baseUrl}/api/job-description/jobs/getLatestJobsForSeeker`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    };
    apiCall();
  }, []);

  return (
    <StyledBox>
      <StyledHeading>Trending Jobs</StyledHeading>

      {data?.map((element) => (
        <SuggestionCard data={element} />
      ))}
    </StyledBox>
  );
}

export default Index;

const StyledBox = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeading = styled.div`
  margin: 15px 0 20px 0;
  padding-bottom: 10px;
  /* text-align: center; */
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  width: 80%;
`;
