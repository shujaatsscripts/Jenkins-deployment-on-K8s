import Button from '../../components/Button';
import React from 'react';
import {
  Description,
  MainBox,
  SubText,
  TitleHeading,
  TopFlexContainer,
} from './styles/desc.styles';
import { useHistory } from 'react-router-dom';

const JobDescription = ({ data }) => {
  const history = useHistory();

  /**
   * Route the applicant to apply job page with details of the job (used to populate details of job on that page)
   */
  const applyJob = () => {
    history.push(`/jobs/apply/${data.uuid}`);
  };

  return (
    <MainBox>
      <TopFlexContainer>
        <div>
          <TitleHeading>{data.jobTitle}</TitleHeading>
          <SubText>{data.jobType}</SubText>
          <SubText>{data.location}</SubText>
        </div>
        <Button
          text="APPLY NOW"
          btnType="seeker_dashboard"
          onClick={applyJob}
        />
      </TopFlexContainer>
      <Description>{data.detailedJobDescription}</Description>
    </MainBox>
  );
};

export default JobDescription;
