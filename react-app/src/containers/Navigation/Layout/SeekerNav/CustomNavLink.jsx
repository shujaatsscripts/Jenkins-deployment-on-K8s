import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { StyledLink, NavItemContainer } from "../styles/navbar.styles";
import axios, { baseUrl } from "../../../../utils/axios";

function CustomNavLink({
  href,
  text,
  active,
  icon,
  colorIcon = null,
  setActiveLink,
  ...rest
}) {
  const history = useHistory();
  return (
    <StyledLink
      active={active}
      as={Link}
      to={href}
      {...rest}
      onClick={() => {
        setActiveLink(href);
        // window.location.replace(`https://portal.3cix.com/${href}`);
        // window.location.replace(`http://localhost:3001/${href}`);
      }}
    >
      {/* <NavItemContainer active={active}> */}
      <img
        src={active ? icon : colorIcon ? colorIcon : icon}
        alt={text + "icon"}
        style={{
          width: "16px",
          height: "16px",
          // border: "1px solid black",
          padding: "0px",
        }}
      />
      <br />
      {/* <StyledLink href={href} active={active} {...rest}> */}

      {text}
      {/* <br /> */}
      {/* </NavItemContainer> */}
    </StyledLink>
  );
}

export default CustomNavLink;