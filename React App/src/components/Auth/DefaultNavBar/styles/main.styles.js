import { Row } from 'antd';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

export const ContentContainer = styled(Row)``;

export const StyledNavbar = styled(Navbar)`
  background-color: #1877f2 !important;
  padding: 0rem 2rem;
  width: 100%;
  // position: absolute;
  // top: 0;
  // z-index: 1110;
  @media (min-width: 768px) {
    height: 85px;
  }
  @media (max-width: 992px) {
    padding: 1rem 2rem 0rem 2rem;
  }
  > button.navbar-toggler {
    &:focus {
      box-shadow: none !important;
    }
  }
`;

export const NavItemContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.active && '5px solid white'};
  margin: 0 3px;
  @media (max-width: 992px) {
    border-bottom: none;
  }
`;

export const StyledLink = styled(Nav.Link)`
  color: white !important;
  margin: 0 5px;
  padding: 1.5rem 0;
  height: 100%;
  text-decoration: none !important;
  opacity: 1;
  @media (max-width: 1024px) {
    margin: 0 5px;
  }
  &:hover {
    opacity: 0.6;
  }
`;
