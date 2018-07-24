import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import {
  setNumberOfColumnsAction,
  setNumberOfPlayersAction,
  setNumberOfRowsAction,
} from '../gameplay';
import GameForm from './GameForm';

class GameFormContainer extends Component {
  state = {
    message: null,
    numberOfColumns: 10,
    numberOfPlayers: 2,
    numberOfRows: 10,
    submitted: false,
  };

  handleColumnsChange = event => {
    if (event.target.value < 10) {
      this.setState({ numberOfColumns: event.target.value });
    }
  };

  handleColumnsDecrease = () => {
    if (this.state.numberOfColumns > 1) {
      this.setState(state => ({ numberOfColumns: state.numberOfColumns - 1 }));
    }
  };

  handleColumnsIncrease = () => {
    if (this.state.numberOfColumns < 10) {
      this.setState(state => ({ numberOfColumns: state.numberOfColumns + 1 }));
    }
  };

  handlePlayersChange = event => {
    if (event.target.value < 5) {
      if (event.target.value < 2) {
        this.setState({
          numberOfPlayers: event.target.value,
          message: 'At least two players are needed.',
        });
      } else {
        this.setState({ numberOfPlayers: event.target.value, message: null });
      }
    } else {
      this.setState({ message: 'Maximum allowed players are four.' });
    }
  };

  handlePlayersDecrease = () => {
    if (this.state.numberOfPlayers > 2) {
      this.setState(state => ({ numberOfPlayers: state.numberOfPlayers - 1 }));
    }
  };

  handlePlayersIncrease = () => {
    if (this.state.numberOfPlayers < 4) {
      this.setState(state => ({ numberOfPlayers: state.numberOfPlayers + 1 }));
    }
  };

  handleRowsChange = event => {
    if (event.target.value < 10) {
      this.setState({ numberOfRows: event.target.value });
    }
  };

  handleRowsDecrease = () => {
    if (this.state.numberOfRows > 1) {
      this.setState(state => ({ numberOfRows: state.numberOfRows - 1 }));
    }
  };

  handleRowsIncrease = () => {
    if (this.state.numberOfRows < 10) {
      this.setState(state => ({ numberOfRows: state.numberOfRows + 1 }));
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatchNumberOfColumns(this.state.numberOfColumns);
    this.props.dispatchNumberOfPlayers(this.state.numberOfPlayers);
    this.props.dispatchNumberOfRows(this.state.numberOfRows);
    this.setState({ submitted: true });
  };

  render() {
    const {
      message,
      numberOfColumns,
      numberOfPlayers,
      numberOfRows,
    } = this.state;
    return this.state.submitted ? (
      <Redirect noThrow to="/game" />
    ) : (
      <GameForm
        message={message}
        onColumnsChange={this.handleColumnsChange}
        onColumnsDecrease={this.handleColumnsDecrease}
        onColumnsIncrease={this.handleColumnsIncrease}
        onPlayersChange={this.handlePlayersChange}
        onPlayersDecrease={this.handlePlayersDecrease}
        onPlayersIncrease={this.handlePlayersIncrease}
        onRowsChange={this.handleRowsChange}
        onRowsDecrease={this.handleRowsDecrease}
        onRowsIncrease={this.handleRowsIncrease}
        onSubmit={this.handleSubmit}
        numberOfColumns={numberOfColumns}
        numberOfPlayers={numberOfPlayers}
        numberOfRows={numberOfRows}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchNumberOfColumns: numberOfColumns => {
    dispatch(setNumberOfColumnsAction(numberOfColumns));
  },
  dispatchNumberOfPlayers: numberOfPlayers => {
    dispatch(setNumberOfPlayersAction(numberOfPlayers));
  },
  dispatchNumberOfRows: numberOfRows => {
    dispatch(setNumberOfRowsAction(numberOfRows));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(GameFormContainer);
