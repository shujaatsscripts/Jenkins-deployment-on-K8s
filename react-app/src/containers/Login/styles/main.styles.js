import styled from 'styled-components';
import GoogleButton from 'react-google-button';

export const ForgotPasswordWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
export const ForgotPasswordText = styled.p`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: underline;
  font-size: 18px;
  font-family: ProductSans-Regular;
  cursor: pointer;
`;
export const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

export const StyledGoogleButton = styled(GoogleButton)`
  span {
    text-decoration: none !important;
  }
`;
