import React from 'react';
import {
  MainBox,
  TitleHeading,
  SubText,
  Description,
} from './styles/job.styles';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const Job = ({ data, active, onClick }) => {
  return (
    <MainBox active={active} onClick={onClick}>
      <TitleHeading>{data.jobTitle}</TitleHeading>
      <SubText>{data.jobType}</SubText>
      <SubText>{data.location}</SubText>
      <Description>
        <Paragraph ellipsis={{ rows: 3 }}>
          {data.detailedJobDescription}
        </Paragraph>
      </Description>
    </MainBox>
  );
};

export default Job;
