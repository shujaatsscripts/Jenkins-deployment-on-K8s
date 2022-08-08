import React, { useState, useEffect } from "react";
import { Modal, Button, Comment, Tooltip, List } from "antd";
// import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
// import moment from "moment";
import axios, { baseUrl } from "../../utils/axios";
import styled from "styled-components";
import ApplicantIcon from "../../images/recruiterDashboard/Male.svg";
import PostPicture from "../../images/seekerDashboard/post.svg";
import Heart from "../../images/seekerDashboard/heart.svg";
import Like from "../../images/seekerDashboard/like.svg";
import Dislike from "../../images/seekerDashboard/disLike.svg";
import Comments from "../../images/seekerDashboard/comment.svg";
import Share from "../../images/seekerDashboard/share.svg";
import MyComment from "./Comment.jsx";

function Header({ post }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        // marginBottom: "20px",
        // border: "1px solid black",
        padding: "15px 5% 5px 5%",
      }}
    >
      <img
        src={post?.profileurl ? post.profileurl : ApplicantIcon}
        alt={"icon"}
        style={{
          width: "10%",
          borderRadius: "100px",
        }}
      />
      &nbsp;&nbsp;&nbsp;
      <div
        style={{
          //   border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "17px",
              fontWeight: "600",
              //   border: "1px solid black",
              color: "black",
              //   fontFamily: "Monserrat-Regular",
            }}
          >
            {post.firstName} {post.lastName}
          </span>
          <br />
          <span
            style={{
              fontSize: "14px",
              color: "#BBBCBE",
              fontWeight: "500",
              // fontFamily: "Montserrat",
            }}
          >
            {post.title}
            {post.title ? " | " : ""}
            {post.createdAt.split("T")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

function Index({ post }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [liked, setLiked] = useState(post.case);

  useEffect(() => {
    setLikeCount(post.likes);
    setCommentCount(post.commentCount);
  }, [post]);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    setLiked("1");
    axios.post(`${baseUrl}/api/likePosts/likePost`, { postID: post.uuid });
  };

  const handleDislike = () => {
    setLikeCount((prev) => prev - 1);
    setLiked("0");
    axios.post(`${baseUrl}/api/likePosts/disLike`, { postID: post.uuid });
  };

  const handleComment = () => {
    setCommentCount((prev) => parseInt(prev) + 1);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <StyledBox style={{ color: "black", marginBottom: "20px" }}>
      <Header post={post} />
      <div
        style={{
          padding: "5px 5% 10px 5%",
          //   border: "1px solid black",
          fontSize: "14px",
          fontWeight: "450",
        }}
      >
        {post.description}
      </div>

      {post.imageURL ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "5px 0px",
            // border: "1px solid black",
          }}
        >
          <img
            // src={PostPicture}
            // src="https://3cixstorage.blob.core.windows.net/resumes/resumes%2Fce032498-16c8-40f2-a4e1-0ac728085be7.jpeg"
            src={post.imageURL}
            alt={"post"}
            style={{
              // objectFit: "cover",
              maxWidth: "100%",
              maxHeight: "250px",
              display: "block",
              // border: "1px solid black",
            }}
          />
        </div>
      ) : null}
      <div
        style={{
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          height: "50px",
          borderTop: "1px solid rgba(0, 0, 0, 0.07)",
          padding: "5px 5% 5px 5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // border: "1px solid black",
            fontSize: "14px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <img
                src={Heart}
                alt={"icon"}
                style={{
                  width: "20px",
                }}
              />
              &nbsp;{likeCount}
            </div>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {commentCount}&nbsp;
            {commentCount > 1 ? "Comments" : "Comment"}
          </div>
          <div style={{ display: "flex" }}>
            {liked === "0" ? (
              <div style={{ cursor: "pointer" }} onClick={handleLike}>
                <img
                  src={Like}
                  alt={"icon"}
                  style={{
                    width: "20px",
                  }}
                />
                &nbsp; Like &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            ) : (
              <div style={{ cursor: "pointer" }} onClick={handleDislike}>
                <img
                  src={Dislike}
                  alt={"icon"}
                  style={{
                    width: "20px",
                  }}
                />
                &nbsp; Dislike &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            )}
            <div onClick={showModal} style={{ cursor: "pointer" }}>
              <img
                src={Comments}
                alt={"icon"}
                style={{
                  width: "20px",
                }}
              />
              &nbsp; Comment &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <Modal
              title="Comments"
              visible={isModalVisible}
              footer={null}
              // onOk={handleOk}
              onCancel={handleCancel}
            >
              <MyComment
                post={post}
                handleComment={handleComment}
                commentCount={commentCount}
              />
            </Modal>
            <div style={{ display: "none" }}>
              <img
                src={Share}
                alt={"icon"}
                style={{
                  width: "20px",
                }}
              />
              &nbsp; Share
            </div>
          </div>
        </div>
      </div>
    </StyledBox>
  );
}

export default Index;

const StyledBox = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  align-items: center;
  /* height: 330px; */
  width: 100%;
`;
