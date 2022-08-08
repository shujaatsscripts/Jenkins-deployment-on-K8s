import React, { useState } from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import { Table, Column } from "antd";
import profileImg from "../images/myprofile.svg";
import setting from "../images/dots.svg";
import {
  HeadingStyle,
  SpanStyle,
  BoxStyle,
  TableStyle,
} from "./MyTable.styles.js";

export default function App({ dataSource }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "",
      width: "4%",
      dataIndex: `${profileImg}`,
      render: () => (
        <img
          src={`${profileImg}`}
          width="70px"
          height="70px"
          style={{ borderRadius: "100px" }}
        />
      ),
    },
    {
      title: "",
      dataIndex: "username",
      key: "username",
      render(text, record) {
        return (
          <div>
            <span>
              <SpanStyle style={{ textAlign: "left" }}>{text} </SpanStyle>
              <HeadingStyle style={{ textAlign: "left" }}>
                UI/UX Designer
              </HeadingStyle>
            </span>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "company_name",
      key: "company_name",
      render(text, record) {
        return <HeadingStyle>{text}</HeadingStyle>;
      },
    },
    {
      title: "",
      dataIndex: "country",
      key: "country",
      render(text, record) {
        return <HeadingStyle>{text}</HeadingStyle>;
      },
    },
    {
      title: "",
      width: "4%",

      dataIndex: `${profileImg}`,
      render: () => (
        <img
          onClick={showModal}
          src={`${setting}`}
          style={{
            alignContent: "center",
            padding: "15px",
            marginBottom: "15px",
            cursor: "pointer",
          }}
        />
      ),
    },
  ];
  return (
    <>
      <TableStyle
        spacing={true}
        bordered={false}
        showHeader={false}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{
          width: "100%",
          margin: "0px",
        }}
      ></TableStyle>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
