import React, { Fragment } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import { createBoard } from './gameboardUtil';
import Gameboard from './Gameboard';
import { rollDiceAction } from '../gameplay';
import { isNotEmpty } from '../common/util';

const diceButtonStyle = css`
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

const whosTurnStyle = css`
  margin-right: .5rem;
`;


const GameobardContainer = ({ dispatchRollDice, players, playerTurn }) => {
  if (players.length < 1) {
    return <Redirect noThrow from="/game" to="/" />;
  }

  function handleRollDice(event) {
    dispatchRollDice();
  }

  const board = createBoard(10, 10);

  const gameboard = board.map((rowElement, rowIndex) =>
    rowElement.map((columnElement, columnIndex) => ({
      number: board[rowIndex][columnIndex],
    }))
  );

  players.forEach(player => {
    const square = gameboard[player.position.row][player.position.column];
    gameboard[player.position.row][player.position.column] = {
      ...square,
      players: isNotEmpty(square.players)
        ? square.players.concat([player.number])
        : [player.number],
    };
  });

  return (
    <Fragment>
      <Gameboard gameboard={gameboard} />
      <strong className={whosTurnStyle}>Who's turn:</strong>
      <span>Player {playerTurn}</span>
      <button
        type="button"
        onClick={handleRollDice}
        className={diceButtonStyle}
      >
        Roll the dice!
      </button>
    </Fragment>
  );
};

const mapStateToProps = ({ players, playerTurn }) => ({
  players,
  playerTurn,
});

const mapDispatchToProps = dispatch => ({
  dispatchRollDice: playerNumber => dispatch(rollDiceAction(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameobardContainer);
