import React from "react";
import styled from "styled-components";

const StyledNotification = styled.div`
  color: ${(props) => props.color};
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Notification = ({ message, color }) => {
  if (message === null) {
    return null;
  }

  return <StyledNotification color={color}>{message}</StyledNotification>;
};
export default Notification;
