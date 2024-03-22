"use-strict";

export function showMaze(model) {
  const cellElements = document.querySelectorAll("#grid .cell");

  for (let row = 0; row < model.rows; row++) {
    for (let col = 0; col < model.cols; col++) {
      const cell = model.maze[row][col];

      const cellElmIndex = row * model.cols + col;
      const cellElm = cellElements[cellElmIndex];
      if (cell.north) cellElm.classList.add("north");
      if (cell.south) cellElm.classList.add("south");
      if (cell.east) cellElm.classList.add("east");
      if (cell.west) cellElm.classList.add("west");
      showGoal(model);
      showStart(model);
    }
  }
}

export function createMazeGrid(model) {
  const grid = document.querySelector("#grid");
  grid.style.setProperty("--GRID_WIDTH", model.cols);
  for (let row = 0; row < model.rows; row++) {
    for (let col = 0; col < model.cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
    }
  }
}

function showGoal(model) {
  const cellElements = document.querySelectorAll("#grid .cell");
  const cellElmIndex = model.goal.row * model.cols + model.goal.col;
  const cellElm = cellElements[cellElmIndex];

  cellElm.classList.add("goal");
}

function showStart(model) {
  const cellElements = document.querySelectorAll("#grid .cell");
  const cellElmIndex = model.start.row * model.cols + model.start.col;
  const cellElm = cellElements[cellElmIndex];

  cellElm.classList.add("start");
}

export function showPath(nodes, model) {
  const cellElements = document.querySelectorAll("#grid .cell");

  function nextNode() {
    if (nodes.length !== 0) {
      const current = nodes.shift();
      const row = current.row;
      const col = current.col;
      const index = row * model.cols + col;
      const cellElm = cellElements[index];
      if (cellElm.classList.contains("start")) {
        cellElm.classList.remove("start");
      }
      if (cellElm.classList.contains("goal")) {
        cellElm.classList.remove("goal");
      }

      cellElm.classList.add("visited");

      setTimeout(nextNode, 300);
    }
  }

  nextNode();
}
