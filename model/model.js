"use-strict";

let model;

export async function loadMazeFromJSON() {
  try {
    let res = await fetch("maze.json");
    let data = await res.json();
    model = data;
  } catch (error) {
    console.error("Could not load json", error);
  }
  return model;
}

export function getAllNeighbors(cell) {
  const neighbors = [];
  const { row, col } = cell;
  if (row > 0) neighbors.push({ row: row - 1, col: col }); // North neighbor
  if (row < model.rows - 1) neighbors.push({ row: row + 1, col: col }); // South neighbor
  if (col > 0) neighbors.push({ row: row, col: col - 1 }); // West neighbor
  if (col < model.cols - 1) neighbors.push({ row: row, col: col + 1 }); // East neighbor
  return neighbors;
}

function getUnvisited(cell) {}

export function getPossibleNeighbors(cell) {
  const neighbors = [];
  const { row, col } = cell;
  if (
    row !== 0 &&
    !model.maze[row][col].north &&
    !model.maze[row - 1][col].isVisited
  )
    neighbors.push(model.maze[row - 1][col]); // North

  if (
    col !== model.cols - 1 &&
    !model.maze[row][col].east &&
    !model.maze[row][col + 1].isVisited
  )
    neighbors.push(model.maze[row][col + 1]); // east

  if (
    row !== model.rows - 1 &&
    !model.maze[row][col].south &&
    !model.maze[row + 1][col].isVisited
  )
    neighbors.push(model.maze[row + 1][col]); // south

  if (
    col !== 0 &&
    !model.maze[row][col].west &&
    !model.maze[row][col - 1].isVisited
  )
    neighbors.push(model.maze[row][col - 1]); // west

  return neighbors;
}

export function depthFirstSearch(start) {
  const startNode = start;
  const goalNode = model.goal;
  let stack = []; //unvisitedNodes
  let route = []; //visitedNodesInOrder
  stack.push(startNode);

  while (stack.length !== 0) {
    let nextNode = stack.pop();

    if (nextNode.isVisited) continue;

    route.push(nextNode);
    nextNode.isVisited = true;
    if (nextNode.row === goalNode.row && nextNode.col === goalNode.col) {
      return route;
    }

    let unvisited = getPossibleNeighbors(nextNode);
    unvisited.forEach((neighbor) => {
      neighbor.prevCell = nextNode;
      stack.push(neighbor);
    });
  }
  return route;
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
