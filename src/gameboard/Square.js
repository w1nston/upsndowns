import React from 'react';
import { css } from 'emotion';

const squareStyle = css`
  align-items: center;
  border: 0.0625rem solid #333;
  display: flex;
  font-size: 1.8rem;
  font-weight: 700;
  height: 7.5rem;
  justify-content: center;
  padding: 1rem;
  text-align: center;
  width: 7.5rem /*3.875rem == 62px*/;

  @media (min-width: 992px) {
    font-weight: 500;
    font-size: 1rem;
    height: 3.875rem;
    width: 3.875rem;
  }
`;

const Square = ({ column, row, number }) => (
  <div data-row={row} data-column={column} className={squareStyle}>
    <p>{number}</p>
  </div>
);

export default Square;
