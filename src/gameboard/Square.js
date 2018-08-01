import React from 'react';
import { css } from 'emotion';
import { isNotEmpty } from '../common/util';

const squareStyle = (ladderTo, ladderFrom) => {
  let backgroundColor = '#ddd';
  let color = '#333';

  if (ladderTo !== undefined) {
    backgroundColor = '#2ecc40';
  }

  if (ladderFrom !== undefined) {
    backgroundColor = '#0074d9';
    color = '#fff';
  }

  return css`
    align-items: center;
    background-color: ${backgroundColor};
    border: 0.0625rem solid #333;
    color: ${color};
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
};

const noMarginParagraphStyle = css`
  @media (min-width: 992px) {
    margin: 0;
  }
`;

const ladderToLabelStyle = css`
  font-size: 0.625rem;
`;

const ladderFromLabelStyle = css`
  font-size: 0.625rem;
`;

const playersStyle = css`
  font-size: 1rem;

  @media (min-width: 992px) {
    font-size: 0.625rem;
    margin-bottom: 1.125rem;
  }
`;

const Square = ({ ladderTo, ladderFrom, number, players }) => (
  <div className={squareStyle(ladderTo, ladderFrom)}>
    {ladderTo && (
      <p className={`${ladderToLabelStyle} ${noMarginParagraphStyle}`}>
        To: {ladderTo}
      </p>
    )}
    {ladderFrom && (
      <p className={`${ladderFromLabelStyle} ${noMarginParagraphStyle}`}>
        From: {ladderFrom}
      </p>
    )}
    <p className={noMarginParagraphStyle}>{number}</p>
    {isNotEmpty(players) ? (
      <p className={`${playersStyle} ${noMarginParagraphStyle}`}>
        <span>Players:</span>
        <span>{players.join(', ')}</span>
      </p>
    ) : null}
  </div>
);

export default Square;
