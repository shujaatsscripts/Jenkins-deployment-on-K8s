import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Typography } from 'antd';
import { Fragment } from 'react';
import {
  CellText,
  OptionsText,
  ResponsiveViewHeading,
  DropDownIcon,
} from '../../../components/Table';
import { SkillsBox } from './table.styled.js';
import preview from '../../../images/eye.png';
import schedule from '../../../images/dropdown/addResume.png';
import reject from '../../../images/dropdown/closeJob.png';

const { Paragraph } = Typography;

const renderText = (text) => (
  <Paragraph ellipsis={{ rows: 1 }} style={{ padding: 0, margin: 0 }}>
    <CellText>{text < 0 ? 0 : text}</CellText>
  </Paragraph>
);
const columns = (showModal) => {
  return [
    {
      title: () => (
        <Fragment>
          <ResponsiveViewHeading> Name</ResponsiveViewHeading>&nbsp;
          <br />
          <ResponsiveViewHeading> Email</ResponsiveViewHeading>&nbsp;
          <br />
          {/* <ResponsiveViewHeading> Summary</ResponsiveViewHeading>&nbsp;
          <br /> */}
          {/* <ResponsiveViewHeading>
            Total Experience (Years)
          </ResponsiveViewHeading>
          &nbsp;
          <br /> */}
          <ResponsiveViewHeading>Location</ResponsiveViewHeading>
          &nbsp;
          <br />
          <ResponsiveViewHeading
            style={{ flexWrap: 'wrap', width: '250px' }}
          >
            Skills
          </ResponsiveViewHeading>
          &nbsp;
          <ResponsiveViewHeading>Experience</ResponsiveViewHeading>
          &nbsp;
        </Fragment>
      ),
      render: (record) => (
        <Fragment>
          <ResponsiveViewHeading> Name:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.name}</CellText>
          <br />
          <ResponsiveViewHeading> Similarity:</ResponsiveViewHeading>
          &nbsp;
          <CellText>{record.Similarity}</CellText>
          <br />
          <ResponsiveViewHeading> Email:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.Email}</CellText>
          <br />
          {/* <ResponsiveViewHeading> Summary:</ResponsiveViewHeading>&nbsp;
          <CellText>{record.summary}</CellText>
          <br /> */}
          {/* <ResponsiveViewHeading>
            Total Experience (Years):
          </ResponsiveViewHeading>
          &nbsp; */}
          {/* <CellText>{record.total_exp < 0 ? 0 : record.total_exp}</CellText>
          <br /> */}
          <ResponsiveViewHeading> Location:</ResponsiveViewHeading>
          &nbsp;
          <CellText>{record.location}</CellText>
          <br />
          <ResponsiveViewHeading> Skills:</ResponsiveViewHeading>
          &nbsp;
          <CellText>{record.Skills}</CellText>
          <br />
          <ResponsiveViewHeading> Experience:</ResponsiveViewHeading>
          &nbsp;
          <CellText>{record.Experience}</CellText>
          <br />
          <ResponsiveViewHeading> View CV:</ResponsiveViewHeading>
          &nbsp;
          <CellText>
            <a
              href={record.Resume_URL}
              target="_blank"
              rel="noreferrer"
            >
              <img src={preview} alt="preview" width="50" />
            </a>
          </CellText>
          <span>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <OptionsText onClick={() => showModal(record)}>
                    <DropDownIcon src={schedule} />
                    Schedule Interview
                  </OptionsText>

                  <OptionsText>
                    <DropDownIcon src={reject} />
                    Reject
                  </OptionsText>
                </Menu>
              }
            >
              <MoreOutlined
                style={{ fontSize: 18, cursor: 'pointer' }}
              />
            </Dropdown>
          </span>
        </Fragment>
      ),
      responsive: ['xs'],
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.7)',
            textTransform: 'capitalize',
            fontFamily: 'ProductSans-Regular',
          }}
        >
          {text}
        </div>
      ),
      responsive: ['sm'],
    },

    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      render: renderText,
      responsive: ['sm'],
    },
    // {
    //   title: "Summary",
    //   dataIndex: "summary",
    //   key: "summary",
    //   render: renderText,
    //   ellipsis: true,
    //   responsive: ["sm"],
    // },
    // {
    //   title: "Total Experience (Years)",
    //   dataIndex: "total_exp",
    //   key: "total_exp",
    //   render: renderText,
    //   responsive: ["sm"],
    // },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text) => (
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.7)',
            textTransform: 'capitalize',
            fontFamily: 'ProductSans-Regular',
          }}
        >
          {text}
        </div>
      ),
      responsive: ['sm'],
    },
    {
      title: 'Skills',
      width: 300,
      dataIndex: 'Skills',
      key: 'Skills',
      render: (text) => <SkillsBox>{text}</SkillsBox>,
      responsive: ['sm'],
    },
    {
      title: 'Experience',
      width: 120,
      dataIndex: 'Experience',
      key: 'Experience',
      render: (text) => (
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.7)',
            textTransform: 'capitalize',
            fontFamily: 'ProductSans-Regular',
          }}
        >
          {text}
        </div>
      ),
      responsive: ['sm'],
    },
    {
      title: 'Ranking %',
      dataIndex: 'Similarity',
      key: 'Similarity',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.Similarity - b.Similarity,
      render: (text) => (
        <div
          style={{
            fontFamily: 'ProductSans-Regular',
            color: 'rgba(0,0,0,0.7)',
          }}
        >
          {text + '%'}
        </div>
      ),
      responsive: ['sm'],
    },
    {
      title: 'View CV',
      // key: "Resume_URL",
      // dataIndex: "Resume_URL",
      render: (record) => (
        <CellText>
          <a
            href={record.Resume_URL}
            target="_blank"
            rel="noreferrer"
          >
            <img src={preview} alt="preview" width="50" />
          </a>
        </CellText>
      ),
      responsive: ['sm'],
    },
    {
      title: '',
      render: (record) => (
        <span>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <OptionsText onClick={() => showModal(record)}>
                  <DropDownIcon src={schedule} />
                  Schedule Interview
                </OptionsText>

                <OptionsText>
                  <DropDownIcon src={reject} />
                  Reject
                </OptionsText>
              </Menu>
            }
          >
            <MoreOutlined
              style={{ fontSize: 18, cursor: 'pointer' }}
            />
          </Dropdown>
        </span>
      ),
      responsive: ['sm'],
    },
  ];
};

export default columns;
