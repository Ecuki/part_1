import React from "react";
import Part from "./Part.js";

export default function Content({ parts }) {
  return parts.map((part) => <Part key={part.id} part={part} />);
}
