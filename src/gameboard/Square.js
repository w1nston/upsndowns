import React, { Fragment } from 'react';
import { css } from 'emotion';
import { isNotEmpty } from '../common/util';

const squareStyle = (ladderTo, ladderFrom, snakeTo, snakeFrom) => {
  let backgroundColor = '#ddd';
  let color = '#333';

  if (ladderTo !== undefined) {
    backgroundColor = '#2ecc40';
  }

  if (ladderFrom !== undefined) {
    backgroundColor = '#0074d9';
    color = '#fff';
  }

  if (snakeTo !== undefined) {
    backgroundColor = '#ff4136';
  }

  if (snakeFrom !== undefined) {
    backgroundColor = '#ffdc00';
  }

  return css`
    background-color: ${backgroundColor};
    border: 0.05rem solid #333;
    color: ${color};
    display: flex;
    flex-direction: column;
    font-size: 0.5rem;
    font-weight: 700;
    height: 2.1rem;

    @media (min-width: 992px) {
      font-weight: 500;
      font-size: 1rem;
      height: 3.1rem;
    }
  `;
};

const squareRowStyle = css`
  height: 33%;
  text-align: center;
`;

const snakeOrLadderStyle = css`
  font-size: 0.3rem;

  @media (min-width: 992px) {
    font-size: 0.5rem;
  }
`;

const playersStyle = css`
  font-size: 0.3rem;

  @media (min-width: 992px) {
    font-size: 0.5rem;
  }
`;

const Square = ({
  ladderTo,
  ladderFrom,
  number,
  players,
  snakeTo,
  snakeFrom,
}) => (
  <div className={squareStyle(ladderTo, ladderFrom, snakeTo, snakeFrom)}>
    <div className={`${squareRowStyle} ${snakeOrLadderStyle}`}>
      {ladderTo && `To: ${ladderTo}`}
      {ladderFrom && `From: ${ladderFrom}`}
      {snakeTo && `To: ${snakeTo}`}
      {snakeFrom && `From: ${snakeFrom}`}
    </div>
    <div className={squareRowStyle}>{number}</div>
    <div className={`${squareRowStyle} ${playersStyle}`}>
      {isNotEmpty(players) ? (
        <Fragment>
          <span>{players.join(', ')}</span>
        </Fragment>
      ) : null}
    </div>
  </div>
);

export default Square;
