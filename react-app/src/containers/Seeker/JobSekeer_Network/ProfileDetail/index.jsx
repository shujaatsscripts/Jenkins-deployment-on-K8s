import React, { useState, useEffect } from "react";
import {
  MyBoxStyle,
  DetailStyle,
  DetailHeadingStyle,
  ProfileStyle,
  ButtonStyle,
  ButtonStyling,
  ImageStyling,
  ContactHeading,
  InfoImageStyling,
  Info,
  InfoDetail,
  SocialIcons,
  NameHeading,
  StyledCard,
} from "./ProfileDetail.styles.js";
import { Card } from "antd";

import profileImg from "../../../../images/recruiterDashboard/Male.svg";
import share from "../images/sharevecter.svg";
import location from "../images/locationvector.svg";
import email from "../images/email.svg";
import phone from "../images/phone.svg";
import be from "../images/be.svg";
import fb from "../images/fb.svg";
import github from "../images/github.svg";
import linkedin from "../images/linkedin.svg";
import online from "../images/online.svg";
import axios, { baseUrl } from "../../../../utils/axios";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileDetail = ({ seeker }) => {
  const history = useHistory();
  const [profile, setProfile] = useState(null);
  const [followingStatus, setFollowingStatus] = useState(
    profile?.following_status
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/api/personalInfo/getSeekerById/${seeker?.uuid}`
      );
      setProfile(res.data);
      setLoading(false);
    };
    apiCall();
  }, [seeker]);

  useEffect(() => {
    setFollowingStatus(profile?.following_status);
  }, [profile?.following_status]);

  const follow = async (seekerId) => {
    setFollowingStatus("1");
    axios
      .post(`${baseUrl}/api/follow/postFollowSeeker`, {
        following: seekerId,
      })
      .then((res) => {
        console.log(res);
        // setFollowingStatus("1");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unFollow = async (seekerId) => {
    setFollowingStatus("0");
    axios
      .delete(`${baseUrl}/api/follow/seekerUnfollow/${seekerId}`)
      .then((res) => {
        console.log(res);
        // setFollowingStatus("0");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Card style={{ borderRadius: "12px" }}>
        {/* <MyBoxStyle> */}
        {profile ? (
          <>
            <ProfileStyle>
              <img
                src={profile?.profile_URL ? profile.profile_URL : profileImg}
                alt=""
                width="70px"
                height="110px"
              />
              {/* <img
                src={online}
                alt
                width="20px"
                height="20px"
                style={{ marginTop: "25%", marginLeft: "-13%" }}
              /> */}
              <DetailStyle>
                <NameHeading style={{ fontWeight: "bold" }}>
                  {profile.first_name} {profile.last_name}
                </NameHeading>

                <DetailHeadingStyle>
                  {profile.title ? profile.title : "No title added"}
                </DetailHeadingStyle>

                {/* <DetailHeadingStyle>Connected 1 Month Ago</DetailHeadingStyle> */}
              </DetailStyle>
            </ProfileStyle>
            <ButtonStyle>
              <Link to="/chatbox">
                <ButtonStyling
                  type="primary"
                  // style={{ height: "40px" }}
                >
                  Message
                </ButtonStyling>
              </Link>
              {followingStatus == "0" ? (
                <ButtonStyling
                  type="primary"
                  ghost
                  style={{ marginLeft: "5%" }}
                  onClick={() => follow(profile.uuid)}
                >
                  Follow
                </ButtonStyling>
              ) : (
                <ButtonStyling
                  type="primary"
                  ghost
                  style={{ marginLeft: "5%" }}
                  onClick={() => unFollow(profile.uuid)}
                >
                  Unfollow
                </ButtonStyling>
              )}
              <InfoImageStyling
                src={share}
                alt=""
                style={{ marginTop: "0%", display: "none" }}
              />
            </ButtonStyle>

            <ContactHeading>Contact Info</ContactHeading>

            {/* <Info>
              <InfoImageStyling src={phone} alt="" />
              <InfoDetail>
                <p
                  style={{
                    fontFamily: "Montserrat-Regular",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {profile.phone ? profile.phone : "No phone number added"}
                </p>
              </InfoDetail>
            </Info> */}
            <Info>
              <InfoImageStyling src={phone} alt="" />
              <InfoDetail>
                <p
                  style={{
                    fontFamily: "Montserrat-Regular",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {profile.skype_id ? profile.skype_id : "No Skype Id added"}
                </p>
              </InfoDetail>
            </Info>
            {/* <Info>
              <InfoImageStyling src={email} alt="" />
              <InfoDetail>
                <p
                  style={{
                    fontFamily: "Montserrat-Regular",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {profile.email}
                </p>
              </InfoDetail>
            </Info> */}
            <Info>
              <InfoImageStyling src={location} alt="" />
              <InfoDetail>
                <p
                  style={{
                    fontFamily: "Montserrat-Regular",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {profile.state ? profile.state : "No state"},
                  {profile.country ? profile.country : " No country"}
                </p>
              </InfoDetail>
            </Info>

            <ContactHeading>Portfolio </ContactHeading>
            <div style={{ marginBottom: "2%", marginTop: "5%" }}>
              <span>
                {/* <SocialIcons>
                  <img src={fb} alt="" />
                </SocialIcons> */}
                <a
                  // href={profile.linked_In_URL}
                  onClick={() => {
                    if (profile.linked_In_URL) {
                      window.location.replace(
                        `https://${profile.linked_In_URL}`
                      );
                    } else {
                      alert("No LinkedIn profile added");
                    }
                  }}
                >
                  <SocialIcons>
                    <img src={linkedin} alt="" />
                  </SocialIcons>
                </a>
                {/* <SocialIcons>
                  <img src={be} alt="" />
                </SocialIcons> */}
                <a
                  // href={profile.github_URL}
                  onClick={() => {
                    if (profile.github_URL) {
                      window.location.replace(`https://${profile.github_URL}`);
                    } else {
                      alert("No Github profile added");
                    }
                  }}
                >
                  <SocialIcons>
                    <img src={github} alt="" />
                  </SocialIcons>
                </a>
              </span>
            </div>
          </>
        ) : null}
      </Card>
    </>
  );
};

export default ProfileDetail;
