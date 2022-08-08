import { Table, Row, Col, Calendar, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../components/Input";
import axios, { baseUrl } from "../../../utils/axios";
// import { StyledTable } from "../../../components/Table";
// import { StyledTable } from "../ListCandidates";
import { TopRowWrapper, Heading } from "../../styles/main.styles";
import columns from "./columns";
import moment from "moment";
import { Label, StyledNumberInput } from "../styles/screened.styles";
import SearchBar from "../../searchBar";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  StyledBox,
  StyledText,
  StyledNumber,
  StyledCol,
} from "../../Dashboard/styles/box.styles";

let searchData = [];
const ScreenedResult = (props) => {
  const history = useHistory();
  const data = props.location?.state?.data;
  const jobDescriptionID = props.location?.state?.jobDescriptionID;
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  const [value, setValue] = useState(moment());
  const [email, setEmail] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [dateToDisplay, setDateToDisplay] = useState("");
  const [dateToStore, setDateToStore] = useState("");
  const [rowData, setRowData] = useState({});
  const [hours, setHours] = useState("");
  const [searchInput, setSearchInput] = useState("");

  //   redirect if state doesn't exist else process data for table
  useEffect(() => {
    if (!data) {
      history.push("/jobs");
    } else {
      setLoading(true);
      let td = data.map((el, index) => {
        return {
          key: index,
          name: el?.Name ? el?.Name : "N/A",
          Similarity: el?.Similarity,
          Email: el?.Email ? el?.Email : "N/A",
          // summary: el?.Summary,
          // total_exp: Math.floor(el["Total Experience (months)"] / 12),
          location: el?.Location ? el?.Location : "N/A",
          Skills: el?.Skills.join(", ") ? el?.Skills.join(", ") : "N/A",
          // Skills: el?.Skills ? el?.Skills : 'N/A',
          Experience:
            el?.Experience + " Year" ? el?.Experience + " Year" : "N/A",
          Resume_URL: el?.Resume_URL,
          // parseFloat(el?.Experience).toFixed(2)
        };
      });
      searchData = td;
      setTableData(td);
      console.log("Table Data", tableData);
      setLoading(false);
    }
  }, [data, history]);

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };
  const handleOk = () => {
    setDateToDisplay(value.format("dddd Do MMMM YYYY"));
    setDateToStore(value.format());
    setVisible(false);
    setVisibleTwo(true);
  };
  const handleCancel = () => {
    setVisible(false);
    setVisibleTwo(false);
  };
  const showModal = (data) => {
    setRowData(data);
    setVisible(true);
  };
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleOkTwo = async (e) => {
    e.preventDefault();

    const validated = validateEmail(email);
    if (!email) {
      alert(`Email can't be empty`);
    } else if (!hours) alert(`Time fields can't be empty`);
    else if (!validated) alert(`Enter a valid Email`);
    else {
      const time = `${hours > 9 ? hours : "0" + hours}:00:00.000Z`;

      const splitDate = dateToStore.split("T");
      const dateTime = splitDate[0] + "T" + time;
      const reqObj = {
        email,
        candidateName: rowData.name || "Name not available",
        scheduledInterviewDate: dateToStore,
        scheduledInterviewTime: `${hours}:00`,
        scheduledInterviewDateTime: dateTime,
        jobDescriptionID,
      };
      // email
      // additionalMessage
      setLoading(true);

      try {
        await axios.post(`${baseUrl}/api/candidate/`, reqObj);
        message.success("Invite sent successfully!");
        setLoading(false);
        // console.log(res);
        // console.log(reqObj);
        setDateToDisplay("");
        setDateToStore("");
        setEmail("");
        setAdditionalMessage("");
        setHours("");
        // setValue("");
        // setAmOrPm("");
        setVisibleTwo(false);
      } catch (err) {
        console.log(err);
        message.error("Error");
      }
    }
  };
  const handleCancelTwo = () => {
    setVisibleTwo(false);
    setEmail("");
    setAdditionalMessage("");
    setHours("");
  };

  const onChangeHour = (value) => setHours(value);

  useEffect(() => {
    if (searchInput === "") {
      setTableData(searchData);
    }
  }, [searchInput]);

  const handleSeedInput = () => {
    let filteredSuggestions = searchData.filter(
      (d) =>
        JSON.stringify(d)
          .replace(" ", "")
          .toLowerCase()
          .indexOf(searchInput.replace(" ", "").toLowerCase()) > -1
    );
    setTableData(filteredSuggestions);
  };

  return data ? (
    <>
      <Row justify="center">
        <Col span={22}>
          <div
            style={{
              marginTop: "13px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bolder",
                paddingTop: "2px",
                color: "grey",
              }}
            >
              Screened Results
            </div>
            <StyledBox
              style={{
                display: "flex",
                flexDirection: "row",
                borderRadius: "8px",
                justifyContent: "space-between",
                height: "40px",
                backgroundColor: "#1877f2",
                padding: "0 20px 0 20px",
                cursor: "pointer",
              }}
              onClick={() => history.push("/job/add")}
            >
              <PlusCircleOutlined
                style={{
                  fontSize: 20,
                  color: "white",
                  marginRight: "10px",
                }}
              />
              <StyledText color="white" bold>
                Create Job
              </StyledText>
            </StyledBox>
          </div>
        </Col>
      </Row>
      <Row span={22}>
        <Col span={1}></Col>
        <Col span={12}>
          <SearchBar
            handleSeedInput={handleSeedInput}
            setDataSource={setTableData}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </Col>
        <Col span={11}></Col>
        <Col span={1}></Col>
        <Col span={22}>
          <br />
          <StyledTable
            columns={columns(showModal)}
            dataSource={tableData}
            loading={loading}
            rowClassName={(record, index) => `table_row_pointer light`}
            spacing={true}
            // pagination={false}
            align="left"
            // scroll={{ x: 1000 }}
          />
        </Col>
      </Row>
      <>
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{
            fontFamily: "ProductSans-Regular",
          }}
        >
          <Label>Pick a date to schedule interview</Label>

          <Calendar
            fullscreen={false}
            value={value}
            onChange={(date) => setValue(date)}
            onSelect={(date) => setValue(date)}
            onPanelChange={onPanelChange}
          />
        </Modal>
      </>

      <>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Modal
            visible={visibleTwo}
            onOk={handleOkTwo}
            onCancel={handleCancelTwo}
            style={{
              fontFamily: "ProductSans-Regular",
            }}
          >
            <form onSubmit={handleOkTwo}>
              <Input
                inputType="withLabel"
                label="Email Invite"
                type="email"
                placeholder="To:  johndoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Label>Selected Date:</Label>
                <Label style={{ color: "#005DE8" }}>{dateToDisplay}</Label>
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Label>
                  Select time in UTC+00 zone.
                  <br /> Your timezone may vary
                </Label>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  color: "#786587",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    height: "65px",
                  }}
                >
                  <StyledNumberInput
                    size="large"
                    min={0}
                    max={23}
                    // defaultValue={3}
                    placeholder="24h"
                    onChange={onChangeHour}
                    required
                    style={{
                      textAlign: "center",
                      width: "70px",
                      height: "65px",
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>:</div>
                <div style={{ textAlign: "center" }}>
                  <StyledNumberInput
                    size="large"
                    min={0}
                    max={59}
                    placeholder="00"
                    // defaultValue={30}
                    // onChange={onChangeMinute}
                    disabled
                    style={{ textAlign: "center", width: "70px" }}
                  />
                </div>
                {/* <div style={{ maxWidth: '100px' }}>
                  <Select
                    type='time'
                    options={[
                      { text: 'AM', value: 'AM' },
                      { text: 'PM', value: 'PM' },
                    ]}
                    placeholder='AM'
                    // label="Employment Type"
                    value={amOrPm}
                    onChange={(value) => {
                      setAmOrPm(value);
                    }}
                    required
                  />
                </div> */}
              </div>

              <Input
                inputType="textarea_withLabel"
                label="Additional Message"
                placeholder="Type here"
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                required
              />
            </form>
          </Modal>
        )}
      </>
    </>
  ) : (
    <></>
  );
};

export default ScreenedResult;

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
              background-color: white;
              /* background-color: #fcfcfc; */
              /* box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 3px;
              rgba(0, 0, 0, 0.1) 0px -1px 0px; */
              margin: 0 !important;
              padding: 0 !important;
              padding: 15px !important;
              /* padding-bottom: 0px !important; */
              /* padding-left: 15px !important; */
              text-align: left;

              text-align: ${(p) => p.align || "center"};
              font-family: "Montserrat";
              font-weight: 900;
              color: grey;
              /* border: none; */
              @media (max-width: 480px) {
                text-align: left;
              }
            }
            th:first-child {
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
            }
            th:last-child {
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
            }
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
