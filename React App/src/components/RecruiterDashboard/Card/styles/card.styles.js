import { Card } from 'antd';
import styled from 'styled-components';

export const Text = styled.p`
  font-family: ProductSans-Regular;  
  font-size: ${props => props.subheading ? '12px' : '18px'};
  text-align: center;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const StyledImage = styled.img`
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 100px;
    height: 100px;
`;

export const StyledCard = styled(Card)`
    minHeight: 305px;
`;