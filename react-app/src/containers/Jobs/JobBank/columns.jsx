import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Fragment } from "react";
import {
  CellText,
  OptionsText,
  ResponsiveViewHeading,
} from "../../../components/Table";
import profileIcon from "../../../images/jobs/profile.svg";
import preview from "../../../images/eye.png";

const renderText = (text) => <CellText>{text < 0 ? 0 : text}</CellText>;

const columns = (showModal, expired, sortedInfo, getColumnSearchProps) => {
  return [
    {
      title: () => (
        <Fragment>
          <ResponsiveViewHeading> Name</ResponsiveViewHeading>&nbsp;
          <br />
          <ResponsiveViewHeading> Email</ResponsiveViewHeading>&nbsp;
          <br />
          <ResponsiveViewHeading> Contact</ResponsiveViewHeading>&nbsp;
          <br />
          <ResponsiveViewHeading>Location</ResponsiveViewHeading>
          &nbsp;
          {/* <br />
          <ResponsiveViewHeading> Resume</ResponsiveViewHeading>&nbsp; */}
          <br />
          <ResponsiveViewHeading> Occupation</ResponsiveViewHeading>&nbsp;
        </Fragment>
      ),
      render: (record) => (
        <Fragment>
          <ResponsiveViewHeading> Name:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.name}</CellText>
          <br />
          <ResponsiveViewHeading> Email:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.email}</CellText>
          <br />
          <ResponsiveViewHeading> Contact:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.contact}</CellText>
          <br />
          <ResponsiveViewHeading> Location:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.location}</CellText>
          <br />
          {/* <ResponsiveViewHeading> Resume:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.resume}</CellText>
          <br /> */}
          <ResponsiveViewHeading> Occupation:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.occupation}</CellText>
        </Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
      // ...getColumnSearchProps("name"),
      render: (record) => (
        <div>
          <img
            src={profileIcon}
            alt={"icon"}
            style={{
              width: "10%",
            }}
          />
          &nbsp;&nbsp;&nbsp;
          {record}
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("interviewDate"),
      sorter: (a, b) => a.contact.length - b.contact.length,
      sortOrder: sortedInfo.columnKey === "contact" && sortedInfo.order,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("job_title"),
      sorter: (a, b) => a.location.length - b.location.length,
      sortOrder: sortedInfo.columnKey === "location" && sortedInfo.order,
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("status"),
      sorter: (a, b) => a.occupation.length - b.occupation.length,
      sortOrder: sortedInfo.columnKey === "occupation" && sortedInfo.order,
    },
    {
      title: "View CV",
      // key: "Resume_URL",
      // dataIndex: "Resume_URL",
      render: (record) => (
        <CellText>
          <a href={record.resume} target="_blank" rel="noreferrer">
            <img src={preview} alt="preview" width="50" />
          </a>
        </CellText>
      ),
      responsive: ["sm"],
    },
  ];
};

export default columns;
