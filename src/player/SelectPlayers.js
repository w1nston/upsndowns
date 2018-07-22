import React, { Component } from 'react';
import { css } from 'emotion';

const inputContainerStyle = css`
  display: flex;
  align-items: center;
`;

const numberOfPlayersInputStyle = css`
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

const submitButtonStyle = css`
  ${buttonStyle} background-color: #2ecc71;
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

class SelectPlayers extends Component {
  state = { disabled: false, players: 2, message: null };

  handleChange = event => {
    if (event.target.value < 5) {
      if (event.target.value < 2) {
        this.setState({
          players: event.target.value,
          message: 'At least two players are needed.',
        });
      } else {
        this.setState({ players: event.target.value, message: null });
      }
    } else {
      this.setState({ message: 'Maximum allowed players are four.' });
    }
  };

  handleDecrease = () => {
    if (this.state.players > 2) {
      this.setState(state => ({ players: state.players - 1 }));
    }
  };

  handleIncrease = () => {
    if (this.state.players < 4) {
      this.setState(state => ({ players: state.players + 1 }));
    }
  };

  handleSubmit = event => {
    // TODO: dispatch an action to set number of players
    event.preventDefault();
    console.log('TALLIHO!');
    this.setState({ disabled: true });
  };

  render() {
    const { disabled, players, message } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {message && <p>{message}</p>}
        <label htmlFor="players">Select number of players:</label>
        <div className={inputContainerStyle}>
          <button
            className={buttonStyle}
            type="button"
            onClick={this.handleDecrease}
            alt="Decrease amount of players"
            disabled={disabled}
          >
            -
          </button>
          <input
            className={numberOfPlayersInputStyle}
            type="number"
            onChange={this.handleChange}
            value={players}
            disabled={disabled}
            name="players"
          />
          <button
            className={buttonStyle}
            type="button"
            onClick={this.handleIncrease}
            alt="Increase amount of players"
            disabled={disabled}
          >
            +
          </button>
        </div>
        <button type="submit" className={submitButtonStyle} disabled={disabled}>
          Let's go!
        </button>
      </form>
    );
  }
}

export default SelectPlayers;
