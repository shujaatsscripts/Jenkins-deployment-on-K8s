import styled from "styled-components";

export const StyledImg = styled.img`
  margin-right: 10px;
  width: 40px;
`;

export const StyledAnchor = styled.a`
  color: black;
  text-decoration: none;
  font-family: Montserrat-Regular;
  font-size: 16px;
  &:hover {
    color: white;
    text-decoration: none;
    opacity: 0.9;
  }
  .anticon {
    margin-left: 5px;
  }
`;
export const StyledDiv = styled.div`
  @media (max-width: 575px) {
    margin: 1rem 10% 0.5rem 10%;
  }
`;
