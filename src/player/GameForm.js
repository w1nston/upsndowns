import React from 'react';
import { css } from 'emotion';
import CounterInput from './CounterInput';

const submitButtonStyle = css`
  background-color: #2ecc71;
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
  width: 100%;

  &:hover,
  :focus {
    background-color: #27ae60;
  }

  @media (min-width: 992px) {
    height: 2.5rem;
    margin: 1rem 0;
    width: 11rem;
  }
`;

const GameForm = ({
  disabled,
  onSubmit,
  message, // TODO: one for each?
  numberOfPlayers,
  onPlayersChange,
  onPlayersDecrease,
  onPlayersIncrease,
}) => (
  <form onSubmit={onSubmit}>
    {message && <p>{message}</p>}
    <label htmlFor="players">Select number of players:</label>
    <CounterInput
      disabled={disabled}
      onChange={onPlayersChange}
      onDecrease={onPlayersDecrease}
      onIncrease={onPlayersIncrease}
      value={numberOfPlayers}
      name="players"
    />

    <button type="submit" className={submitButtonStyle} disabled={disabled}>
      Let's go!
    </button>
  </form>
);

export default GameForm;
