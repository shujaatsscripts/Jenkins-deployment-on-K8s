import styled from 'styled-components';

export const SubHeading = styled.h3`
  font-size: 24px;
  font-family: ProductSans-Regular;
  margin: 10px 0;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

export const DetailText = styled.p`
  font-size: 20px;
  font-family: ProductSans-Regular;
  color: #000;
  opacity: 0.5;
`;
