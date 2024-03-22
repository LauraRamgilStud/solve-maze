"use-strict";

import { createMazeGrid, showMaze, showPath } from "../view/view.js";
import {
  loadMazeFromJSON,
  getPossibleNeighbors,
  depthFirstSearch,
} from "../model/model.js";
let model;
window.addEventListener("load", displayMaze);

export async function displayMaze() {
  model = await loadMazeFromJSON();
  createMazeGrid(model);
  showMaze(model);
  const route = depthFirstSearch(model.start);
  console.log(route);
  showPath(route, model);
}

function visitCell(cell) {
  cell.visited = true;
  route.push(cell);
  showVisited(cell, model);

  if (cell.row === model.goal.row && cell.col === model.goal.col) {
    console.log("Goal Reached");
    return;
  }

  const neighbors = getPossibleNeighbors(cell);
  if (neighbors.length > 0) {
    visitCell(neighbors[0]);
  }
}
