const initialState = {
  players: [],
  playerTurn: null,
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

const rollDice = state =>
  state.players.map(player => {
    if (player.number === state.playerTurn) {
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
