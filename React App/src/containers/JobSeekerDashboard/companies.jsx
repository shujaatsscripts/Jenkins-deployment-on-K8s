import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePic from "../../images/recruiterDashboard/profilePic.svg";
import CompanyIcon from "../../images/recruiterDashboard/company.svg";
import axios, { baseUrl } from "../../utils/axios";

function SuggestionCard({ data }) {
  return (
    <div
      style={{
        // backgroundColor,
        // borderBottom: "2px solid #f3f6ef",
        width: "80%",
        display: "flex",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        // flexDirection: "column",
        // justifyContent: "center",
        // textAlign: "center",
        // height: "40%",
        marginBottom: "20px",
        // border: "1px solid black",
      }}
    >
      <img
        src={CompanyIcon}
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
          {data.name}
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
            {data.country}
          </span>
        </span>
      </div>
    </div>
  );
}

function Index(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      axios.get(`${baseUrl}/api/organization/getSeekerTopOrg`).then((res) => {
        setData(res.data);
      });
      setLoading(false);
    };
    // apiCall();
  }, []);

  return (
    <StyledBox>
      <StyledHeading>Top Companies</StyledHeading>

      {data.map((element) => (
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
