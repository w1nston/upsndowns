import React from 'react';
import { css } from 'emotion';
import uuid from 'uuidv4';
import Square from './Square';

const tableStyle = css`
  border-collapse: collapse;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const tableCellStyle = css`
  width: 10%;
`;

const Gameboard = ({ gameboard }) => {
  return (
    <table className={tableStyle}>
      <thead />
      <tbody>
        {gameboard.map(row => (
          <tr key={uuid()}>
            {row.map(square => (
              <td className={tableCellStyle} key={uuid()}>
                <Square
                  players={square.players}
                  number={square.number}
                  ladderTo={square.ladderTo}
                  ladderFrom={square.ladderFrom}
                  snakeTo={square.snakeTo}
                  snakeFrom={square.snakeFrom}
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
