import styled from 'styled-components';

export const MeetingPasswordInput = styled.input`
  //   width: 100%;
  height: 40px;
  padding: 10px 15px;
  font-size: 18px;
  background: transparent;
  font-family: ProductSans-Regular;
  border: 0;
  box-shadow: 0 0 0 1.5px #ddd;
  border-radius: 5px;
  &::placeholder {
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`;
