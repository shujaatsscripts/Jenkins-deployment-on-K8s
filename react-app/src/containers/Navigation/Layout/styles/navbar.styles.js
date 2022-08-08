import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledNavbar = styled(Navbar)`
  padding: 0px 2rem;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  //background-image: linear-gradient(to right, #332ed0, #098ce7) !important;
  background-color: white !important; //#1877f2 !important;
  @media (max-width: 992px) {
    padding: 1rem 2rem;
  }
  > button.navbar-toggler {
    &:focus {
      box-shadow: none !important;
    }
  }
`;
export const NavItemContainer = styled.div`
  background: ${(props) => (props.active ? "#1877f2" : "white")};
  padding-top: 7px;
  padding-bottom: 5px;
  border-right: 1px solid #f3f6ef;
  text-align: center;
  width: 20%;
  @media (max-width: 992px) {
    border-bottom: none;
  }
`;
// export const StyledLink = styled(Link)`
export const StyledLink = styled(Nav.Link)`
  color: ${(props) => (props.active ? "white !important" : "grey !important")};
  /* margin: 0 20px 10px 20px; */
  padding: 7px 5px;
  font-size: 12px; /* padding: 7px 15px 7px 15px; */ /* height: 100%; */
  text-decoration: none !important;
  @media (max-width: 1024px) {
    margin: 0 5px;
  }
  &:hover {
    opacity: 0.8;
    background: #1877f2;
    color: white !important;
  }
  background: ${(props) => (props.active ? "#1877f2" : "white")};
  /* padding-top: 4px; */
  /* padding-bottom: 5px; */
  border-right: 1px solid #f3f6ef;
  text-align: center;
  width: 20%;
  @media (max-width: 992px) {
    border-bottom: none;
  }
`;
export const StyledForm = styled(Form)`
  display: flex;
  padding: 0 10px;
  background: #2b78ec;
  align-items: center;
  @media (max-width: 575px) {
    width: 90%;
    margin: 0.5rem 10%;
  }
`;
export const NavbarContentDiv = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
export const StyledInput = styled(FormControl)`
  background: #2b78ec;
  color: white;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: ProductSans-Regular;
  padding: 10px;
  opacity: 0.6;
  border-radius: 5px;
  &:disabled {
    background: #2b78ec;
    cursor: not-allowed;
    opacity: 0.6;
  }
  &::placeholder {
    color: white;
  }
  &:active {
    background: #2b78ec;
    color: white;
  }
  &:focus {
    background: #2b78ec;
    color: white;
  }
`;
