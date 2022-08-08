import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import avatar from "../../../../images/avatarGeneral.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { StyledImg, StyledAnchor, StyledDiv } from "../styles/avatar.styles";
import ProfilePic from "../../../../images/recruiterDashboard/Male.svg";
import notification from "../../../../images/recruiterDashboard/navNotification.svg";
import logout from "../../../../images/recruiterDashboard/logout.svg";

const UserAvatar = ({ text }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  // const [title, setTitle] = useState("");

  useEffect(() => {
    let name = localStorage.getItem("bcix_userName");
    // let title = localStorage.getItem("job_seeker_title");
    setName(name);
    // setTitle(title);
  }, []);

  return (
    <StyledDiv style={{ display: "flex" }}>
      {/* <Dropdown */}
      {/* overlay={
          <Menu>
            <Menu.Item
              key="0"
              onClick={() => {
                dispatch({ type: "auth/auth_logout" });
                history.push("/login");
              }}
            >
              Logout
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      > */}
      {/* <StyledAnchor href="" onClick={(e) => e.preventDefault()}> */}
      <div
        style={{
          display: "flex",
          // border: "1px solid black",
          height: "40px",
        }}
      >
        <StyledImg src={ProfilePic} alt="avatar" />
        <div
          style={{
            // border: "1px solid black",
            padding: "5px",
            fontSize: "12px",
            fontWeight: "bolder",
            fontFamily: "Montserrat",
          }}
        >
          Recruiter
          <p
            style={{
              // border: "1px solid black",
              fontSize: "10px",
              fontWeight: "normal",
              color: "grey",
            }}
          >
            {name}
          </p>
        </div>{" "}
        {/* <DownOutlined /> */}
      </div>
      {/* </StyledAnchor> */}
      {/* </Dropdown> */}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {/* <StyledImg
        style={{ width: "20px" }}
        src={notification}
        alt="notification"
      />
      &nbsp;&nbsp;&nbsp; */}
      <Tooltip title="Logout">
        <a style={{ paddingTop: "5px" }}>
          <StyledImg
            style={{ width: "25px", marginRight: "0px" }}
            src={logout}
            alt="logout"
            onClick={() => {
              dispatch({ type: "auth/auth_logout" });
              history.push("/login");
            }}
          />
        </a>
      </Tooltip>
    </StyledDiv>
  );
};

export default UserAvatar;
