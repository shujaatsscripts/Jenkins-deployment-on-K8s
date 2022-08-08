import React, { useState, useEffect } from "react";
import SearchFilter from "./SearchBar";
import JobFilter from "./JobFilter";
import JobList from "./Joblist/index";
import { Row, Col } from "antd";
import JobDetail from "./JobDetail";
import MySearch from "./Searchprac";
import { useLocation, useHistory } from "react-router-dom";
import axios, { baseUrl } from "../../../utils/axios";

let searchData = [];
const Index = () => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const apiCall = async () => {
      let jobId = null;
      if (typeof location.state !== "undefined") {
        console.log(location.state);
        jobId = location.state.id;
        history.replace({
          pathname: "/jobseeker_jobs",
          state: { id: null },
        });
      }
      setLoading(true);
      const events = await axios.get(
        `${baseUrl}/api/job-description/jobs/getSeekerAllJobs`
      );
      console.log(events?.data);
      searchData = events?.data;
      setData(events?.data);
      if (events?.data?.length > 0) {
        if (jobId !== null) {
          let job = events.data.find((item) => item.uuid == jobId);
          console.log("job", job);
          setJob(job);
        } else setJob(events?.data[0]);
      }
      setLoading(false);
    };
    apiCall();
  }, []);

  const dataSource = [
    {
      key: "1",
      company_name: "Nets-International",
      job_title: "UI/UX Designer",
      salary: "65000",
      job_type: "Full-Time",
      location: "Islamabad, PK(On-site)",
      total_applicants: 20,
      created_at: "22/03/2022",
    },
    {
      key: "2",
      company_name: "Wets-International",
      job_title: "UI/UX Designer",
      salary: "65000",
      job_type: "Full-Time",
      location: "Islamabad, PK(On-site)",
      total_applicants: 20,
      created_at: "22/03/2022",
    },
  ];

  // useEffect(() => {
  //   setData(dataSource);
  //   searchData = dataSource;
  // }, []);

  useEffect(() => {
    if (searchInput === "") {
      setData(searchData);
    }
  }, [searchInput]);

  const reload = () => {
    setData(searchData);
  };

  const getFilterResult = (type, data, filter) => {
    let result = true;
    switch (type) {
      case "location":
        if (filter !== "") {
          result =
            data.location.replace(" ", "").toLowerCase() ===
            filter.replace(" ", "").toLowerCase();
        }
        break;
      case "level":
        if (filter !== "") {
          result =
            data.level.replace(" ", "").toLowerCase() ===
            filter.replace(" ", "").toLowerCase();
        }
        break;
      case "jobType":
        if (filter !== "") {
          result =
            data.job_type.replace(" ", "").toLowerCase() ===
            filter.replace(" ", "").toLowerCase();
        }
        break;
    }
    return result;
  };

  const handleSeedInput = (countryName, level, jobType) => {
    let filteredSuggestions = searchData.filter(
      (d) =>
        JSON.stringify(d)
          .replace(" ", "")
          .toLowerCase()
          .indexOf(searchInput.replace(" ", "").toLowerCase()) > -1 &&
        getFilterResult("location", d, countryName) &&
        getFilterResult("level", d, level) &&
        getFilterResult("jobType", d, jobType)
    );
    setData(filteredSuggestions);
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <SearchFilter
        style={{ position: "fixed" }}
        handleSeedInput={handleSeedInput}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        reload={reload}
      />

      <Row gutter={16}>
        {/* <Col span={5}>
          <JobFilter data={data} />
        </Col> */}
        <Col span={14}>
          <JobList dataSource={data} setJob={setJob} />
        </Col>
        <Col span={10}>
          <JobDetail job={job} />
        </Col>
      </Row>
    </div>
  );
};
export default Index;
