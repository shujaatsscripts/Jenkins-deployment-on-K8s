import { Col, Row } from 'antd';
import React from 'react';
import HeadingBanner from '../../components/HeadingBanner';
import { ButtonWrapper, PageContainer } from '../styles/main.styles';
import { LastUpdated, TextContainer, TermsText } from './main.styles';
import Button from '../../components/Button';

const TermsAndCondition = () => {
  return (
    <>
      <HeadingBanner text="Terms and Conditions" />
      <PageContainer>
        <Row>
          <Col xs={24}>
            <LastUpdated>
              Last Updated: &nbsp;<b>09th Nov' 2021</b>
            </LastUpdated>
          </Col>
          <TextContainer xs={24}>
            <TermsText>
              The following terms and conditions apply to all services,
              including website development and design services, (the Services)
              provided by Wombat Creative Limited (Wombat Creative) to the
              Client, in conjunction with any relevant quotation provided to the
              Client by Wombat Creative (Terms), unless otherwise agreed in
              writing. Acceptance of a quote, purchase and/or use of the
              Services shall be considered acceptance of the Terms.
              <br />
              <br />
              Charges for the Services are defined in the project quotation that
              the Client receives from Wombat Creative via email. Quotations are
              valid for a period of 30 days. Wombat Creative reserves the right
              to alter a quotation or decline to provide the relevant Services
              after expiry of the 30 days. Unless agreed otherwise with the
              Client, all website design services require an advance payment of
              a minimum of thirty three (33) percent of the project quotation
              total before the work commences. A second payment of thirty three
              (33) percent is required after the client review and design sign
              off stage, with the remaining percentage of the project quotation
              total due upon completion of the work, prior to upload to the
              server or release of materials. The Client agrees to reimburse
              Wombat Creative for any additional expenses necessary for the
              completion of the work. Expenses may include (but are not limited
              to) purchase of domain names, special fonts and stock photography.
            </TermsText>
          </TextContainer>
          <Col xs={24}>
            <ButtonWrapper>
              <Button
                btnType="auth"
                text="AGREE"
                width="200px"
                size="15px"
                spacing="1.5px"
              />
            </ButtonWrapper>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default TermsAndCondition;
