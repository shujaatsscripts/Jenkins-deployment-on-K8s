import { Row, message, Table, Modal, Spin } from "antd";
import moment from "moment";
import React, { useState } from "react";
import axios, { baseUrl } from "../../../../utils/axios";
// import Columns from "./columns";
// import { StyledTable } from '../../../../components/Table';
import styled from "styled-components";
import { columnSearch } from "../../../../utils/columnSearch";
// import DispayJobs from "../index";
// import { getJobCards } from "../index";
import {
  CellText,
  OptionsText,
  ResponsiveViewHeading,
  StyledJD,
  DropDownIcon,
  StyledParagraph,
} from "../../../../components/Table";
import companyIcon from "../../../../images/recruiterDashboard/company.svg";
import icon from "../../../../images/recruiterDashboard/scheduledColor.svg";
import SalaryIcon from "../../../../images/recruiterDashboard/location.svg";
import candidateIcon from "../../../../images/recruiterDashboard/Male.svg";
import LocationIcon from "../../../../images/recruiterDashboard/salary.svg";
import { MoreOutlined } from "@ant-design/icons";

import { Col, Dropdown, Menu, Typography } from "antd";
import addResume from "../../../../images/dropdown/addResume.png";
import screening from "../../../../images/dropdown/screening.png";
import closeJobIcon from "../../../../images/dropdown/closeJob.png";
import linkIcon from "../../../../images/dropdown/link.png";
import { Link } from "react-router-dom";
import entryLevelIcon from "../../../../images/jobs/entry_level.svg";
import locationIcon from "../../../../images/jobs/location.svg";
import dateIcon from "../../../../images/jobs/date.svg";
import profileIcon from "../../../../images/jobs/profile.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Records = ({ jobData, history, expired }) => {
  const [loading, setLoading] = useState(false);
  let [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  let getColumnSearchProps = columnSearch(
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  );

  const data = jobData.map((item, index) => {
    let openingDate = `${moment(item.openingDate).format("MM")}/${moment(
      item.openingDate
    ).format("DD")}/${moment(item.openingDate).format("YYYY")} `;

    let closingDate = `${moment(item.closingDate).format("DD")}/${moment(
      item.closingDate
    ).format("MM")}/${moment(item.closingDate).format("YYYY")}`;

    let joiningDate = `${moment(item.joiningDate).format("DD")}/${moment(
      item.joiningDate
    ).format("MM")}/${moment(item.joiningDate).format("YYYY")}`;

    return {
      key: index,
      index,
      job_title: item.jobTitle,
      level: item.level,
      location: item.location ? item.location : "N/A",
      open_date: openingDate,
      close_date: closingDate,
      desc: item.detailedJobDescription,
      applicants: item.applicants,
      customResumes: item.customResumes,
      linkedinResumes: item.linkedinResumes.length,
      userID: item.userID,
      uuid: item.uuid,
      result: item.result,
      jobLink: item.jobLink,
      salary: item.salary,
      experience: item.experience,
      qualification: item.qualification,
      nationalityPreference: item.nationalityPreference,
      joiningDate,
      certification: item.certification,
      sponsorshipRequired: item.sponsorshipRequired,
      toolsHandlingExperience: item.toolsHandlingExperience,
      benefits: item.benefits,
      jobType: item.jobType,
      positions: item.positions,
      city: item.city,
      preferredGender: item.preferredGender,
      preferredTimezone: item.preferredTimezone,
      rate: item.rate,
      currency: item.currency,
      contractDuration: item.contractDuration,
      status: item.status,
      companyName: item.organization_name,
    };
  });

  const startScreening = async (record) => {
    console.log("record", record);
    let messageId;
    try {
      console.log("status", loading);
      setLoading(true);

      messageId = message.success(
        "Screening started successfully, please wait...",
        0
      );
      console.log("messageId", messageId);

      const result = await axios.post(
        `${baseUrl}/api/job-description/screening/${record.uuid}`
      );
      console.log("Job Description", result);
      if (result.status === 200) {
        messageId();
        let totalResumes = record.customResumes.length + record.linkedinResumes;
        history.push("/scanning_progress", {
          totalResumes,
          id: record.uuid,
        });
      } else {
        messageId();
        message.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err.response);
      messageId();
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const closeJob = async (id) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${baseUrl}/api/job-description/close-job/${id}`
      );
      if (res.status === 200) {
        message.success("Job successfully closed!");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        message.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    // setRowCount(extra.currentDataSource.length);
    // setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // sortedInfo = sortedInfo || {};

  const showModal = (data) => {
    setModalData(data);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible ? (
        <Modal
          title="Resumes"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ marginTop: "80px" }}
        >
          <Row>
            {modalData.map((item, index) => (
              <Col span={8}>
                <a href={item} style={{ display: "block" }}>
                  Resume No.{index}
                </a>
              </Col>
            ))}
          </Row>
        </Modal>
      ) : null}

      {data?.map((record, index) => (
        <Col xs={22} sm={23} md={6} key={index}>
          <StyledBox style={{ height: "auto" }}>
            <div
              style={{
                // backgroundColor,
                borderBottom: "2px solid #f3f6ef",
                width: "100%",
                display: "flex",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                // flexDirection: "column",
                // justifyContent: "center",
                // textAlign: "center",
                height: "40%",
                paddingLeft: "5%",
                padding: "3% 5%",
              }}
            >
              <img
                src={companyIcon}
                alt={"icon"}
                style={{
                  // float: "top",
                  // border: "1px solid black",
                  width: "15%",
                }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div
                style={{
                  paddingTop: "3%",
                  paddingBottom: "2%",
                  border: "0px solid black",
                  width: "90%",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: "bolder" }}>
                  {record.job_title}
                </span>
                <br />
                <span style={{ fontSize: "13px" }}>{record.companyName}</span>
              </div>
              {/* <DropDown
              history={history}
              startScreening={startScreening}
              closeJob={closeJob}
              expired={expired}
              record={job}
            /> */}
              {/* -------------------------------------------------------------------------------------- */}
              <div
                style={{
                  border: "0px solid black",
                  marginLeft: "0%",
                  paddingTop: "1%",
                }}
              >
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <OptionsText
                        onClick={() => history.push("/add_resume", { record })}
                      >
                        <DropDownIcon src={addResume} />
                        Add Resume
                      </OptionsText>
                      <OptionsText onClick={() => startScreening(record)}>
                        <DropDownIcon src={screening} />
                        Start Screening
                      </OptionsText>
                      {record.result?.length && (
                        <OptionsText
                          onClick={() =>
                            history.push("/screened_result", {
                              data: record.result,
                              jobDescriptionID: record.uuid,
                            })
                          }
                        >
                          <DropDownIcon src={screening} />
                          View Screened Results
                        </OptionsText>
                      )}
                      <OptionsText
                        onClick={() => {
                          message.success("Link Copied!");
                        }}
                      >
                        <>
                          <DropDownIcon src={linkIcon} />
                          <CopyToClipboard text={record?.jobLink}>
                            <span>Get Shareable Link</span>
                          </CopyToClipboard>
                        </>
                      </OptionsText>
                      <OptionsText onClick={() => closeJob(record.uuid)}>
                        <DropDownIcon src={closeJobIcon} />
                        Close Job
                      </OptionsText>
                    </Menu>
                  }
                >
                  <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
                </Dropdown>
              </div>
              {/* -------------------------------------------------------------------------------------- */}
            </div>
            <div
              style={{
                // border: "1px solid black",
                paddingLeft: "5%",
                marginTop: "15px",
              }}
            >
              <img
                src={candidateIcon}
                alt={"icon"}
                style={{
                  marginTop: "-5px",
                  // border: "1px solid black",
                  width: "9%",
                }}
              />
              &nbsp;&nbsp;
              <span
                style={{ fontSize: "13px", cursor: "pointer" }}
                onClick={() => showModal(record.customResumes)}
              >
                Total Candidates
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#e8f4f8",
                    color: "#1A77F2",
                    padding: "1px 5px 3px 5px",
                    fontWeight: "500",
                  }}
                >
                  {record.applicants}
                </span>
              </span>
            </div>
            <div
              style={{
                // border: "1px solid black",
                paddingLeft: "5%",
                marginTop: "15px",
              }}
            >
              <img
                src={SalaryIcon}
                alt={"icon"}
                style={{
                  marginTop: "-5px",
                  // border: "1px solid black",
                  // width: "100%",
                }}
              />
              &nbsp;&nbsp;
              <span style={{ fontSize: "13px" }}>
                Salary &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ fontWeight: "bolder" }}>
                  {record.salary}&nbsp;{record.currency}
                </span>{" "}
                /month
              </span>
            </div>
            <div
              style={{
                // border: "1px solid black",
                paddingLeft: "5%",
                marginTop: "15px",
              }}
            >
              <img
                src={LocationIcon}
                alt={"icon"}
                style={{
                  marginTop: "-5px",
                  // border: "1px solid black",
                  // width: "100%",
                }}
              />
              &nbsp;&nbsp;
              <span style={{ fontSize: "13px" }}>{record.location}</span>
            </div>
            <div
              style={{
                // border: "1px solid black",
                paddingLeft: "5%",
                marginTop: "15px",
              }}
            >
              <img
                src={icon}
                alt={"icon"}
                style={{
                  marginTop: "-5px",
                  // border: "1px solid black",
                  // width: "100%",
                }}
              />
              &nbsp;&nbsp;
              <span style={{ fontSize: "13px" }}>{record.jobType}</span>
            </div>
            <br />
            <div
              style={{
                // margingTop: "20px",
                borderTop: "2px solid #f3f6ef",
                width: "100%",
                display: "flex",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
                // height: "40%",
                padding: "5%",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "#1A77F2", fontWeight: "500" }}>
                {record.status}
              </span>
              <span style={{ fontWeight: "500" }}>
                <a
                  onClick={() =>
                    history.push(
                      `/jobs/details?job_id=${record.uuid}&status=${record.status}`
                    )
                  }
                >
                  See Details {`>`}
                </a>
              </span>
            </div>
            {/* Islamabad, PK <br />
              Full Time */}
          </StyledBox>
        </Col>
      ))}
    </>
    // <Columns
    //   history={history}
    //   startScreening={startScreening}
    //   closeJob={closeJob}
    //   expired={expired}
    //   data={data}
    // />
    // <StyledTable
    //   // columns={columns}
    //   columns={columns(
    //     history,
    //     startScreening,
    //     closeJob,
    //     expired,
    //     sortedInfo,
    //     getColumnSearchProps
    //   )}
    //   dataSource={data}
    //   // rowClassName={(record, index) => `table_row_pointer dark`}
    //   // loading={loading}
    //   pagination={{ pageSize: 5 }}
    //   spacing
    //   align="left"
    //   onChange={handleChange}
    // />
  );
};

export default Records;

// const StyledPagination = styled()

const StyledTable = styled(Table)`
  margin-top: -23px;
  .ant-pagination-item-link {
    border-radius: 20px;
    background-color: #1a77f2;
    color: white;
  }

  .ant-pagination-item {
    border-radius: 20px;
    border-color: #1a77f2;
    background-color: white;
    color: #1a77f2;
  }

  .ant-pagination-item-active {
    border-radius: 20px;
    background-color: #1a77f2;
    color: white;
  }
  /* margin-left: ${(p) => p.marginLeft || "70px"};
  margin-right: ${(p) => p.marginRight || "70px"}; */
  .ant-table-container {
    .ant-table-content {
      table {
        border-spacing: ${(props) => props.spacing && "0 10px"};
        /* border: 1px solid black; */
        background-color: #fcfcfc;
        thead.ant-table-thead {
          tr {
            th.ant-table-cell {
              background-color: #fcfcfc;
              /* box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px;
              rgba(0, 0, 0, 0.1) 0px -1px 0px; */
              margin: 0 !important;
              padding: 0 !important;
              padding-top: 0px !important;
              padding-bottom: 0px !important;
              /* padding-left: 15px !important; */
              text-align: left;

              text-align: ${(p) => p.align || "center"};
              font-family: "Montserrat";
              font-weight: 900;
              color: grey;
              border: none;
              @media (max-width: 480px) {
                text-align: left;
              }
            }
            /* th:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }
            th:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            } */
          }
        }

        tbody.ant-table-tbody {
          tr.ant-table-row {
            /* border: 1px solid black; */
            /* margin-bottom: 20px; */
            td.ant-table-cell {
              /* border: 1px solid black; */
              background-color: white;
              /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px,
                rgba(0, 0, 0, 0.1) 0px -1px 0px; */
              margin: 0 !important;
              padding: 0 !important;
              padding-top: 10px !important;
              padding-bottom: 10px !important;
              padding-left: 16px !important;
              font-size: 12px;
              /* padding-right: 20px !important; */
              font-family: Montserrat;
              height: ${(p) => p.cellHeight || "50px"} !important;
              font-weight: 600;
              text-align: ${(p) => p.align || "center"};
              @media (max-width: 480px) {
                text-align: left;
              }
            }

            td:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
              /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px,
                rgba(0, 0, 0, 0.1) 0px -1px 0px, rgba(0, 0, 0, 0.1) -1px 0px 0px; */
            }
            td:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
              color: grey;
              /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px,
                rgba(0, 0, 0, 0.1) 0px -1px 0px, rgba(0, 0, 0, 0.1) 1px 0px 0px; */
            }
          }

          tr.dark {
            background-color: white;
          }
          tr.light {
            background-color: white;
          }
        }
      }
    }
  }
`;

const StyledBox = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  border-radius: 15px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  align-items: center;
  height: 195px;
`;
