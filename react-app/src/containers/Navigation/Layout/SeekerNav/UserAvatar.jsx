import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import avatar from "../../../../images/avatarGeneral.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { StyledImg, StyledAnchor, StyledDiv } from "../styles/avatar.styles";
import ProfilePic from "../../../../images/recruiterDashboard/Male.svg";
import notification from "../../../../images/recruiterDashboard/navNotification.svg";
import logout from "../../../../images/recruiterDashboard/logout.svg";

const UserAvatar = ({ text }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [profileURLState, setProfileURL] = useState(null);
  const { profileURL } = useSelector((state) => state.auth);

  // const [title, setTitle] = useState("");

  useEffect(() => {
    let name = localStorage.getItem("bcix_userName");
    let profileURL = localStorage.getItem("bcix_profileURL");
    // let title = localStorage.getItem("job_seeker_title");
    console.log("profile url");
    console.log(profileURL);

    setName(name);
    if (profileURL === "null" || profileURL === "" || profileURL === null) {
      profileURL = null;
    } else setProfileURL(profileURL);

    // setTitle(title);
  }, [profileURL]);

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
        <StyledImg
          src={profileURLState ? profileURLState : ProfilePic}
          alt="avatar"
          style={{ borderRadius: "100px" }}
        />
        <div
          style={{
            // border: "1px solid black",
            padding: "5px",
            fontSize: "12px",
            fontWeight: "bolder",
            fontFamily: "Montserrat",
          }}
        >
          Job Seeker
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
