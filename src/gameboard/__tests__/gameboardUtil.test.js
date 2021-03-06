import { createBoard } from '../gameboardUtil';

describe('createBoard', () => {
  it('throws error when rows are zero', () => {
    const rows = 0;
    expect(() => createBoard(rows)).toThrow(
      'A gameboard needs more than zero rows!'
    );
  });

  it('throws error when columns are zero', () => {
    const rows = 1;
    const columns = 0;
    expect(() => createBoard(rows, columns)).toThrow(
      'A gameboard needs more than zero columns!'
    );
  });

  it('one row has highest element to the right', () => {
    const rows = 1;
    const columns = 4;
    expect(createBoard(rows, columns)).toEqual([[1, 2, 3, 4]]);
  });

  it('when more than one row even rows have highest element to the left', () => {
    const rows = 2;
    const columns = 4;
    expect(createBoard(rows, columns)).toEqual([[8, 7, 6, 5], [1, 2, 3, 4]]);
  });
});
