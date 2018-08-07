import math from 'mathjs';

const initPositionVector = () => {
  const positionVector = [];
  positionVector.push(1);
  for (let i = 1; i < 100; ++i) {
    positionVector.push(0);
  }
  return positionVector;
};

export const addJump = (transitionMatrix, from, to) => {
  for (let i = from - 1 - 6; i < from - 1; ++i) {
    transitionMatrix[i][from - 1] = 0;
    transitionMatrix[i][to - 1] = 1 / 6;
  }
};



export const initPlayers = numberOfPlayers => {
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

export const initTransitionMatrix = () => {
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

export const random = (max, min) => Math.random() * (max - min) + min;
