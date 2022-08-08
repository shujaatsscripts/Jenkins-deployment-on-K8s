import { ClockCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import FullPageLoader from '../../components/FullPageLoader';
import TopCard from '../../components/RecruiterDashboard/Card';
import candidateSearch from '../../images/recruiterDashboard/candidateSearch.svg';
import job from '../../images/recruiterDashboard/job.svg';
import notification from '../../images/recruiterDashboard/notification.svg';
import axios, { baseUrl } from '../../utils/axios';
import { Text } from './styles/main.styles';

const Main = () => {
  const { Column } = Table;

  const pieData1 = [
    { id: '1', name: 'Male', value: 75 },
    { id: '2', name: 'Female', value: 25 },
  ];
  const pieData2 = [
    { id: '1', name: 'Success', value: 75 },
    { id: '2', name: 'Failure', value: 25 },
  ];

  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [openJobs, setOpenJobs] = useState(0);
  const [totalHiringGraphData, setTotalHiringGraphData] = useState([]);
  const [performanceGraphData, setPerformanceGraphData] = useState([]);
  const [jobsPosted, setJobsPosted] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [hiringPipeline, setHiringPipeline] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiCalls = async () => {
      const totalJobs = axios.get(
        `${baseUrl}/api/job-description/jobs/total/organization`
      );
      const openJobs = axios.get(
        `${baseUrl}/api/job-description/jobs/open/organization`
      );
      const totalHiringGraphData = axios.get(
        `${baseUrl}/api/job-description/jobs/hiring/organization/graph`
      );
      const performanceGraphData = axios.get(
        `${baseUrl}/api/job-description/jobs/hiring/recruiter/graph`
      );
      const jobsPosted = axios.get(
        `${baseUrl}/api/job-description/jobs/posted/organization?page=0&size=5`
      );
      const candidates = axios.get(
        `${baseUrl}/api/candidate/organization?page=0&size=5`
      );
      const hiringPipeline = axios.get(
        `${baseUrl}/api/job-description/jobs/hiring-pipeline`
      );
      const resp = await Promise.all([
        totalJobs,
        openJobs,
        totalHiringGraphData,
        performanceGraphData,
        jobsPosted,
        candidates,
        hiringPipeline,
      ]);
      // console.log(resp[6])
      setTotalJobs(resp[0].data.count);
      setOpenJobs(resp[1].data.count);
      setTotalHiringGraphData(resp[2].data);
      setPerformanceGraphData(resp[3].data);
      setJobsPosted(resp[4].data.rows);
      setCandidates(resp[5].data.rows);
      setHiringPipeline(resp[6].data);
      setLoading(false);
      // resetFields();
      // if (res && res.status === 200) {
      //   setLoading(false);
      //   history.push('/jobs');
      // }
    };
    apiCalls();
  }, []);

  const calculateTimeDiff = (date) => {
    const a = Date.now();
    const b = new Date(date).getTime();
    let diff = (a - b) / 3600000;
    if (diff > 24) {
      diff = Math.abs(Math.floor(diff / 24));
      return `${diff} day(s) ago`;
    }
    diff = Math.abs(Math.floor(diff * 60));
    if (diff >= 60) {
      diff = Math.abs(Math.floor(diff / 60));
      return `${diff} hr(s) ago`;
    }
    return `${diff} min(s) ago`;
  };

  return !loading ? (
    <div
      style={{
        // backgroundColor: '#F4F6F8',
        height: '100vh',
        minHeight: '100vh',
        marginLeft: '60px',
        marginRight: '60px',
        marginTop: '30px',
      }}
    >
      <Row justify="space-between" gutter={24}>
        <TopCard
          cardType="top"
          heading="Notifications"
          image={notification}
          subText="It seems like you do not have any notifications yet. You can change it from settings"
        />
        <TopCard
          cardType="top"
          heading="Create a job"
          image={job}
          subText="Create a job, shortlist candidates and hire the perfect employee for your post."
        />
        <TopCard
          cardType="top"
          heading="Create Candidate"
          image={candidateSearch}
          subText="Create a job, shortlist candidates and hire the perfect employee for your post."
        />
      </Row>

      <Row justify="space-between" gutter={24} style={{ paddingTop: '24px' }}>
        <Col xs={24} lg={6}>
          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              minHeight: '186px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Total Jobs</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>
            <Text main>{totalJobs}</Text>
            {/* <Text subheading description>description</Text> */}
          </Card>

          <br />

          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              minHeight: '186px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Open Jobs</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>
            <Text main>{openJobs}</Text>
            {/* <Text subheading description>description</Text> */}
          </Card>
        </Col>

        <Col xs={24} lg={6}>
          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              overflowY: 'scroll',
              maxHeight: '400px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Hiring Pipeline</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>

            <Table dataSource={hiringPipeline}>
              <Column title="Job Title" dataIndex="jobTitle" key="jobTitle" />
              <Column
                dataIndex="status"
                key="status"
                render={(status) => (
                  <>
                    {status === 'OPEN' ? (
                      <Tag
                        color="success"
                        key={status}
                        style={{ borderRadius: '25px' }}
                      >
                        {status}
                      </Tag>
                    ) : (
                      <Tag
                        color="default"
                        key={status}
                        style={{ borderRadius: '25px' }}
                      >
                        {status}
                      </Tag>
                    )}
                  </>
                )}
              />
            </Table>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              overflowX: 'scroll',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Total Hirings</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>
            <BarChart width={500} height={300} data={totalHiringGraphData}>
              <XAxis dataKey="name" stroke="#999999" />
              <YAxis stroke="#999999" />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="hiring" barSize={50} fill="#005DE8" />
            </BarChart>
          </Card>
        </Col>
      </Row>

      <br />
      <Row justify="space-between" gutter={24}>
        <Col xs={24} lg={12}>
          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text>Jobs Posted</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'scroll',
                overflowY: 'hidden',
                paddingBottom: '20px',
              }}
            >
              {!jobsPosted.length ? (
                <div style={{ margin: 'auto' }}>
                  <Text>No Data to Show</Text>
                </div>
              ) : (
                jobsPosted.map((el, index) => (
                  <Card
                    key={index}
                    style={{
                      boxShadow:
                        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                      textAlign: 'center',
                      marginLeft: '10px',
                      marginRight: '10px',
                      minWidth: '117px',
                      maxHeight: '180px',
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: '#E7EBFC',
                        verticalAlign: 'middle',
                        color: '#005DE8',
                      }}
                      size="large"
                    >
                      {el.jobTitle.charAt(0)}
                    </Avatar>
                    <Text
                      style={{
                        fontSize: '10px',
                        textAlign: 'center',
                        paddingTop: '5px',
                        color: '#C0C0C0',
                      }}
                    >
                      ID: {el.id}
                    </Text>
                    <Text style={{ fontSize: '12px', textAlign: 'center' }}>
                      {el.jobTitle}
                    </Text>
                    <Text
                      style={{
                        fontSize: '10px',
                        textAlign: 'center',
                        color: '#C0C0C0',
                      }}
                    >
                      {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}> */}
                      <ClockCircleOutlined style={{ fontSize: '16px' }} />{' '}
                      {calculateTimeDiff(el.createdAt)}
                      {/* </div> */}
                    </Text>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text>Candidates</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                overflowX: 'scroll',
                overflowY: 'hidden',
                paddingBottom: '20px',
              }}
            >
              {!candidates.length ? (
                <div style={{ margin: 'auto' }}>
                  <Text>No Data to Show</Text>
                </div>
              ) : (
                candidates.map((el, index) => (
                  <Card
                    key={index}
                    style={{
                      boxShadow:
                        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                      textAlign: 'center',
                      marginLeft: '10px',
                      marginRight: '10px',
                      minWidth: '117px',
                      maxHeight: '180px',
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: '#E7EBFC',
                        verticalAlign: 'middle',
                        color: '#005DE8',
                      }}
                      size="large"
                    >
                      {el.candidateName.charAt(0)}
                    </Avatar>
                    <Text
                      style={{
                        fontSize: '10px',
                        textAlign: 'center',
                        paddingTop: '5px',
                        color: '#C0C0C0',
                      }}
                    >
                      ID: {el.id}
                    </Text>
                    <Text style={{ fontSize: '12px', textAlign: 'center' }}>
                      {el.candidateName}
                    </Text>
                    <Text
                      style={{
                        fontSize: '10px',
                        textAlign: 'center',
                        color: '#C0C0C0',
                        paddingTop: '-5px',
                      }}
                    >
                      {el.title}
                    </Text>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Row justify="space-between" gutter={24} style={{ marginTop: '20px' }}>
        <Col xs={24} lg={12}>
          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              overflowX: 'scroll',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>My Performance</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>
            <BarChart width={500} height={300} data={performanceGraphData}>
              <XAxis dataKey="name" stroke="#999999" />
              <YAxis stroke="#999999" />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="hiring" barSize={50} fill="#005DE8" />
            </BarChart>
          </Card>
        </Col>

        <Col xs={24} lg={6}>
          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              minHeight: '392px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Gender</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart width={252} height={300}>
                <text
                  x={126}
                  y={150}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily: 'ProductSans-Regular',
                    fontSize: '45px',
                  }}
                >
                  75%
                </text>
                <Pie
                  data={pieData1}
                  dataKey="value"
                  innerRadius="85%"
                  outerRadius="100%"
                  fill="#FFC300"
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  blendStroke
                >
                  <Cell key="Male" fill="#00CE45" />
                </Pie>
                <br />
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={20}
                  iconType="circle"
                  margin={{ top: 15 }}
                />
              </PieChart>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={6}>
          <Card
            style={{
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              minHeight: '392px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Placement rate</Text>
              <EllipsisOutlined
                style={{ fontSize: '26px', color: '#B9B9B9' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart width={252} height={300}>
                <text
                  x={126}
                  y={150}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily: 'ProductSans-Regular',
                    fontSize: '45px',
                  }}
                >
                  75%
                </text>
                <Pie
                  data={pieData2}
                  dataKey="value"
                  innerRadius="85%"
                  outerRadius="100%"
                  fill="#E0E0E0"
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  blendStroke
                >
                  <Cell key="Success" fill="#37A6F3" />
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={20}
                  iconType="circle"
                  margin={{ top: '20px', left: 0, right: 0, bottom: 0 }}
                />
              </PieChart>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    <FullPageLoader />
  );
};

export default Main;
