import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import Gameboard from './Gameboard';
import {
  initPlayersAction,
  rollDiceAction,
} from '../gameplay';

const GameobardContainer = ({
  columns,
  dispatchInitPlayers,
  dispatchRollDice,
  players,
  rows,
}) => {
  if (columns && rows) {
    dispatchInitPlayers();
    return (
      <Gameboard
        dispatchRollDice={dispatchRollDice}
        columns={columns}
        rows={rows}
      />
    );
  }
  return <Redirect noThrow from="/game" to="/" />;
};

const mapStateToProps = ({ numberOfColumns, numberOfRows }) => ({
  columns: numberOfColumns,
  rows: numberOfRows,
});

const mapDispatchToProps = dispatch => ({
  dispatchInitPlayers: () => dispatch(initPlayersAction()),
  dispatchRollDice: playerNumber => dispatch(rollDiceAction(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameobardContainer);
