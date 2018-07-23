import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import Gameboard from './Gameboard';
import { INIT_PLAYERS, ROLL_DICE } from '../gameplay';

const GameobardContainer = ({ columns, dispatchInitPlayers, dispatchRollDice, rows }) => {
  if (columns && rows) {
    dispatchInitPlayers();
    return <Gameboard columns={columns} rows={rows} dispatchRollDice={dispatchRollDice} />;
  }
  return <Redirect noThrow from="/game" to="/" />;
};

const mapStateToProps = ({ numberOfColumns, numberOfRows }) => ({
  columns: numberOfColumns,
  rows: numberOfRows,
});

const mapDispatchToProps = dispatch => ({
  dispatchInitPlayers: () => dispatch({ type: INIT_PLAYERS }),
  dispatchRollDice: player => dispatch({ type: ROLL_DICE, player }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameobardContainer);
