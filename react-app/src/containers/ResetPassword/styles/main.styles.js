import styled from 'styled-components';

export const ResendWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
export const ResendText = styled.p`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: underline;
  font-size: 18px;
  font-family: ProductSans-Regular;
  cursor: pointer;
`;
export const ButtonWrapper = styled.div`
  margin-top: 4rem;
`;
