import React, { useState, useEffect } from "react";
import SearchBox from "./Search";
import TableData from "./Table";
import Mytable from "./Mytable";
import ProfileDetail from "./ProfileDetail";
import { Row, Col } from "antd";
let excelData = [];
const Network = () => {
  const [dataSource, setDataSource] = useState([]);

  const data = [
    {
      key: "1",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "2",
      username: "Hassaan Bhia",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "3",
      username: "Raza",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "4",
      username: "Hassaan Bhia",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "5",
      username: "Hassaan Bhia",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "6",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "7",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "8",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "9",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "10",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
    {
      key: "11",
      username: "Raza Raheem",
      company_name: "Nets-International",
      country: "Pakistan",
    },
  ];

  useEffect(() => {
    setDataSource(data);
    excelData = data;
  }, []);

  return (
    <div style={{ padding: "10px 40px" }}>
      <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
        <Col span={16}>
          <SearchBox excelData={excelData} setDataSource={setDataSource} />
          <Mytable dataSource={dataSource} />
        </Col>
        <Col span={8}>
          <ProfileDetail />
        </Col>
      </Row>
    </div>
  );
};

export default Network;
