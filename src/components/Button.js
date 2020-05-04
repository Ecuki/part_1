import React from "react";
import { Button } from "semantic-ui-react";

export default function CustomButton(props) {
  const {
    button: { text, color, size },
  } = props;

  return (
    <Button color={color} size={size} {...props}>
      {text}
    </Button>
  );
}
