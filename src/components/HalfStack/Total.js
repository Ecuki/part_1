import React from "react";

export default function Total({ parts }) {
  const getTotalExercises = (arr) => {
    let sum = 0;
    arr.map((item) => (sum += item.exercise));
    return sum;
  };

  return <p> Number of exercises {getTotalExercises(parts)}</p>;
}
