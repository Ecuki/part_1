import React, { useState } from "react";
import Header from "../components/Header";

import Statistic from "../components/Unicef/Statistic";

const content = {
  title: "Give Unicafe a feedback",
};

const initialFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
  all: "-",
  average: "-",
  possitive: "-",
};

export default function Unicef() {
  const { title } = content;
  const [feedback, setFeedback] = useState(initialFeedback);

  return (
    <>
      <Header text={title} />
      <Statistic feedback={feedback} setFeedback={setFeedback} />
    </>
  );
}
