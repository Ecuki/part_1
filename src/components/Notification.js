import React from "react";
import { Message } from "semantic-ui-react";

const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  }

  return (
    <Message color={color} size={"tiny"}>
      {message}
    </Message>
  );
};
export default Notification;
