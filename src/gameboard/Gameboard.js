import React from 'react';
import { css } from 'emotion';
import uuid from 'uuidv4';
import { createBoard } from './gameboardUtil';
import Square from './Square';

const tableStyle = css`
  border-collapse: collapse;
`;

const Gameboard = ({ rows, columns }) => {
  const board = createBoard(rows, columns);
  return (
    <table className={tableStyle}>
      <thead />
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={uuid()}>
            {row.map((square, columnIndex) => (
              <td key={uuid()}>
                <Square row={rowIndex} column={columnIndex} number={square} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Gameboard;
