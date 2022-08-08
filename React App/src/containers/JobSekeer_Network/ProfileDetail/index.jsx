import React from "react";
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

import profileImg from "../images/myprofile.svg";
import share from "../images/sharevecter.svg";
import location from "../images/locationvector.svg";
import email from "../images/email.svg";
import phone from "../images/phone.svg";
import be from "../images/be.svg";
import fb from "../images/fb.svg";
import github from "../images/github.svg";
import linkedin from "../images/linkedin.svg";
import online from "../images/online.svg";
import { Button } from "antd";

const ProfileDetail = () => {
  return (
    <>
      <Card style={{ borderRadius: "12px" }}>
        {/* <MyBoxStyle> */}
        <ProfileStyle>
          <img src={profileImg} alt="" width="120px" height="120px" />
          <img
            src={online}
            alt
            width="20px"
            height="20px"
            style={{ marginTop: "25%", marginLeft: "-13%" }}
          />
          <DetailStyle>
            <NameHeading style={{ fontWeight: "bold" }}>
              Raza Raheem
            </NameHeading>

            <DetailHeadingStyle>Java Developer | Samsung</DetailHeadingStyle>

            <DetailHeadingStyle>Connected 1 Month Ago</DetailHeadingStyle>
          </DetailStyle>
        </ProfileStyle>
        <ButtonStyle>
          <ButtonStyling
            type="primary"
            // style={{ height: "40px" }}
          >
            Message
          </ButtonStyling>
          <ButtonStyling type="primary" ghost style={{ marginLeft: "5%" }}>
            Unfollow
          </ButtonStyling>
          <InfoImageStyling
            src={share}
            alt=""
            style={{ marginTop: "0%", display: "none" }}
          />
        </ButtonStyle>

        <ContactHeading>Contact Info</ContactHeading>

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
              (907) 555-0101
            </p>
          </InfoDetail>
        </Info>
        <Info>
          <InfoImageStyling src={email} alt="" />
          <InfoDetail>
            <p
              style={{
                fontFamily: "Montserrat-Regular",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              Nadeem.k@example.com
            </p>
          </InfoDetail>
        </Info>
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
              Seoul, South Korea
            </p>
          </InfoDetail>
        </Info>

        <ContactHeading>Portfolio </ContactHeading>
        <div style={{ marginBottom: "2%", marginTop: "5%" }}>
          <span>
            <SocialIcons>
              <img src={fb} alt="" />
            </SocialIcons>
            <SocialIcons>
              <img src={linkedin} alt="" />
            </SocialIcons>
            <SocialIcons>
              <img src={be} alt="" />
            </SocialIcons>
            <SocialIcons>
              <img src={github} alt="" />
            </SocialIcons>
          </span>
        </div>
        {/* </MyBoxStyle> */}
      </Card>
    </>
  );
};

export default ProfileDetail;
