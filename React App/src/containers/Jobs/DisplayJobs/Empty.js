import React from 'react';
import { Container, Text, StyledImage } from './styles/empty.styles';
import Button from '../../../components/Button';
import noJobs from '../../../images/noJobs.svg';

const Empty = ({ history, expired }) => {
  return (
    <Container>
      <StyledImage src={noJobs} />
      <br />
      <br />
      <Text>It seems like you don't have any jobs posted yet.</Text>
      <Button
        text="Post Job"
        btnType="basic_gradient"
        width="200px"
        onClick={() => history.push('/job/add')}
        disabled={expired}
      />
    </Container>
  );
};

export default Empty;
