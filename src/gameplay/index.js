import math from 'mathjs';

const initTransitionMatrix = () => {
  const predictionMatrix = [];

  for (let row = 0; row < 94; ++row) {
    let startIndex = row + 1;
    const predictionVector = [];

    for (let i = 0; i < startIndex; ++i) {
      predictionVector.push(0);
    }

    for (let i = 0; i < 6; ++i) {
      predictionVector.push(1 / 6);
    }

    for (let i = startIndex + 6; i < 100; ++i) {
      predictionVector.push(0);
    }

    predictionMatrix.push(predictionVector);
  }

  for (let row = 94; row < 100; ++row) {
    const predictionVector = [];

    for (let i = 0; i < 94; ++i) {
      predictionVector.push(0);
    }

    for (let i = 94; i < 100; ++i) {
      predictionVector.push(1 / 6);
    }

    predictionMatrix.push(predictionVector);
  }

  const transitionMatrix = math.matrix(predictionMatrix);

  return transitionMatrix;
};

const initialState = {
  players: [],
  playerTurn: null,
  transitionMatrix: initTransitionMatrix(),
};

const initPositionVector = () => {
  const positionVector = [];
  positionVector.push(1);
  for (let i = 1; i < 100; ++i) {
    positionVector.push(0);
  }
  return positionVector;
};

const initPlayers = numberOfPlayers => {
  const players = [];
  for (let i = 0; i < numberOfPlayers; ++i) {
    players.push({
      number: i + 1,
      positionVector: initPositionVector(),
      position: {
        column: 0,
        row: 9,
      },
    });
  }
  return players;
};

const rollDice = state =>
  state.players.map(player => {
    if (player.number === state.playerTurn) {

      // TODO: Will this be useful at all?
      const movePrediction = math.multiply(player.positionVector, state.transitionMatrix);
      console.log(movePrediction);

      // [1, 0, 0, ..., 0]
      //                  *
      // [0, 0.16666, 0.16666, 0.16666, 0.16666, 0.16666, 0.16666, 0, 0, ..., 0]
      //
      // [0, 1, 0, 0, 0, ..., 0] OR
      // [0, 0, 1, 0, 0, ..., 0] OR
      // [0, 0, 0, 1, 0, ..., 0] OR
      // [0, 0, 0, 0, 1, ..., 0] OR
      // [0, 0, 0, 0, 0, 1, ..., 0] OR
      // [0, 0, 0, 0, 0, 0, 1, ..., 0] OR

      return {
        ...player,
        positionVector: {}, // TODO: is going to be generated by math somehow...
        position: {
          row: player.position.row,
          column: player.position.column + 1,
        },
      };
    }
    return player;
  });

const ROLL_DICE = 'ROLL_DICE';
const SET_NUMBER_OF_PLAYERS = 'SET_NUMBER_OF_PLAYERS';

export const rollDiceAction = () => ({
  type: ROLL_DICE,
});

export const setNumberOfPlayersAction = numberOfPlayers => ({
  type: SET_NUMBER_OF_PLAYERS,
  numberOfPlayers,
});

export const gameState = (state = initialState, action) => {
  switch (action.type) {
    case ROLL_DICE: {
      return {
        ...state,
        players: rollDice(state),
        playerTurn: ((state.playerTurn + 2) % state.players.length) + 1,
      };
    }
    case SET_NUMBER_OF_PLAYERS: {
      return {
        ...state,
        players: initPlayers(action.numberOfPlayers),
        playerTurn: 1,
      };
    }
    default:
      return state;
  }
};
