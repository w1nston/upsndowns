export const isEven = x => x % 2 === 0;
export const isNotEmpty = x => x && x.length > 0;

export const getRowAndColumn = index => {
  let column = index % 10;
  const row = 9 - Math.floor(index / 10);

  if (isEven(row)) {
    column = 9 - column;
  }

  return {
    column,
    row,
  };
};

