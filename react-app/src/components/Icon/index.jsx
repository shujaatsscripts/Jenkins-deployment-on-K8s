import styled from 'styled-components';

const Main = ({ src, margin, bg }) => {
  return (
    <Background margin={margin} bg={bg}>
      <StyledImage src={src} alt="icon" />
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.bg ? props.bg : '#2e4dee')};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: ${(props) => props.margin && props.margin};
  @media (max-width: 425px) {
    width: 36px;
    height: 36px;
  }
`;

const StyledImage = styled.img`
  width: 18px;
  height: 18px;
  @media (max-width: 425px) {
    width: 14px;
    height: 14px;
  }
`;

export default Main;
