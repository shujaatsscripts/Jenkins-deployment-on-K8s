import styled from 'styled-components';

export const TextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
export const TextAreaLabel = styled.label`
  // font-size: ${(props) => (props.smallLabel ? '18px' : '22px')};
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  margin-bottom: 10px;
`;

export const TextAreaDiv = styled.div`
  width: 100%;
  position: relative;
  padding: 15px;
  box-shadow: 0 0 0 1.5px #eee;
  // opacity: 0.4;
`;

export const StyledTextArea = styled.textarea`
  min-height: ${(props) => props.height || '200px'};
  width: 100%;
  font-size: 14px;
  // font-size: ${(props) => (props.smallLabel ? '18px' : '20px')};
  font-family: 'Montserrat-Regular';
  border: 0;
  @media (max-width: 768px) {
    height: 55px;
  }
  @media (max-width: 575px) {
    height: 50px;
  }
  &:focus {
    outline: none;
  }
`;

export const WordsLeft = styled.span`
  display: flex;
  justify-content: flex-end;
`;
