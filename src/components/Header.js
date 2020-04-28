import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  padding: 30px 0 30px;
  letter-spacing: 2px;
  font-size: ${(props) => (props.type === "main" ? "0.7rem" : "0.5rem")};
`;

function Header({ text, type = "main" }) {
  return (
    <StyledHeader type={type}>
      <h1>{text}</h1>
    </StyledHeader>
  );
}

export default Header;
