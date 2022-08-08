import { MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Typography } from "antd";
import { Fragment } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CellText,
  OptionsText,
  ResponsiveViewHeading,
  StyledJD,
  DropDownIcon,
  StyledParagraph,
} from "../../../../components/Table";
import addResume from "../../../../images/dropdown/addResume.png";
import screening from "../../../../images/dropdown/screening.png";
import closeJobIcon from "../../../../images/dropdown/closeJob.png";
import linkIcon from "../../../../images/dropdown/link.png";
import { Link } from "react-router-dom";
import companyIcon from "../../../../images/recruiterDashboard/companyLogo.svg";
import entryLevelIcon from "../../../../images/jobs/entry_level.svg";
import locationIcon from "../../../../images/jobs/location.svg";
import dateIcon from "../../../../images/jobs/date.svg";
import profileIcon from "../../../../images/jobs/profile.svg";
import { getJobCards } from "../index";

const { Paragraph } = Typography;

export const DropDown = ({
  history,
  startScreening,
  closeJob,
  expired,
  record,
}) => {
  return (
    <Dropdown
      trigger={["click"]}
      overlay={
        <Menu>
          <OptionsText onClick={() => history.push("/add_resume", { record })}>
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
            <DropDownIcon src={linkIcon} />
            <CopyToClipboard text={record?.jobLink}>
              Get Shareable Link
            </CopyToClipboard>
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
  );
};
const renderText = (text) => (
  <CellText>
    {text.toString().length > 20
      ? `${text.toString().slice(0, 15)}...`
      : text.toString()}
  </CellText>
);
const renderJD = (text) => (
  // <CellText>
  // <StyledJD>
  <StyledParagraph ellipsis={{ rows: 1 }}>{text}</StyledParagraph>
  // {/* </StyledJD> */}
  // </CellText>
);

const Columns = ({ history, startScreening, closeJob, expired, data }) => {
  return <>{getJobCards(history, startScreening, closeJob, expired, data)}</>;
  // return [
  //   {
  //     title: () => (
  //       <Fragment>
  //         Job Title
  //         <br />
  //         Level
  //         <br />
  //         Location
  //         <br />
  //         Position Opening date
  //         <br />
  //         Position Close Date
  //         <br />
  //         Description
  //         <br />
  //         Applicants
  //         <br />
  //         Custom Resumes
  //         <br />
  //         LinkedIn Resumes
  //       </Fragment>
  //     ),
  //     render: (record) => (
  //       <Fragment>
  //         <ResponsiveViewHeading>Job Title:</ResponsiveViewHeading>&nbsp;
  //         <CellText width={200}>{record.job_title}</CellText>
  //         <br />
  //         <ResponsiveViewHeading>Level:</ResponsiveViewHeading>&nbsp;
  //         <CellText>{record.level}</CellText>
  //         <br />
  //         <ResponsiveViewHeading>Location:</ResponsiveViewHeading>&nbsp;
  //         <CellText>{record.location}</CellText>
  //         <br />
  //         <ResponsiveViewHeading>Position Opening Date:</ResponsiveViewHeading>
  //         &nbsp;
  //         <CellText>{record.open_date}</CellText>
  //         <br />
  //         <ResponsiveViewHeading>Position Close Date:</ResponsiveViewHeading>
  //         &nbsp;
  //         <CellText>{record.close_date}</CellText>
  //         <br />
  //         <ResponsiveViewHeading>Job Description:</ResponsiveViewHeading>&nbsp;
  //         <CellText>
  //           <StyledJD>
  //             <Paragraph ellipsis={{ rows: 2 }}>{record.desc}</Paragraph>
  //           </StyledJD>
  //         </CellText>
  //         <br />
  //         <ResponsiveViewHeading>Applicants:</ResponsiveViewHeading>&nbsp;
  //         <CellText>{record.applicants}</CellText>
  //         <br />
  //         <ResponsiveViewHeading>Custom Resumes:</ResponsiveViewHeading>&nbsp;
  //         <CellText>{record.customResumes}</CellText>
  //         <br />
  //         <ResponsiveViewHeading>LinkedIn Resumes:</ResponsiveViewHeading>&nbsp;
  //         <CellText>{record.linkedinResumes}</CellText>
  //         <br />
  //         {!expired && (
  //           <>
  //             <ResponsiveViewHeading>Edit Job:</ResponsiveViewHeading>&nbsp;
  //             <CellText>
  //               <Link to={{ pathname: "/job/edit", query: { data: record } }}>
  //                 Edit Job
  //               </Link>
  //             </CellText>
  //             <span>
  //               <Dropdown
  //                 trigger={["click"]}
  //                 overlay={
  //                   <Menu>
  //                     <OptionsText
  //                       onClick={() => history.push("/add_resume", { record })}
  //                     >
  //                       <DropDownIcon src={addResume} />
  //                       Add Resume
  //                     </OptionsText>
  //                     <OptionsText onClick={() => startScreening(record)}>
  //                       <DropDownIcon src={screening} />
  //                       Start Screening
  //                     </OptionsText>
  //                     {record.result?.length && (
  //                       <OptionsText
  //                         onClick={() =>
  //                           history.push("/screened_result", {
  //                             data: record.result,
  //                             jobDescriptionID: record.uuid,
  //                           })
  //                         }
  //                       >
  //                         <DropDownIcon src={screening} />
  //                         View Screened Results
  //                       </OptionsText>
  //                     )}
  //                     <OptionsText
  //                       onClick={() => {
  //                         message.success("Link Copied!");
  //                       }}
  //                     >
  //                       <DropDownIcon src={linkIcon} />
  //                       <CopyToClipboard text={record?.jobLink}>
  //                         Get Shareable Link
  //                       </CopyToClipboard>
  //                     </OptionsText>
  //                     <OptionsText onClick={() => closeJob(record.uuid)}>
  //                       <DropDownIcon src={closeJobIcon} />
  //                       Close Job
  //                     </OptionsText>
  //                   </Menu>
  //                 }
  //               >
  //                 <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
  //               </Dropdown>
  //             </span>
  //             <br />
  //           </>
  //         )}
  //       </Fragment>
  //     ),
  //     responsive: ["xs"],
  //   },
  //   {
  //     title: "Job Title",
  //     dataIndex: "job_title",
  //     key: "job_title",
  //     ...getColumnSearchProps("job_title"),
  //     render: (record) => (
  //       <div>
  //         <img
  //           src={companyIcon}
  //           alt={"icon"}
  //           style={{
  //             padding: "0px",
  //             width: "15%",
  //           }}
  //         />
  //         &nbsp;&nbsp;&nbsp;
  //         {record}
  //       </div>
  //     ),
  //     // render: renderText,
  //     responsive: ["sm"],
  //     width: "20%",
  //     sorter: (a, b) => a.job_title.length - b.job_title.length,
  //     sortOrder: sortedInfo.columnKey === "job_title" && sortedInfo.order,
  //   },
  //   {
  //     title: "Level",
  //     dataIndex: "level",
  //     key: "level",
  //     ...getColumnSearchProps("level"),
  //     render: (record) => (
  //       <div>
  //         <img
  //           src={entryLevelIcon}
  //           alt={"icon"}
  //           style={{
  //             padding: "0px",
  //             width: "15%",
  //           }}
  //         />
  //         &nbsp;&nbsp;&nbsp;
  //         {record}
  //       </div>
  //     ),
  //     // render: renderText,
  //     responsive: ["sm"],
  //     sorter: (a, b) => a.level.length - b.level.length,
  //     sortOrder: sortedInfo.columnKey === "level" && sortedInfo.order,
  //   },
  //   {
  //     title: "Location",
  //     dataIndex: "location",
  //     key: "location",
  //     ...getColumnSearchProps("location"),
  //     render: (record) => (
  //       <div>
  //         <img
  //           src={locationIcon}
  //           alt={"icon"}
  //           style={{
  //             padding: "0px",
  //             width: "20%",
  //           }}
  //         />
  //         &nbsp;&nbsp;&nbsp;
  //         {record}
  //       </div>
  //     ),
  //     // render: renderText,
  //     responsive: ["sm"],
  //     sorter: (a, b) => a.location.length - b.location.length,
  //     sortOrder: sortedInfo.columnKey === "location" && sortedInfo.order,
  //   },
  //   // {
  //   //   title: 'Position Opening Date',
  //   //   dataIndex: 'open_date',
  //   //   key: 'open_date',
  //   //   render: renderText,
  //   //   responsive: ['sm'],
  //   // },
  //   {
  //     title: "Position Close Date",
  //     dataIndex: "close_date",
  //     key: "close_date",
  //     ...getColumnSearchProps("close_date"),
  //     render: (record) => (
  //       <div>
  //         <img
  //           src={dateIcon}
  //           alt={"icon"}
  //           style={{
  //             padding: "0px",
  //             width: "12%",
  //           }}
  //         />
  //         &nbsp;&nbsp;&nbsp;
  //         {record}
  //       </div>
  //     ),
  //     // render: renderText,
  //     responsive: ["sm"],
  //     sorter: (a, b) => a.close_date.length - b.close_date.length,
  //     sortOrder: sortedInfo.columnKey === "close_date" && sortedInfo.order,
  //   },
  //   // {
  //   //   title: 'Description',
  //   //   dataIndex: 'desc',
  //   //   key: 'desc',
  //   //   render: renderJD,
  //   //   responsive: ['sm'],
  //   //   ellipsis: true,
  //   // },
  //   {
  //     title: "Applicants",
  //     dataIndex: "applicants",
  //     key: "applicants",
  //     ...getColumnSearchProps("applicants"),
  //     render: (record) => (
  //       <div>
  //         <img
  //           src={profileIcon}
  //           alt={"icon"}
  //           style={{
  //             padding: "0px",
  //             width: "16%",
  //           }}
  //         />
  //         &nbsp;&nbsp;&nbsp;
  //         {record}
  //       </div>
  //     ),
  //     // render: renderText,
  //     responsive: ["sm"],
  //     sorter: (a, b) => a.applicants.length - b.applicants.length,
  //     sortOrder: sortedInfo.columnKey === "applicants" && sortedInfo.order,
  //   },
  //   // {
  //   //   title: 'Custom Resumes',
  //   //   dataIndex: 'customResumes',
  //   //   key: 'customResumes',
  //   //   render: renderText,
  //   //   responsive: ['sm'],
  //   // },
  //   // {
  //   //   title: 'LinkedIn Resumes',
  //   //   dataIndex: 'linkedinResumes',
  //   //   key: 'linkedinResumes',
  //   //   render: renderText,
  //   //   responsive: ['sm'],
  //   // },
  //   {
  //     title: "",
  //     render: (record) =>
  //       !expired && (
  //         <CellText>
  //           <Link
  //             to={{ pathname: "/job/edit", query: { data: record } }}
  //             style={{
  //               backgroundColor: "#1a77f2",
  //               color: "white",
  //               fontSize: "12px",
  //               padding: "7px 10px 7px 10px",
  //               borderRadius: "5px",
  //             }}
  //           >
  //             Edit Job
  //           </Link>
  //         </CellText>
  //       ),
  //     width: "8%",
  //     responsive: ["sm"],
  //   },
  //   {
  //     title: "",
  //     render: (record) =>
  //       !expired && (
  //         <span>
  //           <Dropdown
  //             trigger={["click"]}
  //             overlay={
  //               <Menu>
  //                 <OptionsText
  //                   onClick={() => history.push("/add_resume", { record })}
  //                 >
  //                   <DropDownIcon src={addResume} />
  //                   Add Resume
  //                 </OptionsText>
  //                 <OptionsText onClick={() => startScreening(record)}>
  //                   <DropDownIcon src={screening} />
  //                   Start Screening
  //                 </OptionsText>
  //                 {record.result?.length && (
  //                   <OptionsText
  //                     onClick={() =>
  //                       history.push("/screened_result", {
  //                         data: record.result,
  //                         jobDescriptionID: record.uuid,
  //                       })
  //                     }
  //                   >
  //                     <DropDownIcon src={screening} />
  //                     View Screened Results
  //                   </OptionsText>
  //                 )}

  //                 <OptionsText
  //                   onClick={() => {
  //                     message.success("Link Copied!");
  //                   }}
  //                 >
  //                   <DropDownIcon src={linkIcon} />
  //                   <CopyToClipboard text={record?.jobLink}>
  //                     <span>Get Shareable Link</span>
  //                   </CopyToClipboard>
  //                 </OptionsText>
  //                 <OptionsText onClick={() => closeJob(record.uuid)}>
  //                   <DropDownIcon src={closeJobIcon} />
  //                   Close Job
  //                 </OptionsText>
  //               </Menu>
  //             }
  //           >
  //             <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
  //           </Dropdown>
  //         </span>
  //       ),
  //     responsive: ["sm"],
  //   },
  // ];
};

export default Columns;
