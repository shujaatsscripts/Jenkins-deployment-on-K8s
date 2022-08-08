import React from 'react';
import { StyledLink, NavItemContainer } from './styles/main.styles';

function CustomNavLink({ href, text, active, icon }) {
  return (
    <NavItemContainer active={active}>
      <StyledLink href={href}>{text}</StyledLink>
    </NavItemContainer>
  );
}

export default CustomNavLink;
