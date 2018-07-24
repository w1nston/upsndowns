import invariant from 'invariant';

const initialState = {
  numberOfColumns: null,
  numberOfPlayers: null,
  numberOfRows: null,
  players: [],
};

const initPlayers = (numberOfPlayers, numberOfRows) => {
  const players = [];
  for (let i = 0; i < numberOfPlayers; ++i) {
    players.push({
      number: i + 1,
      position: {
        column: 0,
        row: numberOfRows - 1,
      },
    });
  }
  return players;
};

const INIT_PLAYERS = 'INIT_PLAYERS';
const ROLL_DICE = 'ROLL_DICE';
const SET_NUMBER_OF_COLUMNS = 'SET_NUMBER_OF_COLUMNS';
const SET_NUMBER_OF_PLAYERS = 'SET_NUMBER_OF_PLAYERS';
const SET_NUMBER_OF_ROWS = 'SET_NUMBER_OF_ROWS';

export const initPlayersAction = numberOfPlayers => ({
  type: INIT_PLAYERS,
  numberOfPlayers,
});

export const rollDiceAction = playerNumber => ({
  type: ROLL_DICE,
  playerNumber,
});

export const setNumberOfColumnsAction = numberOfColumns => ({
  type: SET_NUMBER_OF_COLUMNS,
  numberOfColumns,
});

export const setNumberOfPlayersAction = numberOfPlayers => ({
  type: SET_NUMBER_OF_PLAYERS,
  numberOfPlayers,
});

export const setNumberOfRowsAction = numberOfRows => ({
  type: SET_NUMBER_OF_ROWS,
  numberOfRows,
});

export const gameState = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PLAYERS: {
      invariant(
        state.numberOfPlayers,
        'Not possible to dispatch action INIT_PLAYERS before setting number of players!'
      );

      return {
        ...state,
        players: initPlayers(state.numberOfPlayers, state.numberOfRows),
      };
    }
    case ROLL_DICE: {
      return {
        ...state,
        players: ROLL_DICE(state, action.player),
      };
    }
    case SET_NUMBER_OF_COLUMNS: {
      return {
        ...state,
        numberOfColumns: action.numberOfColumns,
      };
    }
    case SET_NUMBER_OF_PLAYERS: {
      return {
        ...state,
        numberOfPlayers: action.numberOfPlayers,
      };
    }
    case SET_NUMBER_OF_ROWS: {
      return {
        ...state,
        numberOfRows: action.numberOfRows,
      };
    }
    default:
      return state;
  }
};
