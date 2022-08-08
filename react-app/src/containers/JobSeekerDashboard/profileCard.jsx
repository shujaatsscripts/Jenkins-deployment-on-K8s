import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePic from "../../images/recruiterDashboard/Male.svg";
import axios, { baseUrl } from "../../utils/axios";
import ProfileDetails from "./profileDetails";
import { Link } from "react-router-dom";

function Index(props) {
  const [seekerData, setSeekerData] = useState(null);
  const [followData, setFollowData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      axios.get(`${baseUrl}/api/user/personal-info`).then((seeker) => {
        setSeekerData(seeker.data);
      });
      axios.get(`${baseUrl}/api/follow/getDashboardInfo`).then((follow) => {
        setFollowData(follow.data);
      });

      setLoading(false);
    };
    apiCall();
  }, []);

  return (
    <StyledBox>
      <StyledTopDiv>
        <StyledProfileIconDiv>
          <img
            src={seekerData?.profile_URL ? seekerData.profile_URL : ProfilePic}
            style={{ width: "100%", borderRadius: "100px" }}
            alt="avatar"
          />
        </StyledProfileIconDiv>
      </StyledTopDiv>
      <StyledHeading>
        {seekerData?.first_name} {seekerData?.last_name}
      </StyledHeading>
      <StyledSubHeading>{seekerData?.title}</StyledSubHeading>
      <StyledFlexContainer>
        <StyledFollowContainer>
          <StyledFollowDiv>
            <Link
              to="/jobseeker_Network"
              style={{ textDecoration: "none", color: "black" }}
            >
              <StyledFollowTitle>Following</StyledFollowTitle>
              <StyledFollowSubTiltle>
                {followData?.following}
              </StyledFollowSubTiltle>
            </Link>
          </StyledFollowDiv>
          <StyledFollowDiv>
            <Link
              to="/jobseeker_Network"
              style={{ textDecoration: "none", color: "black" }}
            >
              <StyledFollowTitle>Followers</StyledFollowTitle>
              <StyledFollowSubTiltle>
                {followData?.followers}
              </StyledFollowSubTiltle>
            </Link>
          </StyledFollowDiv>
        </StyledFollowContainer>
      </StyledFlexContainer>
      <StyledFlexContainer>
        <ProfileDetails record={seekerData} />
        {/* <StyledAnchor>View Profile</StyledAnchor> */}
      </StyledFlexContainer>
    </StyledBox>
  );
}

export default Index;

const StyledAnchor = styled.div`
  margin-top: 25px;
  font-size: 15px;
  font-weight: 600;
  color: #1a77f2;
  text-decoration: underline;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFollowContainer = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  margin-top: 20px;
  width: 75%;
  padding: 10px 0 7px 0;
  display: flex;
  justify-content: space-between;
`;

const StyledFollowDiv = styled.div`
  text-align: center;
`;

const StyledFollowTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: rgba(65, 68, 74, 0.36);
`;

const StyledFollowSubTiltle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const StyledHeading = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const StyledSubHeading = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: rgba(65, 68, 74, 0.36);
`;

const StyledProfileIconDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90px;
  /* background-color: black; */
  height: 90px;
  border-radius: 100px;
  margin-top: 20px;
  border: 3px solid white;
`;

const StyledTopDiv = styled.div`
  background-image: linear-gradient(#579fff, #accefc);
  height: 50px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 65px;
`;

const StyledBox = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  align-items: center;
  height: 330px;
  width: 100%;
`;
