let isFinished = false;

class Sudoku {
  constructor(board) {
    this.board = board;
    this.m = Math.floor(Math.sqrt(board.length));
    this.n = Math.ceil(Math.sqrt(board.length));
    this.length = board.length;
    this.isFinished = false;
  }

  search(x = 0, y = 0) {
    if (y === this.length) {
      y = 0;
      x += 1;

      if (x === this.length) {
        console.log("Found solution");
        console.log(this.board);
        // this.isFinished = true;
        return;
      }
    }

    if (this.board[x][y] !== 0) {
      y += 1;
      this.search(x, y);
      return;
    }

    const candidates = this.constructCandidates(this.board, x, y, this.m, this.n);
    for (let i = 0; i < candidates.length; i++) {
      this.board[x][y] = candidates[i];
      this.search(x, y + 1);
      this.board[x][y] = 0;

      if (this.isFinished) return;
    }
  }

  constructCandidates(board, x, y, m, n) {
    const set = new Set([
      ...this.getRowElements(board, x),
      ...this.getColElements(board, y),
      ...this.getBoxElements(board, x, y, m, n),
    ]);
  
    const elements = [];
    for (let i = 1; i <= board.length; i++) {
      if (!set.has(i)) {
        elements.push(i);
      }
    }
    return elements;
  }
  
  getRowElements = (board, x) => board[x].filter((v) => v);
  getColElements = (board, y) => board.map((row) => row[y]).filter((v) => v);
  getBoxElements = (board, x, y, m, n) => {
    const row = Math.floor(x / m) * m;
    const col = Math.floor(y / n) * n;
  
    const elements = [];
    for (let i = row; i < row + m; i++) {
      for (let j = col; j < col + n; j++) {
        elements.push(board[i][j]);
      }
    }
    return elements;
  };
}



const board = [
  [0, 0, 0, 0, 0, 0, 0, 1, 2],
  [0, 0, 0, 0, 3, 5, 0, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 7, 0],
  [7, 0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 4, 0, 0, 8, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0, 0],
  [0, 8, 0, 0, 0, 0, 0, 4, 0],
  [0, 5, 0, 0, 0, 0, 6, 0, 0],
];

console.time();
new Sudoku(board).search();
console.timeEnd();
