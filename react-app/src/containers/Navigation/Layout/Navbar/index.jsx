import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../../../images/Logo.png";
import CustomNavLink from "./CustomNavLink";
import {
  StyledNavbar,
  // StyledForm,
  NavbarContentDiv,
  // StyledInput,
} from "../styles/navbar.styles";
import urls from "../../constants";
// import { SearchOutlined } from '@ant-design/icons';
import UserAvatar from "./UserAvatar";
import dashboardIcon from "../../../../images/recruiterDashboard/dashboardIcon.svg";
import dashboardColorIcon from "../../../../images/recruiterDashboard/dashboardColorIcon.svg";
import jobsColorIcon from "../../../../images/recruiterDashboard/jobs.svg";
import jobsIcon from "../../../../images/recruiterDashboard/jobsWhite.svg";
import candidateColorIcon from "../../../../images/recruiterDashboard/candidates.svg";
import candidateIcon from "../../../../images/recruiterDashboard/candidatesWhite.svg";
import scheduledIcon from "../../../../images/recruiterDashboard/scheduled.svg";
import scheduledColorIcon from "../../../../images/recruiterDashboard/scheduledColor.svg";
import companiesColorIcon from "../../../../images/recruiterDashboard/companiesColor.svg";
import companiesIcon from "../../../../images/recruiterDashboard/companies.svg";
import { Link } from "react-router-dom";
// import settingsIcon from '../../../../images/recruiterDashboard/settings.svg';
// import reportsIcon from '../../../../images/recruiterDashboard/reports.svg';

const Main = ({ history }) => {
  const [activeLink, setActiveLink] = useState(history.location.pathname);

  useEffect(() => {
    console.log("menu", history.location.pathname);
    setActiveLink(history.location.pathname);
  }, [history.location.pathname]);

  const getActiveBoolean = (current) => activeLink === current;

  return (
    <StyledNavbar bg="primary" expand="lg" activeKey="/recruiter_dashboard">
      <Navbar.Brand to={urls.dashboard} as={Link}>
        <img src={logo} width="75" alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="">
        <NavbarContentDiv>
          <Nav
            className="mr-auto"
            style={{
              marginLeft: "2rem",
              // border: "1px solid black",
              width: "70%",
            }}
            activeKey={activeLink}
          >
            <CustomNavLink
              href={urls.dashboard}
              text="Dashboard"
              icon={dashboardIcon}
              colorIcon={dashboardColorIcon}
              active={getActiveBoolean(urls.dashboard)}
              setActiveLink={setActiveLink}
            />
            <CustomNavLink
              href={urls.jobs}
              text="Jobs"
              icon={jobsIcon}
              colorIcon={jobsColorIcon}
              active={getActiveBoolean(urls.jobs)}
              setActiveLink={setActiveLink}
            />
            <CustomNavLink
              href={urls.candidates}
              text="Candidates"
              icon={candidateIcon}
              colorIcon={candidateColorIcon}
              active={getActiveBoolean(urls.candidates)}
              setActiveLink={setActiveLink}
            />
            <CustomNavLink
              href={urls.schedules}
              text="Schedules"
              icon={scheduledIcon}
              colorIcon={scheduledColorIcon}
              active={getActiveBoolean(urls.schedules)}
              setActiveLink={setActiveLink}
            />
            <CustomNavLink
              href={urls.jobbank}
              text="Job Bank"
              icon={jobsIcon}
              colorIcon={jobsColorIcon}
              active={getActiveBoolean(urls.jobbank)}
              setActiveLink={setActiveLink}
            />
            {/* <CustomNavLink
              href={urls.candidates}
              text="Companies"
              icon={companiesIcon}
              colorIcon={companiesColorIcon}
              active={getActiveBoolean(urls.candidates)}
              setActiveLink={setActiveLink}
            /> */}
            {/* <CustomNavLink
              href={urls.settings}
              text="Settings"
              icon={settingsIcon}
              disabled
              active={getActiveBoolean(urls.settings)}
            />
            <CustomNavLink
              href={urls.reports}
              text="Reports"
              icon={reportsIcon}
              disabled
              active={getActiveBoolean(urls.reports)}
            /> */}
          </Nav>

          {/* <StyledForm inline>
            <SearchOutlined style={{ color: 'white', opacity: '0.6' }} />
            <StyledInput
              disabled
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
          </StyledForm> */}

          <UserAvatar text="Recruiter" />
        </NavbarContentDiv>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};

export default Main;
