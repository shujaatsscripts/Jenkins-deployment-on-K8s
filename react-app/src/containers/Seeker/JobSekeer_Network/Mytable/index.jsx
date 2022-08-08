import React, { useState } from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import { Table, Column } from "antd";
import profileImg from "../../../../images/recruiterDashboard/Male.svg";
import setting from "../images/dots.svg";
import {
  HeadingStyle,
  SpanStyle,
  BoxStyle,
  TableStyle,
} from "./MyTable.styles.js";

export default function App({ data, setSeeker }) {
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

  const dataSource = [
    {
      key: "1",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "2",
      username: "Hassaan Bhia",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "3",
      username: "Raza",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "4",
      username: "Hassaan Bhia",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "5",
      username: "Hassaan Bhia",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "6",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "7",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "8",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "9",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "10",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "11",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
  ];

  const columns = [
    {
      title: "",
      width: "3%",
      dataIndex: `${profileImg}`,
      render: (text, record) => (
        <img
          src={record?.profile_URL ? record.profile_URL : profileImg}
          width="40px"
          height="60px"
        />
      ),
    },
    {
      title: "",
      dataIndex: "first_name",
      key: "first_name",
      // width: "25%",
      render(text, record) {
        return (
          <div>
            <span>
              <SpanStyle style={{ textAlign: "left" }}>
                {record.first_name} {record.last_name}
              </SpanStyle>
              {/* <HeadingStyle style={{ textAlign: "left" }}>
                {record.job_title}
              </HeadingStyle> */}
            </span>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "title",
      key: "title",
      render(text, record) {
        return <HeadingStyle>{text ? text : "No Title"}</HeadingStyle>;
      },
    },
    {
      title: "",
      dataIndex: "email",
      key: "email",
      render(text, record) {
        return <HeadingStyle>{text ? text : "No Email"}</HeadingStyle>;
      },
    },
    {
      title: "",
      dataIndex: "country",
      key: "country",
      render(text, record) {
        return <HeadingStyle>{text ? text : "No Country"}</HeadingStyle>;
      },
    },
    {
      title: "",
      // dataIndex: "country",
      // key: "country",
      render(text, record) {
        return (
          <Button
            style={{
              borderRadius: "5px",
              fontSize: "10px",
              // marginTop: "-35px",
            }}
            onClick={() => setSeeker(record)}
          >
            Show
          </Button>
        );
      },
    },
    // {
    //   title: "",
    //   width: "4%",

    //   dataIndex: `${profileImg}`,
    //   render: () => (
    //     <img
    //       onClick={showModal}
    //       src={`${setting}`}
    //       style={{
    //         alignContent: "center",
    //         padding: "15px",
    //         marginBottom: "15px",
    //         cursor: "pointer",
    //       }}
    //     />
    //   ),
    // },
  ];
  return (
    <div style={{ marginTop: "10px" }}>
      <TableStyle
        spacing={true}
        bordered={false}
        showHeader={false}
        dataSource={data}
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
    </div>
  );
}
