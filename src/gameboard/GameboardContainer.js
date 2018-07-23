import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import Gameboard from './Gameboard';

const GameobardContainer = ({ columns, rows }) => {
  if (columns && rows) {
    return <Gameboard columns={columns} rows={rows} />;
  }
  return <Redirect noThrow from="/game" to="/" />;
};

const mapStateToProps = ({ numberOfColumns, numberOfRows }) => ({
  columns: numberOfColumns,
  rows: numberOfRows,
});

export default connect(mapStateToProps)(GameobardContainer);
