import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../../../images/whiteLogo.svg';
import { StyledNavbar } from './styles/main.styles';
// import styled from 'styled-components';

const Main = ({ history }) => {
  // const [activeLink, setActiveLink] = useState(history.location.pathname);
  // const getActiveBoolean = (current) => activeLink === current;

  return (
    <StyledNavbar expand="lg" activeKey="/login">
      <Navbar.Brand href="/login">
        <img src={logo} width="95" alt="logo" />
      </Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="">
        <NavWrapper>
          <Nav
            className="mr-auto"
            activeKey={activeLink}
            onSelect={(s) => setActiveLink(s)}
          >
            <CustomNavLink
              href={urls.industries}
              text="Industries"
              active={getActiveBoolean(urls.industries)}
            />
            <CustomNavLink
              href={urls.services}
              text="Services"
              active={getActiveBoolean(urls.services)}
            />
            <CustomNavLink
              href={urls.customers}
              text="Customers"
              active={getActiveBoolean(urls.customers)}
            />
            <CustomNavLink
              href={urls.about_us}
              text="About Us"
              active={getActiveBoolean(urls.about_us)}
            />
            <CustomNavLink
              href={urls.resources}
              text="Resources"
              active={getActiveBoolean(urls.resources)}
            />
            <CustomNavLink
              href={urls.partners}
              text="Partners"
              active={getActiveBoolean(urls.partners)}
            />
            <a
              style={{ display: 'flex', alignItems: 'center' }}
              href={urls.get_started}
            >
              <NavButton>GET STARTED</NavButton>
            </a>
          </Nav>
        </NavWrapper>
      </Navbar.Collapse>
     */}
    </StyledNavbar>
  );
};

// const NavButton = styled(Button)`
//   background-image: 'linear-gradient(to right, #332ed0, #098ce7) !important';
//   color: blue;
//   height: 35px;
//   font-size: 13px;
//   padding: 0 20px;
//   border-radius: 40px;

//   &:hover {
//     opacity: 0.9;
//   }
//   @media (max-width: 575px) {
//     margin-top: 20px;
//   }
// `;
// const NavWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-wrap: 'wrap';
//   @media (min-width: 991px) {
//     flex-direction: column;
//     align-items: flex-end;
//   }
// `;

export default Main;
