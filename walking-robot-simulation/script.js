var robotSim = function (commands, obstacles) {
  var x = 0,
    y = 0,
    dir = 0,
    maxD = 0;

  // Definir el Set de obstáculos
  const obstacleSet = new Set(
    obstacles.map((obstacle) => `${obstacle[0]},${obstacle[1]}`)
  );

  const setDirection = (command) => {
    const newDir = command === -1 ? (dir + 1) % 4 : (dir + 3) % 4;
    return newDir;
  };

  const yStop = (x, y1, y2) => {
    if (y1 < y2) {
      for (let ye = y1 + 1; ye <= y2; ye++) {
        if (obstacleSet.has(`${x},${ye}`)) {
          return ye - 1;
        }
      }
      return y2;
    } else {
      for (let ye = y1 - 1; ye >= y2; ye--) {
        if (obstacleSet.has(`${x},${ye}`)) {
          return ye + 1;
        }
      }
      return y2;
    }
  };

  const xStop = (x1, x2, y) => {
    if (x1 < x2) {
      for (let xe = x1 + 1; xe <= x2; xe++) {
        if (obstacleSet.has(`${xe},${y}`)) {
          return xe - 1;
        }
      }
      return x2;
    } else {
      for (let xe = x1 - 1; xe >= x2; xe--) {
        if (obstacleSet.has(`${xe},${y}`)) {
          return xe + 1;
        }
      }
      return x2;
    }
  };

  for (let command of commands) {
    if (command < 0) dir = setDirection(command);
    if (command > 0) {
      if (dir === 0) y = yStop(x, y, y + command);
      if (dir === 1) x = xStop(x, x + command, y);
      if (dir === 2) y = yStop(x, y, y - command);
      if (dir === 3) x = xStop(x, x - command, y);
      maxD = Math.max(maxD, Math.pow(x, 2) + Math.pow(y, 2));
    }
  }
  return maxD;
};
