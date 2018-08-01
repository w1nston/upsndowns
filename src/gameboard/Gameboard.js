import React from 'react';
import { css } from 'emotion';
import uuid from 'uuidv4';
import Square from './Square';

const tableStyle = css`
  border-collapse: collapse;
`;

const Gameboard = ({ gameboard }) => {
  return (
    <table className={tableStyle}>
      <thead />
      <tbody>
        {gameboard.map(row => (
          <tr key={uuid()}>
            {row.map(square => (
              <td key={uuid()}>
                <Square
                  players={square.players}
                  number={square.number}
                  ladderTo={square.ladderTo}
                  ladderFrom={square.ladderFrom}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Gameboard;
