import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import ProfilePic from "../../images/recruiterDashboard/profilePic.svg";
import EventIcon from "../../images/recruiterDashboard/Event.svg";
import { Upload } from "antd";
import { Button, Input, message } from "antd";
import { EditOutlined, CalendarOutlined } from "@ant-design/icons";
import axios, { baseUrl } from "../../utils/axios";
import { getFileExtension } from "../../utils/index";

function SuggestionCard({ data }) {
  return (
    <div
      style={{
        // backgroundColor,
        // borderBottom: "2px solid #f3f6ef",
        width: "80%",
        display: "flex",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        // flexDirection: "column",
        // justifyContent: "center",
        // textAlign: "center",
        // height: "40%",
        marginBottom: "20px",
        // border: "1px solid black",
      }}
    >
      <img
        src={EventIcon}
        alt={"icon"}
        style={{
          // float: "top",
          // border: "1px solid black",
          width: "20%",
        }}
      />
      &nbsp;&nbsp;&nbsp;
      <div style={{}}>
        <span style={{ fontSize: "15px", fontWeight: "bolder" }}>
          {data.name}
        </span>
        <br />
        <div
          style={{
            display: "flex",
            marginTop: "5px",
            fontSize: "11px",
            color: "grey",
            fontFamily: "Montserrat",
            // border: "1px solid black",
          }}
        >
          <CalendarOutlined style={{ marginTop: "0px", fontSize: "15px" }} />
          <span style={{ fontWeight: "500", color: "black" }}>
            &nbsp;&nbsp;&nbsp;{data.date}
          </span>
        </div>
      </div>
    </div>
  );
}

const validFileTypesForResume = ["jpeg", "png", "jpg"];
let postFileName = "";
function Index({ posts, setPosts }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [fileList, setFileList] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [file, setFile] = useState(null);
  const [profileURL, setProfileURL] = useState("");

  console.log(text);

  useEffect(() => {
    let profileURL = localStorage.getItem("bcix_profileURL");
    setProfileURL(profileURL);
    const apiCall = async () => {
      setLoading(true);
      axios.get(`${baseUrl}/api/event/getEventsForHome`).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    };
    apiCall();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const validateFiles = (list) => {
    // If more than 1 files are uploaded
    console.log("file name", list);
    if (list.fileList.length > 1) {
      message.error("Only 1 file allowed");
      return false;
    }
    // if invalid file type is uploaded
    if (
      !validFileTypesForResume.includes(
        getFileExtension(list.file).toLowerCase()
      )
    ) {
      message.error("Invalid file type");
      return false;
    }
    return true;
  };

  const uploadFile = async (file) => {
    let singleFile = file.originFileObj;
    setFile(singleFile);
  };

  const handleFileDrop = (list) => {
    if (validateFiles(list)) {
      uploadFile(list.file);
      let temp = [];
      Array.from(list.fileList).forEach((el) => temp.push(el));
      setAttachment(temp[0]);
    }
  };

  const handleOk = async () => {
    let post = {
      description: text,
      imageURL: "",
    };
    setLoading(true);
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          `${baseUrl}/api/upload?type=images`,
          formData
        );
        setLoading(false);

        console.log("image url", res.data.data);
        post.imageURL = res.data.data;
        setFile(null);
      }

      await axios.post(`${baseUrl}/api/post/addPost`, post).then((res) => {
        let newPost = res.data;
        newPost.profileurl = profileURL;
        setPosts([newPost, ...posts]);
        setLoading(false);
        setIsModalVisible(false);
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    } finally {
      setLoading(false);
      // message.success("Uploaded successfully");
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };

  return (
    <>
      <div
        style={{
          marginBottom: "5%",
          alignItems: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          onClick={showModal}
          icon={<EditOutlined />}
          style={{
            width: "100%",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          Create New Post
        </Button>
        <Modal
          title="Let Community Know, What you are Thinking!"
          visible={isModalVisible}
          onOk={handleOk}
          okText="Share With Community"
          onCancel={handleCancel}
        >
          <h4 style={{ marginBottom: "3%" }}>Create Post</h4>
          <TextArea
            style={{ borderRadius: "15px", marginBottom: "3%" }}
            rows={4}
            placeholder="Enter the Text Here"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div>
            <Upload
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              file={attachment}
              onChange={handleFileDrop}
              // onPreview={onPreview}
              // handleFileDrop={handleFileDrop}
              // file={attachment}
              maxCount={1}
            >
              {fileList.length < 2 && "+ Upload"}
            </Upload>
          </div>
        </Modal>
      </div>
      <StyledBox>
        <StyledHeading>Events</StyledHeading>

        {data?.map((element) => (
          <SuggestionCard data={element} />
        ))}
      </StyledBox>
    </>
  );
}

export default Index;

const StyledBox = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeading = styled.div`
  margin: 15px 0 20px 0;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  width: 80%;
`;
