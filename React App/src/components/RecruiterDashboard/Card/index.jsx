import { Col } from 'antd';
import React from 'react';
import { StyledCard, StyledImage, Text } from './styles/card.styles';


const Card = ({ cardType, heading, image, subText }) => {
  const getCard = () => {

    switch (cardType) {
      case 'top':
        return (
          <Col xs={24} lg={8}>
            <StyledCard style={{
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }}>
              <Text>{heading}</Text>
              <StyledImage src={image} />
              <br />
              <br />
              <Text subheading>{subText}</Text>
            </StyledCard>
          </Col>
        )
      case 'menu':
        return (
          <Col xs={24} lg={7}>
            <StyledCard style={{
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }}>
              <Text>{heading}</Text>
              <StyledImage src={image} />
              <br />
              <br />
              <Text subheading>{subText}</Text>
            </StyledCard>
          </Col>
        )
      default:
        return (
          <Col xs={24} lg={7}>
            <StyledCard style={{
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }}>
              <Text>{heading}</Text>
              <StyledImage src={image} />
              <br />
              <br />
              <Text subheading>{subText}</Text>
            </StyledCard>
          </Col>
        )
    }
  }
  return <>{getCard()}</>;
}

export default Card
