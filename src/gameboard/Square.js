import React from 'react';
import { css } from 'emotion';
import { isNotEmpty } from '../common/util';

const squareStyle = css`
  align-items: center;
  border: 0.0625rem solid #333;
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  font-weight: 700;
  height: 7.5rem;
  justify-content: center;
  text-align: center;
  width: 7.5rem /*3.875rem == 62px*/;

  @media (min-width: 992px) {
    font-weight: 500;
    font-size: 1rem;
    height: 3.875rem;
    width: 3.875rem;
  }
`;

const playersStyle = css`
  font-size: 1rem;
`;

const Square = ({ number, players }) => (
  <div className={squareStyle}>
    <p>{number}</p>
    {isNotEmpty(players) ? (
      <p className={playersStyle}>
        <span>Players:</span>
        <span>{players.join(', ')}</span>
      </p>
    ) : null}
  </div>
);

export default Square;
