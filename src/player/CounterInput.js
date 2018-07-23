import React from 'react';
import { css } from 'emotion';

const inputContainerStyle = css`
  display: flex;
  align-items: center;
`;

const counterInputInputStyle = css`
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.6);
  height: 4.75rem;
  width: 50%;
  margin: 0.5rem;
  font-size: 2rem;
  text-align: center;

  @media (min-width: 992px) {
    font-size: 1rem;
    height: 2.5rem;
    width: 5rem;
  }
`;

const buttonStyle = css`
  background-color: #0074d9;
  border-radius: 0.125rem;
  border-width: 0;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.6);
  color: #ecf0f1;
  display: block;
  height: 4.75rem;
  margin: 1.875rem auto;
  overflow: hidden;
  outline: none;
  padding: 0;
  transition: background-color 0.3s;
  width: 4.75rem;

  &:hover,
  :focus {
    background-color: #0074c0;
  }

  @media (min-width: 992px) {
    height: 2.5rem;
    margin: 0;
    width: 2.5rem;
  }
`;

const CounterInput = ({
  disabled,
  name,
  onChange,
  onDecrease,
  onIncrease,
  value,
}) => (
  <div className={inputContainerStyle}>
    <button
      className={buttonStyle}
      type="button"
      onClick={onDecrease}
      disabled={disabled}
    >
      -
    </button>
    <input
      className={counterInputInputStyle}
      type="number"
      onChange={onChange}
      value={value}
      disabled={disabled}
      name={name}
    />
    <button
      className={buttonStyle}
      type="button"
      onClick={onIncrease}
      disabled={disabled}
    >
      +
    </button>
  </div>
);

export default CounterInput;