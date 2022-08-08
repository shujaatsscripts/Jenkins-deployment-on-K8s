import styled from 'styled-components';
import {} from 'antd';

export const MainBox = styled.div`
  background-color: ${(props) => (props.active ? '#d0e4fd' : '#e9e9e9')};
  border-radius: 10px;
  padding: 1.5rem;
  font-family: 'Montserrat-Regular';
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.2s ease-in-out;
  height: 220px;
  border: 0.4px solid #bbb;

  &:hover {
    background-color: #d0e4fd;
    transform: scale(1.01);
  }
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
  margin-top: 20px;
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;
