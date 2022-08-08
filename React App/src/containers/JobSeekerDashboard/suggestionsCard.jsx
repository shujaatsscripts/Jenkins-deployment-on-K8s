import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePic from "../../images/recruiterDashboard/profilePic.svg";
import ApplicantIcon from "../../images/recruiterDashboard/Male.svg";
import axios, { baseUrl } from "../../utils/axios";
import {
  EditOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

function SuggestionCard({ data }) {
  const history = useHistory();

  const handleClick = (id) => {
    history.push({
      pathname: "/jobseeker_Network",
      state: { id },
    });
  };

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        marginBottom: "20px",
      }}
    >
      <a
        onClick={() => handleClick(data.uuid)}
        style={{
          display: "flex",
          textDecoration: "none",
        }}
      >
        <img
          src={data?.profile_URL ? data.profile_URL : ApplicantIcon}
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
            {data.first_name} {data.last_name}
          </span>
          <br />
          <span
            style={{
              fontSize: "11px",
              color: "grey",
              fontFamily: "Montserrat",
            }}
          >
            <span style={{ fontWeight: "500", color: "black" }}>
              {data.title}
            </span>
          </span>
        </div>
      </a>
      {/* <a
        style={{
          textDecoration: "none",
          fontSize: "12px",
          fontWeight: "bolder",
          color: "#3080FF",
        }}
        onClick={()=>{

        }}
      >
        Follow
      </a> */}
    </div>
  );
}

function Index(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("bcix_userId");

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      const events = await axios.get(
        `${baseUrl}/api/personalInfo/getDashboardSeekers`
      );
      console.log(events.data);
      setData(events.data);
      setLoading(false);
    };
    apiCall();
  }, []);

  const follow = async () => {
    await axios.post(`${baseUrl}/api/follow/postFollowSeeker`, {
      following: "",
    });
  };

  return (
    <StyledBox>
      <StyledHeading>Suggestions</StyledHeading>

      {data?.map((element) =>
        element.uuid !== userId ? <SuggestionCard data={element} /> : null
      )}
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
