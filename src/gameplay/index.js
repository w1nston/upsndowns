import math from 'mathjs';
import invariant from 'invariant';
import { isEven } from '../common/util';

const initTransitionMatrix = () => {
  const predictionMatrix = [];

  for (let row = 0; row < 93; ++row) {
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

  // Special ending cases
  const vector94 = math.zeros(94).valueOf();
  for (let i = 0; i < 6; ++i) {
    vector94.push(1 / 6);
  }
  predictionMatrix.push(vector94);

  const vector95 = math.zeros(95).valueOf();
  vector95.push(1 / 6);
  vector95.push(1 / 6);
  vector95.push(1 / 6);
  vector95.push(2 / 6);
  vector95.push(1 / 6);
  predictionMatrix.push(vector95);

  const vector96 = math.zeros(96).valueOf();
  vector96.push(1 / 6);
  vector96.push(2 / 6);
  vector96.push(2 / 6);
  vector96.push(1 / 6);
  predictionMatrix.push(vector96);

  predictionMatrix.push(vector96);
  predictionMatrix.push(vector95);
  predictionMatrix.push(vector94);

  const absorbingState = math.zeros(99).valueOf();
  absorbingState.push(1);

  predictionMatrix.push(absorbingState);

  return predictionMatrix;
};

const addLadder = (transitionMatrix, from, to) => {
  for (let i = (from - 1 - 6); i < (from - 1); ++i) {
    transitionMatrix[i][from - 1] = 0;
    transitionMatrix[i][to - 1] = 1/6;
  }
}

const addLadders = transitionMatrix => {
  addLadder(transitionMatrix, 14, 26);
  addLadder(transitionMatrix, 38, 56);
  addLadder(transitionMatrix, 55, 75);
  addLadder(transitionMatrix, 73, 87);
  return transitionMatrix;
}

const initialState = {
  players: [],
  playerTurn: null,
  transitionMatrix: math.matrix(
    addLadders(initTransitionMatrix())
  ),
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

const getRandomNextIndex = predictionVector => {
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

const getNextPosition = nextIndex => {
  let column = nextIndex % 10;
  const row = 9 - Math.floor(nextIndex / 10);

  if (isEven(row)) {
    column = 9 - column;
  }

  return {
    column,
    row,
  };
};

const getCurrentIndex = positionVector => {
  for (let index = 0; index < positionVector.length; ++index) {
    if (positionVector[index] === 1) {
      return index;
    }
  }
  invariant(false, 'Position vector does not contain a given position!');
};

// TODO: http://mathjs.org/examples/browser/webworkers/index.html
const rollDice = state =>
  state.players.map(player => {
    if (player.number === state.currentPlayer) {
      const movePrediction = math.multiply(
        player.positionVector,
        state.transitionMatrix
      );

      const predictionVector = movePrediction
        .valueOf()
        .map((x, index) => ({ index, probability: x }))
        .filter(x => x.probability > 0);

      const currentIndex = getCurrentIndex(player.positionVector);
      const nextIndex = getRandomNextIndex(predictionVector);

      const rolled =
        nextIndex - currentIndex <= 0
          ? 99 - currentIndex + (99 - nextIndex)
          : nextIndex - currentIndex;

      return {
        ...player,
        positionVector: getNextPositionVector(nextIndex),
        position: getNextPosition(nextIndex),
        rolled,
      };
    }
    return player;
  });

const calculateNextPlayer = (currentPlayer, players) => {
  if (players[currentPlayer - 1].rolled === 6) {
    return currentPlayer;
  }
  return ((currentPlayer + 2) % players.length) + 1;
};

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
      const players = rollDice(state);
      return {
        ...state,
        players,
        previousPlayer: state.currentPlayer,
        currentPlayer: calculateNextPlayer(state.currentPlayer, players),
      };
    }
    case SET_NUMBER_OF_PLAYERS: {
      return {
        ...state,
        players: initPlayers(action.numberOfPlayers),
        previousPlayer: null,
        currentPlayer: 1,
      };
    }
    default:
      return state;
  }
};
