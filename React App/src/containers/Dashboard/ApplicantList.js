import { Col } from "antd";
import React, { useEffect, useState } from "react";
import { ApplicantItem } from "./styles/applicantList.styles";
import { SectionHeading, MainContainer } from "./styles/main.styles";
// import Loading from '../../components/Loading';
import axios, { baseUrl } from "../../utils/axios";

const ApplicantList = () => {
  const [list, setList] = useState();

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await axios.get(`${baseUrl}/api/applicant/organization`);
      setList(res.data);
    };
    fetchApplicants();
  }, []);

  return !list ? (
    // <Loading />
    <></>
  ) : (
    <>
      <MainContainer style={{ height: "424px" }}>
        <SectionHeading>List of Applicants</SectionHeading>
        {list.map((item, index) => (
          <ApplicantItem key={index}>
            <Col xs={13}>{item.jobTitle}</Col>
            <Col xs={2}>:</Col>
            <Col xs={9}>
              {item.firstName} {item.lastName}
            </Col>
          </ApplicantItem>
        ))}
      </MainContainer>
    </>
  );
};

export default ApplicantList;
