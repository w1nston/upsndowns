import invariant from 'invariant';

const isEven = x => x % 2 === 0;

export const createBoard = (rows, columns) => {
  invariant(rows > 0, 'A gameboard needs more than zero rows!');
  invariant(columns > 0, 'A gameboard needs more than zero columns!');

  const gameboard = [];
  let count = 1;

  for (let row = 0; row < rows; ++row) {
    let boardRow = [];

    for (let column = 0; column < columns; ++column) {
      boardRow.push(count++);
    }

    if (isEven(row + 1)) {
      gameboard.push(boardRow.reverse());
    } else {
      gameboard.push(boardRow);
    }
  }

  return gameboard.reverse();
};
