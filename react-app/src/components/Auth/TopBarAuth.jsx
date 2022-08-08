import React from "react";
import {
  TopBar,
  StyledIconContainer,
  StyledIconsColumn,
  StyledIconLabel,
} from "./index";
import { Col } from "antd";
import Icon from "../Icon";
import phoneIcon from "../../images/auth/phoneIcon.svg";
import messageIcon from "../../images/auth/messageIcon.svg";
import logo from "../../images/whiteLogo.svg";

const TopBarAuth = () => {
  return (
    <TopBar justify="space-between">
      <Col xs={24} sm={4}>
        <img src={logo} alt="logo" />
      </Col>
      <StyledIconsColumn xs={24} sm={6} lg={12}>
        {/* <StyledIconContainer>
          <Icon src={phoneIcon} />
          <StyledIconLabel>+1 234346353</StyledIconLabel>
        </StyledIconContainer>
        <StyledIconContainer>
          <Icon src={messageIcon} />
          <StyledIconLabel>info@gmail.com</StyledIconLabel>
        </StyledIconContainer> */}
      </StyledIconsColumn>
    </TopBar>
  );
};

export default TopBarAuth;
