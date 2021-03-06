import math from 'mathjs';
import invariant from 'invariant';
import { getRowAndColumn } from '../common/util';
import {
  addJump,
  initPlayers,
  initTransitionMatrix,
  random,
} from './util';

export const ladders = [
  { from: 14, to: 26 },
  { from: 38, to: 56 },
  { from: 55, to: 75 },
  { from: 73, to: 87 },
];

export const snakes = [
  { from: 27, to: 5 },
  { from: 44, to: 17 },
  { from: 52, to: 48 },
  { from: 82, to: 62 },
];

const addLadders = transitionMatrix => {
  ladders.forEach(ladder => {
    addJump(transitionMatrix, ladder.from, ladder.to);
  });
  return transitionMatrix;
};

const addSnakes = transitionMatrix => {
  snakes.forEach(snake => {
    addJump(transitionMatrix, snake.from, snake.to);
  });
  return transitionMatrix;
};

const initialState = {
  players: [],
  playerTurn: null,
  transitionMatrix: math.matrix(addLadders(addSnakes(initTransitionMatrix()))),
};

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

const getCurrentIndex = positionVector => {
  for (let index = 0; index < positionVector.length; ++index) {
    if (positionVector[index] === 1) {
      return index;
    }
  }
  invariant(false, 'Position vector does not contain a given position!');
};

const calculateDiceRoll = (currentIndex, nextIndex) => {
  if (nextIndex - currentIndex <= 0) {
    const snake = snakes.find(s => s.to === nextIndex + 1);

    if (snake) {
      return snake.from - 1 - currentIndex;
    }

    return 99 - currentIndex + (99 - nextIndex);
  } else if (nextIndex - currentIndex > 6) {
    const ladder = ladders.find(l => l.to === nextIndex + 1);
    return ladder.from - 1 - currentIndex;
  }

  return nextIndex - currentIndex;
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
        .map((probability, index) => ({ index, probability }))
        .filter(x => x.probability > 0);

      const currentIndex = getCurrentIndex(player.positionVector);
      const nextIndex = getRandomNextIndex(predictionVector);

      const rolled = calculateDiceRoll(currentIndex, nextIndex);

      return {
        ...player,
        positionVector: getNextPositionVector(nextIndex),
        position: getRowAndColumn(nextIndex),
        rolled,
        numberOfDiceRolls: player.numberOfDiceRolls + 1,
      };
    }
    return player;
  });

const calculateNextPlayer = (currentPlayer, players) => {
  if (players[currentPlayer - 1].rolled === 6) {
    return currentPlayer;
  }

  const nextPlayer = (currentPlayer + 1) % players.length;
  return nextPlayer > 0 ? nextPlayer : players.length;
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
