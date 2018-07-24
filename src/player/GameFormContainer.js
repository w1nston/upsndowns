import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import {
  setNumberOfPlayersAction,
} from '../gameplay';
import GameForm from './GameForm';

class GameFormContainer extends Component {
  state = {
    message: null,
    numberOfPlayers: 2,
    submitted: false,
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

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatchNumberOfPlayers(this.state.numberOfPlayers);
    this.setState({ submitted: true });
  };

  render() {
    const {
      message,
      numberOfPlayers,
    } = this.state;
    return this.state.submitted ? (
      <Redirect noThrow to="/game" />
    ) : (
      <GameForm
        message={message}
        onPlayersChange={this.handlePlayersChange}
        onPlayersDecrease={this.handlePlayersDecrease}
        onPlayersIncrease={this.handlePlayersIncrease}
        onSubmit={this.handleSubmit}
        numberOfPlayers={numberOfPlayers}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchNumberOfPlayers: numberOfPlayers => {
    dispatch(setNumberOfPlayersAction(numberOfPlayers));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(GameFormContainer);
