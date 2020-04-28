import React from "react";
import _ from "lodash";

import { firstLetterToUppercase } from "../Utils";

export default function Table({ feedback }) {
  return (
    <table>
      <tbody>
        {_.keys(feedback).map((stat) => {
          return (
            <tr key={stat}>
              <td>{firstLetterToUppercase(stat)}:</td>
              <td>{feedback[stat]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
