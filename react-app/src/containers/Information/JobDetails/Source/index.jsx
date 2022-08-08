import { Col, message, Modal, Row, Spin, DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import axios, { baseUrl } from "../../../../utils/axios";
import { Box } from "../../../styles/main.styles";
import styled from "styled-components";
import columns from "./columns";
import { useSelector } from "react-redux";
import SearchBar from "../../../searchBar";
import FullPageLoader from "../../../../components/FullPageLoader";
import { Table } from "antd";
import Empty from "../../../Jobs/DisplayJobs/Empty";
import { columnSearch } from "../../../../utils/columnSearch";

let searchData = [];

const ListCandidates = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [rowData, setRowData] = useState({});
  const [candidateStatus, setCandidateStatus] = useState(null);
  const [rejectionEmailText, setRejectionEmailText] = useState("");
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const { value: expired } = useSelector((state) => state.jobsExpired);
  const [searchText, setSearchText] = useState(null);
  const [searchedColumn, setSearchedColumn] = useState(null);
  let getColumnSearchProps = columnSearch(
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  );

  let cardsData = ["", "", "", "", ""];

  // const parseTime = (time) => {
  //   const [hours, am] = moment.utc(time).format('HH a').split(' ');
  //   return `${hours}:00 ${am}`;
  // };

  //   redirect if state doesn't exist else process data for table
  useEffect(() => {
    const apiCall = async () => {
      const candidates = await axios.get(
        `${baseUrl}/api/candidate/organization`
      );
      console.log(candidates);
      searchData = candidates?.data?.rows.map((el, index) => {
        return {
          key: index,
          name: el.candidateName,
          email: el.recruiterEmail,
          interviewDate: moment
            .utc(el.scheduledInterviewDateTime)
            .format("dddd Do MMMM YYYY"),
          // interviewTime: parseTime(el.scheduledInterviewDateTime),
          interviewTime:
            new Date(el.scheduledInterviewDateTime).getUTCHours() + ":00",
          job_title: el.title,
          status: el.status,
          uuid: el.uuid,
          jobDescriptionID: el.jobDescriptionID,
        };
      });
      setData(searchData);
      setLoading(false);
    };
    apiCall();
  }, [history]);

  const showModal = (data) => {
    setRowData(data);
    setVisible(true);
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    // setRowCount(extra.currentDataSource.length);
    // setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const handleOk = async () => {
    if (candidateStatus) {
      setLoading(true);
      try {
        let payload = {
          status: candidateStatus,
          jobDescriptionID: rowData.jobDescriptionID,
        };
        // only send rejection email text if status is rejected
        if (candidateStatus === `REJECTED`)
          payload.rejectionNotes = rejectionEmailText;

        const res = await axios.put(
          `${baseUrl}/api/candidate/${rowData?.uuid}`,
          payload
        );
        if (res && res.status === 200) {
          message.success("Status updated");
          setVisible(false);
          setLoading(false);
          history.push("/candidates");
          window.location.reload();
        } else {
          message.error("Something went wrong");
          setVisible(false);
        }
      } catch (err) {
        message.error("Something went wrong");
        setVisible(false);
      }
    }
  };

  const handleCancel = () => {
    setCandidateStatus(null);
    setVisible(false);
  };

  const onChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const search = (searchInput) => {
    let filteredSuggestions = searchData.filter(
      (d) =>
        JSON.stringify(d).replace(" ", "").toLowerCase().indexOf(searchInput) >
        -1
    );
    setData(filteredSuggestions);
  };

  const Cards = ({ data }) => {
    let cards = [];
    data?.map((job, index) => {
      cards.push(
        <Col xs={22} sm={23} md={data.length === index + 1 ? 4 : 5} key={index}>
          <StyledBox
            style={{
              height: "60px",
              padding: "10px",
              display: "flex",
              direction: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                //   border: "1px solid black",
                width: "85%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  borderRight: "2px solid silver",
                  paddingRight: "20%",
                  fontSize: "14px",
                  fontWeight: "bolder",
                  paddingTop: "2px",
                }}
              >
                All Source
              </span>
              <span
                style={{
                  // border: "2px solid silver",
                  fontSize: "18px",
                  fontWeight: "bolder",
                  display: "flex",
                  direction: "column",
                  justifyContent: "center",
                  // paddingRight: "10%",
                }}
              >
                21
              </span>
            </div>
          </StyledBox>
        </Col>
      );
    });

    return <>{cards}</>;
  };
  //================================================================================
  return !loading ? (
    data ? (
      <div style={{ padding: "5px" }}>
        <Modal
          visible={visible}
          okText="Save"
          onOk={handleOk}
          onCancel={handleCancel}
          style={{
            fontFamily: "ProductSans-Regular",
          }}
        >
          <form>
            <Row justify="space-between" gutter={24}>
              <Col xs={24}>
                <Input
                  inputType="withLabel"
                  label="Name"
                  placeholder="Candidate Name"
                  value={rowData?.name}
                  required
                  disabled
                />
              </Col>
              <Col xs={24}>
                <Input
                  inputType="withLabel"
                  label="Email"
                  placeholder="Recruiter email"
                  value={rowData?.email}
                  required
                  disabled
                />
              </Col>
              <Col xs={24}>
                <Input
                  inputType="withLabel"
                  label="Interview Date"
                  placeholder="Interview Date"
                  value={rowData?.interviewDate}
                  required
                  disabled
                />
              </Col>
              <Col xs={24}>
                <Input
                  inputType="withLabel"
                  label="Interview Time (24h UTC)"
                  placeholder="Interview Time (24h UTC)"
                  value={rowData?.interviewTime}
                  required
                  disabled
                />
              </Col>
              <Col xs={24}>
                <Input
                  inputType="withLabel"
                  label="Job Title"
                  placeholder="Job Title"
                  value={rowData?.job_title}
                  required
                  disabled
                />
              </Col>
              <Col xs={24}>
                <Select
                  type="employmentType"
                  options={[
                    { text: "Shortlist", value: "SHORTLISTED" },
                    { text: "Inprogress", value: "INPROGRESS" },
                    { text: "Selected", value: "SELECTED" },
                    { text: "Rejected", value: "REJECTED" },
                  ]}
                  placeholder={rowData?.status}
                  label="Status"
                  value={candidateStatus || rowData?.status}
                  onChange={(value) => setCandidateStatus(value)}
                  required
                />
              </Col>
              {candidateStatus === `REJECTED` && (
                <Col xs={24}>
                  <Input
                    inputType="textarea_withLabel"
                    label="Reason for Rejection"
                    placeholder="Email Text"
                    value={rejectionEmailText}
                    onChange={(e) => setRejectionEmailText(e.target.value)}
                    required
                  />
                </Col>
              )}
            </Row>
          </form>
        </Modal>
        <Row>
          <Col span={24}>
            {/* //=================================================================== */}
            <Row
              style={{ border: "0px solid black", marginBottom: "14px" }}
              //   gutter={[0, 16]}
              justify="space-between"
            >
              <Col
                style={{ display: "flex" }}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 9 }}
              >
                <SearchBar
                  searchValue={searchValue}
                  onChange={onChange}
                  // style={{ width: "40%" }}
                />
                &nbsp;&nbsp;&nbsp;
                <StyledButton onClick={() => search(searchValue)}>
                  Search
                </StyledButton>
              </Col>
              <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 1 }}></Col>
              <Col
                // style={{ border: "1px solid black" }}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
              >
                <div style={{ width: "100%", display: "flex" }}>
                  <div
                    style={{
                      width: "20%",
                      fontSize: "14px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    From
                  </div>
                  {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                  <DatePicker
                    style={{
                      height: "100%",
                      borderRadius: "7px",
                      width: "80%",
                    }}
                  />
                </div>
              </Col>
              {/* <Col span={1}></Col> */}
              <Col
                // style={{ border: "1px solid black" }}
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 4 }}
              >
                <div style={{ width: "100%", display: "flex" }}>
                  <div
                    style={{
                      width: "20%",
                      fontSize: "14px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    To
                  </div>
                  {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                  <DatePicker
                    style={{
                      height: "100%",
                      borderRadius: "7px",
                      width: "80%",
                    }}
                  />
                </div>
              </Col>
            </Row>
            {/* //========================================================================== */}
            <Row style={{ marginBottom: "5px" }} gutter={16}>
              {<Cards data={cardsData} />}
            </Row>
            <br />
            <StyledTable
              columns={columns(
                showModal,
                expired,
                sortedInfo,
                getColumnSearchProps
              )}
              // scroll={{ x: 1000 }}
              spacing={true}
              dataSource={data}
              loading={loading}
              // pagination={false}
              rowClassName={(record, index) => `table_row_pointer light`}
              align="left"
              onChange={handleChange}
              pagination={{ pageSize: 5 }}
            />
            {/* <Records jobData={jobData} history={history} expired={expired} /> */}
          </Col>
        </Row>
      </div>
    ) : (
      <Box>
        <Empty history={history} expired={expired} />
      </Box>
    )
  ) : (
    <Box>
      <FullPageLoader />
    </Box>
  );
};

export default ListCandidates;

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

const StyledSelect = styled.select`
  width: 80%;
  border: none;
  outline: none;
  border-radius: 7px;
  padding: 0 20px;
  font-size: 12px;
  font-family: Montserrat;
  font-weight: 500;
  color: grey;
  .select-box {
    position: absolute;
    background-color: red;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
  }
`;

const StyledButton = styled.button`
  border: none;
  padding: 0 10px 0 10px;
  width: 20%;
  border-color: #1a77f2;
  background-color: #1a77f2;
  height: 33px;
  font-family: Montserrat;
  font-size: 12px;
  color: white;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
    /* border-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    background-color: ${(props) => (props.selected ? "#1a77f2" : "#E5E5E5")};
    color: ${(props) => (props.selected ? "white" : "grey")}; */
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
