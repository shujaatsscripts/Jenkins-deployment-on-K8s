import React, { useEffect, useState } from "react";
import "./conversation.css";
import { Card } from "antd";
import axios, { baseUrl } from "../../../utils/axios";
import styled from "styled-components";

const Conversation = ({ conversation, currentUser, currentChat }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    console.log(friendId);
    const getUser = async () => {
      try {
        const res = await axios(
          baseUrl + "/api/personalInfo/getUsers?id=" + friendId
        );
        setUser(res.data);
        // console.log("getUsers", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  console.log("a", user);

  return (
    // <div className="conversation">
    //   <img
    //     className="conversationImg"
    //     src={
    //       user?.profilePicture
    //         ? PF + user.profilePicture
    //         : PF + "person/noAvatar.png"
    //     }
    //     alt=""
    //   />
    //   <span className="conversationName">{user?.username}</span>
    // </div>
    <div>
      <StyledDiv
        active={currentChat?.id === conversation?.id}
        className="conversation"
      >
        <img
          className="conversationImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          // src={
          //   user[0]?.profilePicture
          //     ? user[0].profilePicture
          //     : "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          // }
          alt=""
        />
        {/* <span className="conversationName">
          {user?.first_name} {user?.last_name}
        </span> */}
        <div>
          {user.map((data) => (
            <span className="conversationName">
              {data?.first_name} {data?.last_name}
            </span>
          ))}
        </div>
      </StyledDiv>
    </div>
  );
};

const StyledDiv = styled.div`
  box-shadow: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.1) 0px 1px 3px" : ""};
  background-color: ${(props) => (props.active ? "#f1fcff" : "transparent")};
  border-radius: 5px;
`;

export default Conversation;
