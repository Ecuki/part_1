import React from "react";

export default function Part({ part: { name, exercise } }) {
  return (
    <p>
      {name} {exercise}
    </p>
  );
}
