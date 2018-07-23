import invariant from 'invariant';

const initialState = {
  numberOfColumns: null,
  numberOfPlayers: null,
  numberOfRows: null,
  players: [],
};

const initPlayers = (numberOfPlayers, numberOfRows)  => {
  const players = [];
  for (let i = 0; i < numberOfPlayers; ++i) {
    players.push({
      number: i + 1,
      position: {
        column: 0,
        row: numberOfRows - 1,
      }
    })
  }
  return players;
};

export const INIT_PLAYERS = 'INIT_PLAYERS';
export const ROLL_DICE = 'ROLL_DICE';
export const SET_NUMBER_OF_COLUMNS = 'SET_NUMBER_OF_COLUMNS';
export const SET_NUMBER_OF_PLAYERS = 'SET_NUMBER_OF_PLAYERS';
export const SET_NUMBER_OF_ROWS = 'SET_NUMBER_OF_ROWS';

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
