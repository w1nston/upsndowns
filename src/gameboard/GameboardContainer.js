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
  overflow: hidden;
  outline: none;
  padding: 0;
  transition: background-color 0.3s;
  width: 100%;

  &:hover,
  :focus {
    background-color: #0074c0;
  }

  @media (min-width: 992px) {
    height: 2.5rem;
    margin: 0;
    width: 8rem;
  }
`;

const playersInformationStrongStyle = css`
  margin-right: 0.5rem;
`;

const playersInformationContainerStyle = css`
  margin: 1rem;
`;

const controlContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

const GameobardContainer = ({
  currentPlayer,
  dispatchRollDice,
  players,
  previousPlayer,
}) => {
  if (players.length < 1) {
    return <Redirect noThrow from="/game" to="/" />;
  }

  function handleRollDice() {
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
      <div className={controlContainerStyle}>
        <div className={playersInformationContainerStyle}>
          <strong className={playersInformationStrongStyle}>Who's turn:</strong>
          <span>Player {currentPlayer}</span>
        </div>
        {previousPlayer && (
          <div className={playersInformationContainerStyle}>
            <strong className={playersInformationStrongStyle}>Player {previousPlayer} rolled:</strong>
            <span>{players[previousPlayer - 1].rolled}</span>
          </div>
        )}
        <button
          type="button"
          onClick={handleRollDice}
          className={diceButtonStyle}
        >
          Roll the dice!
        </button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ currentPlayer, players, previousPlayer }) => ({
  currentPlayer,
  players,
  previousPlayer,
});

const mapDispatchToProps = dispatch => ({
  dispatchRollDice: playerNumber => dispatch(rollDiceAction(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameobardContainer);
