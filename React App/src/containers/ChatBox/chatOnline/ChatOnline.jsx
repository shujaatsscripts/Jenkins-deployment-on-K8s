import React from "react";
import { useEffect, useState } from "react";
import "./chatOnline.css";
import axios, { baseUrl } from "../../../utils/axios";

const ChatOnline = ({
  onlineUsers,
  currentId,
  setCurrentChat,
  setConversations,
}) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log("my id", currentId);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          baseUrl + "/api/personalInfo/getAllUsers/" + currentId
        );
        setFriends(res.data);
        console.log("online=>" + res.data);
        console.log("checking", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);

  useEffect(() => {
    let onlineUserIds = onlineUsers.map((o) => o.userId);
    setOnlineFriends(
      friends?.filter((f) => {
        return onlineUserIds.includes(f.user_id);
      })
    );
    console.log(">>> OUF");
    console.log(
      friends?.filter((f) => {
        return onlineUserIds.includes(f.user_id);
      })
    );
    console.log(onlineUsers);
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        baseUrl +
          `/api/conversation/getConversationById/${currentId}/${user.user_id}`
      );
      if (res.data === null) {
        addConversation(currentId, user.user_id);
      } else {
        setCurrentChat(res.data);
      }
      console.log("get Conv", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addConversation = async (senderId, receiverId) => {
    const userObject = {
      senderId,
      receiverId,
    };

    await axios
      .post(baseUrl + "/api/conversation/addConversation", userObject)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const res = await axios.get(
      baseUrl +
        `/api/conversation/getConversationById/${senderId}/${receiverId}`
    );
    setCurrentChat(res.data);
    setConversations((prev) => [res.data, ...prev]);
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            {/* <img
                className="chatOnlineImg"
                src={
                  o?.profilePicture
                    ? PF + o.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              /> */}
            <img
              className="chatOnlineImg"
              src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              //   src={
              //     user?.profilePicture
              //       ? PF + user.profilePicture
              //       : PF + "person/noAvatar.png"
              //   }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">
            {/* Raza */}
            {o?.first_name} {o?.last_name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
