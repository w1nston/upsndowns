const initialState = {
  numberOfColumns: null,
  numberOfPlayers: null,
  numberOfRows: null,
};

export const SET_NUMBER_OF_COLUMNS = 'SET_NUMBER_OF_COLUMNS';
export const SET_NUMBER_OF_PLAYERS = 'SET_NUMBER_OF_PLAYERS';
export const SET_NUMBER_OF_ROWS = 'SET_NUMBER_OF_ROWS';

export const gameState = (state = initialState, action) => {
  switch (action.type) {
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
