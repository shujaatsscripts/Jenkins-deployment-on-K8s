import React, { useState, useEffect } from "react";
import { Col, message, Row, Spin } from "antd";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container } from "../../components/Seeker";
import {
  ListColumn,
  DescriptionColumn,
  SearchBarCol,
} from "./styles/main.styles";
import Job from "./Job";
import JobDescription from "./JobDescription";
import axios, { baseUrl } from "../../utils/axios";
// import styled from 'styled-components';
import { Pagination } from "antd";
import ProfileCard from "../JobSeekerDashboard/profileCard";
import SuggestionsCard from "../JobSeekerDashboard/suggestionsCard";
import PostCard from "../JobSeekerDashboard/postCard";
import CompaniesCard from "../JobSeekerDashboard/companies";
import EventsCard from "../JobSeekerDashboard/events";
import JobsCard from "../JobSeekerDashboard/jobs";

// const { Option } = Select;

const PAGE_SIZE = 4;

const JobSeekerDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);

  const [jobs, setJobs] = useState();
  const [selectedJob, setSelectedJob] = useState();
  const [posts, setPosts] = useState([]);

  // [
  //   {
  //     userId: "",
  //     uuid: "",
  //     description:
  //       "Throwback to Spark Eighteen 's initiative to honour SHEROES out there. The campaign aimed at breaking stereotypes around Women.",
  //     createdAt: "Today at 10:24 am",
  //     seekerJobTitle: "UI/UX Dsigner",
  //     seekerName: "Darlene Robertson",
  //     likeCount: 0,
  //     commentCount: 0,
  //   },
  //   {
  //     userId: "",
  //     uuid: "",
  //     description:
  //       "Throwback to Spark Eighteen 's initiative to honour SHEROES out there. The campaign aimed at breaking stereotypes around Women.",
  //     createdAt: "Today at 10:24 am",
  //     seekerJobTitle: "UI/UX Dsigner",
  //     seekerName: "Darlene Robertson",
  //     likeCount: 0,
  //     commentCount: 0,
  //   },
  // ];

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      axios.get(`${baseUrl}/api/post/getAllPosts`).then((res) => {
        setPosts(res.data);
      });
      setLoading(false);
    };
    apiCall();
  }, []);

  // useEffect(() => {
  //   const apiCall = async () => {
  //     setLoading(true);
  //     const seeker = await axios.get(
  //       `${baseUrl}/api/seeker/getSeekerById/0c572075-227f-4184-9acf-0851f129bd52`
  //     );
  //     if (localStorage.getItem("username") === null) {
  //       //...
  //     }
  //   };
  //   apiCall();
  // }, []);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(
  //         `${baseUrl}/api/job-description/jobs/all?page=${page}&size=${PAGE_SIZE}`
  //       );
  //       setTotalItems(res.data.totalPages * PAGE_SIZE);
  //       setJobs(res.data.jobs);
  //       setSelectedJob(res.data?.jobs?.[0]);
  //     } catch (err) {
  //       console.log(err);
  //       message.error('Something went wrong!');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchJobs();
  // }, [page]);

  // const search = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(
  //       `${baseUrl}/api/job-description/jobs/all?page=${page}&size=10&jobTitle=${query.replace(
  //         / /g,
  //         ""
  //       )}`
  //     );
  //     setJobs(res.data.jobs);
  //     setSelectedJob(res.data?.jobs[0]);
  //     setTotalItems(res.data?.totalPages * PAGE_SIZE);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Row>
      <Col style={{ border: "0px solid red" }} span={6}>
        <div
          style={{
            marginTop: "20px",
            // position: "fixed",
            width: "100%",
            padding: "0 5% 0 5%",
          }}
        >
          <ProfileCard />
          <br />
          <SuggestionsCard />
          <br />
        </div>
      </Col>
      <Col style={{ backgroundColor: "transparent", color: "white" }} span={12}>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "70px",
            padding: "0 1% 0 1%",
          }}
        >
          {posts?.map((post) => (
            <PostCard post={post} />
          ))}
        </div>
      </Col>
      <Col span={6}>
        <div
          style={{
            marginTop: "20px",
            // position: "fixed",
            // border: "2px solid black",
            padding: "0 5% 0 5%",
          }}
        >
          <EventsCard posts={posts} setPosts={setPosts} />
          <br />
          <CompaniesCard />
          <br />
          <JobsCard />
          <br />
          <br />
        </div>
      </Col>
    </Row>
    // <Spin spinning={loading}>
    //   <Container justify="center">
    //     <Col xs={23} md={18}>
    //       <Row>
    //         <SearchBarCol xs={24}>
    //           <Input
    //             inputType="search_jobs"
    //             placeholder="UI / UX Designer"
    //             label="Job Title"
    //             value={query}
    //             onChange={(e) => setQuery(e.target.value)}
    //           />
    //           <Button
    //             text="FIND JOBS"
    //             btnType="seeker_dashboard"
    //             onClick={search}
    //           />
    //         </SearchBarCol>

    //         <Col>
    //           <StyledSelect
    //             mode="multiple"
    //             allowClear
    //             style={{ width: '200px' }}
    //             maxTagCount={0}
    //             placeholder="Please select"
    //             defaultValue={[]}
    //             value={locations}
    //             onChange={(value) => setLocations(value)}
    //             showArrow={true}
    //           >
    //             {countries.map((item, index) => (
    //               <Option key={item}>{item}</Option>
    //             ))}
    //           </StyledSelect>
    //         </Col>
    //       </Row>
    //       <Row>
    //         <ListColumn lg={12} xl={9}>
    //           {jobs?.map((job, index) => (
    //             <Job
    //               key={index}
    //               data={job}
    //               active={selectedJob?.uuid === job.uuid}
    //               onClick={() => setSelectedJob(job)}
    //             />
    //           ))}
    //           <Pagination
    //             defaultCurrent={1}
    //             total={totalItems}
    //             pageSize={PAGE_SIZE}
    //             onChange={(page) => setPage(page)}
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //             }}
    //           />
    //         </ListColumn>
    //         <DescriptionColumn lg={12} xl={15}>
    //           {selectedJob && <JobDescription data={selectedJob} />}
    //         </DescriptionColumn>
    //       </Row>
    //     </Col>
    //   </Container>
    // </Spin>
  );
};

// const StyledSelect = styled(Select)`
//   .ant-select-selection-item {
//     display: none !important;
//   }
// `;

export default JobSeekerDashboard;
