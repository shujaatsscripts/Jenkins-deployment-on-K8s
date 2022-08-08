import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background-color: #f3f3f3;
  height: 82vh;
`;

export const Text = styled.p`
  font-family: ProductSans-Regular;
  font-size: 18px;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const StyledImage = styled.img`
  @media (max-width: 480px) {
    width: 100%;
  }
`;
