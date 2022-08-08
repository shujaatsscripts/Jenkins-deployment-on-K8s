import styled from 'styled-components';

export const SearchJobsContainer = styled.div`
  height: 36px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  width: 100%;
  margin-right: 1rem;
  padding: 0 1rem;
  display: flex;
`;

export const SearchJobsInput = styled.input`
  height: 100%;
  width: 90%;
  margin-right: 10px;
  border: none;
  outline: none;
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  @media (max-width: 1100px) {
    width: 85%;
  }
`;

export const SearchJobsLabel = styled.label`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  width: 10%;
  font-weight: 600;
  display: flex;
  align-items: center;
  @media (max-width: 1100px) {
    width: 15%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
