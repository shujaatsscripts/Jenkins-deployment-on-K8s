import styled from 'styled-components';

export const MainBox = styled.div`
  border-radius: 15px;
  border: 0.4px solid #bbb;
  padding: 1.75rem;
  font-family: 'Montserrat-Regular';
  min-height: 450px;
`;

export const TopFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

export const TitleHeading = styled.h2`
  font-weight: 700;
  font-size: 18px;
  margin: 0 0 7px 0;
  padding: 0;
`;

export const SubText = styled.h4`
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 6px 0;
  padding: 0;
`;

export const Description = styled.pre`
  font-size: 14px;
  font-family: Montserrat-Regular;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;
