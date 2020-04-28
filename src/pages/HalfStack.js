import React from "react";
import Header from "../components/Header";
import Content from "../components/HalfStack/Content";
import Total from "../components/HalfStack/Total";

const course = "Half Stack application development";
const parts = [
  { id: 1, name: "Fundamentals of React", exercise: 10 },
  { id: 2, name: "Using props to pass data", exercise: 7 },
  { id: 3, name: "State of a component", exercise: 14 },
];

const HalfStack = () => {
  return (
    <>
      <Header text={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};
export default HalfStack;
