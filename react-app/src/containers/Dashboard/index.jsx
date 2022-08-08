import React from "react";
import { Row, Col } from "antd";
import Boxes from "./Boxes";
import HiringBoxes from "./HiringBoxes";
import CompanyBoxes from "./companyBoxes";
import ApplicantList from "./ApplicantList";
import MonthlyTrend from "./MonthlyTrend";
import OpenJobs from "./OpenJobs";
import HiringPipeline from "./HiringPipeline";
import SourceCount from "./SourceCount";

const RecruiterDashboard = () => {
  return (
    <>
      <Row justify="center" style={{ backgroundColor: "#FCFCFC" }}>
        <Col xs={23} md={22}>
          <br />
          <Boxes />
          <br />
          <Row justify="center" gutter={24}>
            <Col xs={23} sm={12} lg={12}>
              <OpenJobs />
              {/* <ApplicantList /> */}
            </Col>
            <Col xs={23} sm={12} lg={6}>
              <MonthlyTrend />
            </Col>
            <Col xs={23} lg={6}>
              <HiringPipeline />
            </Col>
          </Row>
          {/* <br /> */}
          <HiringBoxes />
          <br />
          {/* <CompanyBoxes />
          <br /> */}
          <br />
          <br />
        </Col>
      </Row>
    </>
  );
};

export default RecruiterDashboard;
