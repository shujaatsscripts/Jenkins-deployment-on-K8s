import React, { useState, useEffect, useRef, useContext } from "react";
import "./messenger.css";
import Conversation from "../conversations/Conversation";
import ChatOnline from "../chatOnline/ChatOnline";
import Message from "../message/Message";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import send from "./images/send.svg";
import { io } from "socket.io-client";
import axios, { baseUrl } from "../../../utils/axios";
import { withRouter } from "react-router-dom";

let conversationsData = [];

const Messenger = ({ history }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  // const userId = "d2f6248b-6d8a-4752-b845-88b2486c7ac4";
  // console.log(userId);

  const userId = localStorage.getItem("bcix_userId");
  console.log("localUser Id", userId);
  const web = "api.3cix.com";
  useEffect(() => {
    socket.current = io(baseUrl);
    history.listen((location, action) => {
      // location is an object like window.location
      console.log(action, location.pathname, location.state);
      if (location.pathname !== "/chatbox") {
        console.log(location.pathname);
        socket.current.emit("disconnectUser");
      }
    });
    socket.current.on("getMessage", (data) => {
      console.log("get message");
      console.log(data);
      setArrivalMessage({
        senderID: data.senderId,
        message: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderID) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      console.log("online users");
      console.log(users);
      setOnlineUsers(
        // user.followings.filter((f) => users.some((u) => u.userId === f))/////////
        users.filter((u) => u.userId !== userId)
      );
    });
  }, [userId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          baseUrl + "/api/conversation/getConversation"
        );
        setConversations(res.data);
        conversationsData = res.data;
        console.log("All Conversation", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat !== null) {
        try {
          const res = await axios.get(
            baseUrl + "/api/message/getMessageById/" + currentChat?.uuid
          );
          setMessages(res.data);
          // console.log("message",res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  console.log("allMsg", messages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationID: currentChat.uuid,
      senderID: userId,
      message: newMessage,
    };

    const receiverId = currentChat.members.find((member) => member !== userId);
    console.log("reciever id", receiverId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        baseUrl + "/api/message/postMessage",
        message
      );
      setMessages([...messages, res.data]);
      console.log("myMsg", messages);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSeedInput = (e) => {
    console.log(conversationsData);
    let filteredSuggestions = conversationsData.filter(
      (d) =>
        JSON.stringify(d)
          .replace(" ", "")
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) > -1
    );
    setConversations(filteredSuggestions);
  };

  console.log(currentChat);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div
              style={{
                borderRadius: "15px",
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
                padding: "2%",
                margin: "4%",
              }}
              className="wrapHeight"
            >
              <div
                style={{
                  paddingTop: "10px",
                  color: "silver",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                Conversations
              </div>
              {/* <button onClick={postIDs}>post</button> */}
              {/* <Input
                type="text"
                className="chatMenuInput"
                style={{
                  // margin: "1% 5%",
                  // backgroundColor: "#F0EEEE47",
                  border: "none",
                  borderRadius: "5px",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
                }}
                placeholder=" search..."
                prefix={<SearchOutlined style={{ color: "grey" }} />}
                onChange={handleSeedInput}
              /> */}
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation
                    conversation={c}
                    currentUser={userId}
                    currentChat={currentChat}
                  />
                </div>
              ))}
              {/* {conversations.map((c) => ( */}
              {/* <div
              style={{
                borderRadius: "15px",
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
                padding: "2%",
                margin: "4%",
              }}
              className="wrapHeight"
              //   onClick={() => setCurrentChat(c)}
            > */}
            </div>
            {/* // ))} */}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.senderID === userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <Input
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    style={{
                      borderRadius: "5px",
                      border: "none",
                      height: "40px",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
                    }}
                  ></Input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div
            className="chatOnlineWrapper"
            style={{
              borderRadius: "15px",
              backgroundColor: "white",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px",
              padding: "2%",
              margin: "4%",
            }}
          >
            <div
              style={{
                paddingTop: "10px",
                color: "silver",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              Online Users
            </div>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={userId}
              setCurrentChat={setCurrentChat}
              setConversations={setConversations}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Messenger);
