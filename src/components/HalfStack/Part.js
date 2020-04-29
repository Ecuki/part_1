import React from "react";
import styled from "styled-components";

export const StyledPart = styled.p`
  padding: 5px 0;
  width: 50%;
  min-width: 300px;
  display: flex;
  justify-content: space-between;
`;

export default function Part({ part: { name, exercises } }) {
  return (
    <StyledPart>
      {name} <span>{exercises}</span>
    </StyledPart>
  );
}
