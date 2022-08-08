import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Fragment } from "react";
import {
  CellText,
  OptionsText,
  ResponsiveViewHeading,
} from "../../../../components/Table";
import profileIcon from "../../../../images/jobs/profile.svg";

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
      title: "Candidate Name",
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
      title: "Source Board",
      dataIndex: "email",
      key: "email",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
    },
    {
      title: "Applied Date",
      dataIndex: "interviewDate",
      key: "interviewDate",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("interviewDate"),
      sorter: (a, b) => a.interviewDate.length - b.interviewDate.length,
      sortOrder: sortedInfo.columnKey === "interviewDate" && sortedInfo.order,
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
      title: "Status",
      dataIndex: "job_title",
      key: "job_title",
      render: renderText,
      responsive: ["sm"],
      // ...getColumnSearchProps("job_title"),
      sorter: (a, b) => a.job_title.length - b.job_title.length,
      sortOrder: sortedInfo.columnKey === "job_title" && sortedInfo.order,
    },
    {
      title: "Score",
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
        !expired && (
          <span>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <OptionsText onClick={() => showModal(record)}>
                    Action
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
