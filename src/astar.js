/**
 *
 */
 class Astar {
  // neigbhors_x = new Array(2);
  // neigbhors_y = new Array(2);
  goalX;
  goalY;
  minF;
  bestIdx_x;
  bestIdx_y;
  bestIdx_f;
  neigbhors_x;
  neigbhors_y;
  neigbhors_f;
  constructor(grid) {
  this.grid = grid;
}

/**
 * search the optimial path
 * @param x
 * @param y
 * @param goalX
 * @param goalY
 */
search(x, y, goalX, goalY) {

  if (x === goalX && y === goalY) {
    return console.log("goal found");
  }
  this.goalX = goalX;
  this.goalY = goalY;

  this.neigbhors_x = [];
  this.neigbhors_y = [];
  this.neigbhors_f = [];

    console.log("x and y: " + "("+ x + ","+ y+")");
    this.getNeighbors(this.grid, x, y, goalX, goalY);

    //console.log("F score: " + this.neigbhors_f);
    this.minF = this.findBestNeighbor(this.neigbhors_f[0]);
    console.log("neighbors.x: " + this.neigbhors_x);
    console.log("neighbors.y: " + this.neigbhors_y);
    console.log("neighbors.f: " + this.neigbhors_f);
    console.log("min F: " + this.minF);

    this.bestIdx_f = this.neigbhors_f.indexOf(this.minF);
    console.log("bestIdx_f " + this.bestIdx_f);
    this.bestIdx_x = this.neigbhors_x[this.bestIdx_f];
    this.bestIdx_y = this.neigbhors_y[this.bestIdx_f];
    console.log("BI" + "("+this.bestIdx_x + ","+ this.bestIdx_y+")");
    console.log("gx " + this.goalX + " gy " + this.goalY);
    console.log(typeof(this.goalX) + " " + typeof(this.bestIdx_x));
    //console.log("min value: " + this.findBestNeighbor(this.neigbhors_f[0]));
    if ((this.bestIdx_x != this.goalX) || (this.bestIdx_y != this.goalY)) {
      console.log("no goal found move to new node");
      console.log("bestIdx: " + "("+this.bestIdx_x + ","+ this.bestIdx_y+")");
      this.search(this.bestIdx_x, this.bestIdx_y, goalX, goalY);
    }
    if ((this.bestIdx_x == this.goalX) && (this.bestIdx_y == this.goalY)) {
      return console.log("goal found" +"("+this.bestIdx_x + ","+ this.bestIdx_y+")" +  "("+this.goalX + ","+ this.goalY+")");
    }

  }

/**
 * return all neighbors
 * @param grid
 * @param x
 * @param y
 */
getNeighbors(grid, x, y, goalX, goalY) {
  console.log("grid[x][y]: " + grid[x][y]);
  
  if (grid[x - 1][y] == 0) { // (grid[x - 1][y] != 1) || (grid[x - 1][y] != 2)
    this.neigbhors_x.push(x - 1);
    this.neigbhors_y.push(y);
    this.neigbhors_f.push(this.heuristic(x-1, y, goalX, goalY));
    console.log("pushed neighbors 1: " + "(" + x-1 + "," + y+") " + grid[x - 1][y]);
  }

  if (grid[x+1][y] == 0) { //(grid[x + 1][y] != 1) || (grid[x + 1][y] != 2)
    this.neigbhors_x.push(x + 1);
    this.neigbhors_y.push(y);
    this.neigbhors_f.push(this.heuristic(x+1, y, goalX, goalY));
    console.log(" pushed neighbors 2: "+ "(" + (x+1)+ "," + y +") "+ grid[x + 1][y]);
  }

  if (grid[x][y-1] == 0) { // (grid[x][y - 1] != 1) || (grid[x][y - 1] != 2)
    this.neigbhors_x.push(x);
    this.neigbhors_y.push(y - 1);
    this.neigbhors_f.push(this.heuristic(x, y-1, goalX, goalY));
    console.log("pushed neighbors 3: "+ "(" + x + "," + (y-1) +") " + grid[x][y - 1]);
  }

  if (grid[x][y + 1] == 0) { // (grid[x][y + 1] != 1) || (grid[x][y + 1] != 2)
    this.neigbhors_x.push(x);
    this.neigbhors_y.push(y + 1);
    this.neigbhors_f.push(this.heuristic(x, y+1, goalX, goalY));
    console.log(" pushed neighbors 4: "+ "(" + x + "," + (y+1) +") " + grid[x][y + 1]);
  }
}

/**
 * return manhattan distance
 * @param x
 * @param y
 * @param goalX
 * @param goalY
 * @returns {number}
 */
heuristic(x, y, goalX, goalY) {
  return (Math.abs(goalX - x) + Math.abs(goalY - y));
}

findBestNeighbor(minF) {
  for (let i = 1; i < this.neigbhors_f.length; i++) {
    if (minF > this.neigbhors_f[i]) {
      minF = this.neigbhors_f[i]
      console.log("Inside minF: " + minF);
      console.log("indexOf minF: " + this.neigbhors_f.indexOf(minF));
    }
  }
  return minF;
}
}