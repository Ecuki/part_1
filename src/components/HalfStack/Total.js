import React from "react";

import { arrSum } from "../../Utils";
import { StyledPart } from "./Part";

function Total({ parts }) {
  const getTotalExercises = (arr) => {
    return arrSum(parts.map((part) => part.exercises));
  };

  return (
    <StyledPart>
      Number of exercises <span>{getTotalExercises(parts)}</span>
    </StyledPart>
  );
}

export default Total;
