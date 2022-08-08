import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { ButtonWrapper } from './styles/main.styles';
import {
  Heading,
  StyledRow,
  WhiteCaption,
  ContentContainer,
  StyledColumnBackground,
  LockIcon,
  StyledIllustrationImage,
  IllustrationColumn,
} from '../../components/Auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TopBarAuth from '../../components/Auth/TopBarAuth';
import bgAsset from '../../images/auth/jobSeekerBg.png';
import illustrationAsset from '../../images/illustrations/login.png';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // if reset email does not exist in local storage take user to login
  useEffect(() => {
    if (!localStorage.getItem('reset_email_bcix')) history.push('/login');
  }, []);

  return (
    <StyledRow justify="center">
      <StyledColumnBackground xs={24} bg={bgAsset}>
        <TopBarAuth />
        <Row>
          <Col
            xs={24}
            md={{ span: 12, offset: 1 }}
            lg={{ span: 10, offset: 1 }}
            xl={{ span: 8, offset: 1 }}
          >
            <ContentContainer>
              <Heading main color="#fff">
                Reset Password
              </Heading>
              <WhiteCaption color="#fff">
                Please create a new password.
              </WhiteCaption>
            </ContentContainer>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                inputType="auth"
                placeholder="New Password"
                type="password"
                required
                prefixIcon={<LockIcon />}
              />
              <Input
                inputType="auth"
                placeholder="Re-Type Password"
                type="password"
                required
                prefixIcon={<LockIcon />}
              />
              <br />
              <ButtonWrapper>
                <Button
                  btnType="auth"
                  text="Log In"
                  htmlType="submit"
                  disabled={loading}
                />
              </ButtonWrapper>
            </form>
          </Col>
          <IllustrationColumn
            xs={0}
            lg={{ span: 10, offset: 2 }}
            xl={{ span: 10, offset: 3 }}
          >
            <StyledIllustrationImage src={illustrationAsset} />
          </IllustrationColumn>
        </Row>
      </StyledColumnBackground>
    </StyledRow>
  );
};

export default Main;
