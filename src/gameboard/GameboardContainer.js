import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import { createBoard } from './gameboardUtil';
import Gameboard from './Gameboard';
import { rollDiceAction } from '../gameplay';
import { isNotEmpty } from '../common/util';

const GameobardContainer = ({ dispatchRollDice, players }) => {
  if (players.length < 1) {
    return <Redirect noThrow from="/game" to="/" />;
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

  // TODO: Somewhere rollDice is needed...
  return <Gameboard gameboard={gameboard} />;
};

const mapStateToProps = ({ players }) => ({
  players,
});

const mapDispatchToProps = dispatch => ({
  dispatchRollDice: playerNumber => dispatch(rollDiceAction(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameobardContainer);
