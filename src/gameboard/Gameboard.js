import React from 'react';
import uuid from 'uuidv4';
import { createBoard } from './gameboardUtil';
import Square from './Square';

const Gameboard = ({ rows, columns }) => {
  const board = createBoard(rows, columns);
  return (
    <table>
      <thead />
      <tbody>
        {board.map(row => (
          <tr key={uuid()}>
            {row.map(square => (
              <td key={uuid()}>
                <Square number={square} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Gameboard;
