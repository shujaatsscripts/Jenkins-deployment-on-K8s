import styled from 'styled-components';

export const WithLabelInput = styled.input`
  width: 100%;
  height: 60px;
  padding: 20px;
  font-size: ${(props) => (props.smallLabel ? '18px' : '22px')};
  background: transparent;
  font-family: ProductSans-Regular;
  border: 0;
  box-shadow: 0 0 0 1.5px #ddd;
  border-radius: 5px;
  background-color: ${(props) => props.disabled && '#eee'};
  cursor: ${(props) => props.disabled && 'not-allowed'};
  &::placeholder {
    opacity: 0.4;
  }

  @media (max-width: 768px) {
    height: 55px;
  }
  @media (max-width: 575px) {
    height: 50px;
    font-size: 18px;
  }
  &:focus {
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: ${(props) => (props.smallLabel ? '18px' : '22px')};
  font-family: ProductSans-Regular;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

export const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 1rem 0;
  //   position: relative;
  border: 1px solid black;
`;
