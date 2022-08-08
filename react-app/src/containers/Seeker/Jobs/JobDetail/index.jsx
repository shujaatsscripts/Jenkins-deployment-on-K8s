import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "antd";
import logo from "../../../../images/recruiterDashboard/Job.svg";
import calender from "../images/calender.svg";
import fulltime from "../images/fulltime.svg";
import location from "../images/location.svg";
import profile from "../images/profile.svg";
import save from "../images/save.svg";
import share from "../images/share.svg";
import axios, { baseUrl } from "../../../../utils/axios";
import { Link, useHistory } from "react-router-dom";
import {
  CardStyling,
  CompanyLogo,
  JobTitle,
  SalaryStyle,
  CompanyName,
  Icons,
  SmallIcons,
  SmallIconsSpanStyle,
  BlockStyle,
  BlockleftSideStyle,
  MiddleBlockStyle,
  BlockRightSideStyle,
  BlockHeading,
  MainHeadingStyle,
  MainHeadingFontStyle,
  AboutDetail,
  CheckBoxStyle,
  TableStyle,
  InfoImageStyling,
  StyledPara,
  SmallIconswithStyle,
} from "./JobDetail.styles.js";
import { Checkbox } from "antd";

const JobDetail = ({ job }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const apiCall = async () => {
      if (job !== null) {
        setLoading(true);
        const events = await axios.get(
          `${baseUrl}/api/job-description/jobs/getSeekerJobById/${job?.uuid}`
        );
        console.log("hi");
        console.log(events.data);
        setProfile(events.data);
        setLoading(false);
      }
    };
    apiCall();
  }, [job]);

  const handleChange = (e) => {
    let isChecked = e.target.value;
    console.log(isChecked);
  };
  return (
    <Card style={{ borderRadius: "15px" }}>
      {profile !== null ? (
        <>
          {/* <CardStyling> */}
          <Row style={{ padding: "15px" }}>
            <Col span={5}>
              <CompanyLogo src={logo} alt="" />
            </Col>
            <Col span={11} style={{ marginTop: "2%" }}>
              <JobTitle>{profile?.jobTitle}</JobTitle>
              <CompanyName>Nets-International</CompanyName>
            </Col>
            <Col span={8}>
              <SalaryStyle style={{ textAlign: "right", marginTop: "2%" }}>
                {profile?.salary} {profile?.currency}
                <span style={{ color: "rgba(0,0,0,0.5)", fontSize: "12px" }}>
                  /month
                </span>{" "}
              </SalaryStyle>
              {/* <span style={{ color: "rgba(0,0,0,0.5", fontSize: "18px" }}>
            &nbsp;/month
          </span> */}
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <span>
                <InfoImageStyling
                  src={save}
                  alt=""
                  style={{ display: "none" }}
                />
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>
                <InfoImageStyling
                  src={share}
                  alt=""
                  style={{ display: "none" }}
                />
              </span>
            </Col>
          </Row>
          <Row style={{ padding: "5px" }}>
            <Col span={24}>
              <SmallIconswithStyle>
                <SmallIcons src={location} alt="" />
                &nbsp;&nbsp;&nbsp; {profile?.location}
              </SmallIconswithStyle>
            </Col>
            <Col span={12}>
              <SmallIconsSpanStyle>
                <SmallIcons src={calender} alt="" /> &nbsp; open: &nbsp; &nbsp;
                {profile?.openingDate.split("T")[0]}
              </SmallIconsSpanStyle>
            </Col>
            <Col span={12}>
              <SmallIconsSpanStyle>
                <SmallIcons src={calender} alt="" /> &nbsp; close: &nbsp; &nbsp;
                {profile?.closingDate.split("T")[0]}
              </SmallIconsSpanStyle>
            </Col>
          </Row>

          <div style={{ height: "5%", width: "100%" }}>
            <BlockStyle>
              <BlockleftSideStyle>
                <BlockHeading>Type</BlockHeading>
                <p style={{ fontSize: "12px" }}>{profile?.jobType}</p>
              </BlockleftSideStyle>
              <MiddleBlockStyle>
                <BlockHeading>Job Level</BlockHeading>
                <p style={{ fontSize: "12px" }}>{profile?.level}</p>
              </MiddleBlockStyle>
              <MiddleBlockStyle>
                <BlockHeading>Experience</BlockHeading>
                <p style={{ fontSize: "12px" }}>{profile?.experience} Years</p>
              </MiddleBlockStyle>
              <BlockRightSideStyle>
                <BlockHeading>Positions</BlockHeading>
                <p style={{ fontSize: "12px" }}>{profile?.positions}</p>
              </BlockRightSideStyle>
            </BlockStyle>
          </div>

          {/* <MainHeadingStyle>
            <MainHeadingFontStyle>About Company </MainHeadingFontStyle>
            <AboutDetail
              style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
            >
              So what are these strange lights in the sky? Are they aliens
              invading from Mars? Are the. So what are these strange lights in
              the sky? Are they aliens invading from Mars? Are the.
            </AboutDetail>
          </MainHeadingStyle> */}
          <MainHeadingStyle>
            <MainHeadingFontStyle>Job Description</MainHeadingFontStyle>
            {profile?.detailedJobDescription.split(".").map((bullet) => (
              <StyledPara>{bullet}</StyledPara>
            ))}
            {/* <StyledPara>{profile.detailedJobDescription}</StyledPara> */}
          </MainHeadingStyle>
          <div style={{ textAlign: "right" }}>
            <a
              href={profile?.jobLink}
              // to="/jobs/apply/f9ffa3dc-d15a-4ac4-ba25-38d9d55051cd"
              // target="_blank"
              // onClick={() =>
              //   history.push(profile?.jobLink.split("portal.3cix.com")[1])
              // }
              style={{
                backgroundColor: "#1a77f2",
                padding: "5px 20px 7px 20px",
                borderRadius: "5px",
                color: "white",
                fontWeight: "600",
                textDecoration: "none",
                // cursor: "pointer",
              }}
            >
              Apply
            </a>
          </div>
        </>
      ) : null}
      {/* </CardStyling> */}
    </Card>
  );
};

export default JobDetail;
