import math from 'mathjs';
import { isEven } from '../common/util';

// TODO: make sure this is correct, also ensure we get absorbing state for last square.
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

  for (let row = 94; row < 99; ++row) {
    const predictionVector = [];

    for (let i = 0; i < 94; ++i) {
      predictionVector.push(0);
    }

    for (let i = 94; i < 100; ++i) {
      predictionVector.push(1 / 6);
    }

    predictionMatrix.push(predictionVector);
  }

  const predictionVector = [];
  for (let column = 0; column < 99; ++column) {
    predictionVector.push(0);
  }
  predictionVector.push(1);

  predictionMatrix.push(predictionVector);

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

const random = (max, min) => Math.random() * (max - min) + min;

const getRandomNextPosition = predictionVector => {
  const totalWeight = predictionVector.reduce(
    (acc, elem) => acc + elem.probability,
    0
  );
  const randomNumber = random(0, totalWeight);
  let weightedSum = 0;
  for (let i = 0; i < predictionVector.length; ++i) {
    weightedSum += predictionVector[i].probability;
    if (randomNumber <= weightedSum) {
      return predictionVector[i].index;
    }
  }
};

const getNextPositionVector = nextPosition => {
  const positionVector = [];
  for (let i = 0; i < nextPosition; ++i) {
    positionVector.push(0);
  }
  positionVector.push(1);
  for (let i = nextPosition + 1; i < 100; ++i) {
    positionVector.push(0);
  }
  return positionVector;
};

const getNextPosition = nextPosition => {
  let column = nextPosition % 10;
  const row = 9 - Math.floor(nextPosition / 10);

  if (isEven(row)) {
    column = 9 - column;
  }

  return {
    column,
    row,
  };
};

// TODO: http://mathjs.org/examples/browser/webworkers/index.html
const rollDice = state =>
  state.players.map(player => {
    if (player.number === state.playerTurn) {
      const movePrediction = math.multiply(
        player.positionVector,
        state.transitionMatrix
      );

      const predictionVector = movePrediction
        .valueOf()
        .map((x, index) => ({ index, probability: x }))
        .filter(x => x.probability > 0);

      const nextPosition = getRandomNextPosition(predictionVector);

      return {
        ...player,
        positionVector: getNextPositionVector(nextPosition),
        position: getNextPosition(nextPosition),
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
