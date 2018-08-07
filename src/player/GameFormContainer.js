import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Redirect } from '@reach/router';
import { GameStateContainer } from '../gameplay';
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

  render() {
    const { message, numberOfPlayers } = this.state;
    return this.state.submitted ? (
      <Redirect noThrow to="/game" />
    ) : (
      <Subscribe to={[GameStateContainer]}>
        {gameState => {
          const handleSubmit = event => {
            event.preventDefault();
            gameState.setNumberOfPlayers(this.state.numberOfPlayers);
            this.setState({ submitted: true });
          }
          return (
            <GameForm
              message={message}
              onPlayersChange={this.handlePlayersChange}
              onPlayersDecrease={this.handlePlayersDecrease}
              onPlayersIncrease={this.handlePlayersIncrease}
              onSubmit={handleSubmit}
              numberOfPlayers={numberOfPlayers}
            />
          );
        }}
      </Subscribe>
    );
  }
}

export default GameFormContainer;
