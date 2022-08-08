import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Fragment } from "react";
import {
  CellText,
  OptionsText,
  ResponsiveViewHeading,
} from "../../../../components/Table";
import profileIcon from "../../../../images/jobs/profile.svg";
import CandidateDetail from "../../../Shortlisted";

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
          <ResponsiveViewHeading> Interview Date</ResponsiveViewHeading>&nbsp;
          <br />
          <ResponsiveViewHeading>
            Interview Time (24h UTC)
          </ResponsiveViewHeading>
          &nbsp;
          <br />
          <ResponsiveViewHeading> Job Title</ResponsiveViewHeading>&nbsp;
          <br />
          <ResponsiveViewHeading> Status</ResponsiveViewHeading>&nbsp;
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
          <ResponsiveViewHeading> Interview Date:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.interviewDate}</CellText>
          <br />
          {/* <ResponsiveViewHeading>
            Interview Time (24h UTC):
          </ResponsiveViewHeading>
          &nbsp;
          <CellText>{record.interviewTime}</CellText> */}
          <br />
          <ResponsiveViewHeading> Job Title:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.job_title}</CellText>
          <br />
          <ResponsiveViewHeading> Status:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.status}</CellText>
          {!expired && (
            <span>
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu>
                    <OptionsText onClick={() => showModal(record)}>
                      Edit
                    </OptionsText>
                  </Menu>
                }
              >
                <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
              </Dropdown>
            </span>
          )}
        </Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "Name",
      dataIndex: "candidateName",
      key: "candidateName",
      responsive: ["sm"],
      // ...getColumnSearchProps("candidateName"),
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
      sorter: (a, b) => a.candidateName.length - b.candidateName.length,
      sortOrder: sortedInfo.columnKey === "candidateName" && sortedInfo.order,
    },
    {
      title: "Recruiter Email",
      dataIndex: "recruiterEmail",
      key: "recruiterEmail",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("recruiterEmail"),
      sorter: (a, b) => a.recruiterEmail.length - b.recruiterEmail.length,
      sortOrder: sortedInfo.columnKey === "recruiterEmail" && sortedInfo.order,
    },
    {
      title: "Interview Date",
      dataIndex: "scheduledInterviewDate",
      key: "scheduledInterviewDate",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("scheduledInterviewDate"),
      sorter: (a, b) =>
        a.scheduledInterviewDate.length - b.scheduledInterviewDate.length,
      sortOrder:
        sortedInfo.columnKey === "scheduledInterviewDate" && sortedInfo.order,
    },
    // {
    //   title: "Interview Time (24h UTC)",
    //   dataIndex: "interviewTime",
    //   key: "interviewTime",
    //   render: renderText,
    //   responsive: ["sm"],
    //   ...getColumnSearchProps("interviewTime"),
    //   sorter: (a, b) => a.interviewTime.length - b.interviewTime.length,
    //   sortOrder: sortedInfo.columnKey === "interviewTime" && sortedInfo.order,
    // },
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === "title" && sortedInfo.order,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status.length - b.status.length,
      sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
    },
    {
      title: "",
      render: (record) =>
        expired && (
          <span>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <OptionsText onClick={() => showModal(record)}>
                    Edit Status
                  </OptionsText>
                  <OptionsText>
                    <CandidateDetail record={record} />
                  </OptionsText>
                </Menu>
              }
            >
              <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
            </Dropdown>
          </span>
        ),
      responsive: ["sm"],
    },
  ];
};

export default columns;
