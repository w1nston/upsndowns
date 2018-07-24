const initialState = {
  players: [],
};

const initPlayers = numberOfPlayers => {
  const players = [];
  for (let i = 0; i < numberOfPlayers; ++i) {
    players.push({
      number: i + 1,
      position: {
        column: 0,
        row: 9,
      },
    });
  }
  return players;
};

const rollDice = (state, playerNumber) =>
  state.players.map(player => {
    if (player.number === playerNumber) {
      // TODO: This is where we want's matrix multiplication?
      return {
        ...player,
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

export const rollDiceAction = playerNumber => ({
  type: ROLL_DICE,
  playerNumber,
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
        players: rollDice(state, action.playerNumber),
      };
    }
    case SET_NUMBER_OF_PLAYERS: {
      return {
        ...state,
        players: initPlayers(action.numberOfPlayers),
      };
    }
    default:
      return state;
  }
};
