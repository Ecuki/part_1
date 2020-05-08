import React from 'react';
import _ from 'lodash';
import { firstLetterToUppercase } from '../Utils';

function Table({ state }) {
  return (
    <table>
      <tbody>
        {_.keys(state).map((stat) => {
          return (
            <tr key={stat}>
              <td>
                {firstLetterToUppercase(stat)}
                <span>:</span>
              </td>
              <td>{state[stat]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
