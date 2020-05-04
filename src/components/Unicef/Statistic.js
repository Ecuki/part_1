import React from "react";

import { calcStats } from "../../Utils";

import Button from "../Button";
import Header from "../Header";
import Table from "../Table";

const content = {
  subTitle: "Statistics:",
  buttons: [
    {
      text: "bad",
      color: "red",
    },
    {
      text: "neutral",
    },

    {
      text: "good",
      color: "green",
    },
  ],
  noFeedback: "No feedback given",
};

function Statistic({ feedback, setFeedback }) {
  const { subTitle, buttons, noFeedback } = content;
  const { good, bad, neutral, all } = feedback;

  const handleClick = (text) => () => {
    let newFeedback;
    switch (text) {
      case "good":
        newFeedback = { ...feedback, good: good + 1 };
        break;
      case "neutral":
        newFeedback = { ...feedback, neutral: neutral + 1 };
        break;
      case "bad":
        newFeedback = { ...feedback, bad: bad + 1 };
        break;
      default:
        newFeedback = feedback;
    }

    newFeedback = {
      ...newFeedback,
      ...calcStats(newFeedback),
    };
    setFeedback(newFeedback);
  };

  return (
    <>
      <div>
        {buttons.map((button) => (
          <Button
            key={button.text}
            button={button}
            onClick={handleClick(button.text)}
          />
        ))}
      </div>
      <Header text={subTitle} type={"secondary"} />
      {all === "-" ? <p>{noFeedback}</p> : <Table feedback={feedback} />}
    </>
  );
}
export default Statistic;
