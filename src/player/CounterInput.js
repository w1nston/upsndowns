import React from 'react';
import { css } from 'emotion';

const inputContainerStyle = css`
  display: flex;
  align-items: center;
`;

const counterInputInputStyle = css`
  border-radius: 0.2rem;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.6);
  height: 3.8rem;
  width: 50%;
  margin: .4rem;
  font-size: 1.6rem;
  text-align: center;

  @media (min-width: 992px) {
    font-size: .8rem;
    height: 2rem;
    width: 4rem;
  }
`;

const buttonStyle = css`
  background-color: #0074d9;
  border-radius: 0.1rem;
  border-width: 0;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.6);
  color: #ecf0f1;
  display: block;
  font-size: 1.7rem;
  height: 3.8rem;
  margin: 1.5rem auto;
  overflow: hidden;
  outline: none;
  padding: 0;
  transition: background-color 0.3s;
  width: 3.8rem;

  &:hover,
  :focus {
    background-color: #0074c0;
  }

  @media (min-width: 992px) {
    font-size: 1rem;
    height: 2rem;
    margin: 0;
    width: 2rem;
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