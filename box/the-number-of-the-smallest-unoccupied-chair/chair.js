/**
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */

var smallestChair = function (times, targetFriend) {
  const targetTime = times[targetFriend][0];
  const len = times.length;
  const emptyChairs = Array(len).fill(true);
  const whereDidThisFriendSitDown = [];
  // frind#n => number of chair in wich #n is sitted down

  // findFirstEmptyChair
  const findFirstEmptyChair = function () {
    for (i in emptyChairs) return Number(i);
  };

  // friendIsLeaving
  const friendIsLeaving = (n) => {
    // So friend n leaves (already?)
    const chair = whereDidThisFriendSitDown[n];
    emptyChairs[chair] = true;
  };

  // friendIsArriving
  const friendIsArriving = (n) => {
    // n is the number of friend that sits down
    const firstEmptyChair = findFirstEmptyChair();
    whereDidThisFriendSitDown[n] = firstEmptyChair;
    delete emptyChairs[firstEmptyChair];
  };

  const state = [];
  for (let fi = 0; fi < len; fi++) {
    // friend index

    let [at, dt] = [Number(times[fi][0]), Number(times[fi][1])];
    // arrival time
    if (at <= targetTime) {
      if (!state[at]) state[at] = { leaves: [], arrives: fi };
      else {
        state[at] = {
          ...state[at],
          arrives: fi,
        };
      }
    }
    // departure time
    if (dt <= targetTime) {
      if (!state[dt]) state[dt] = { leaves: [fi] };
      else state[dt].leaves.push(fi);
    }
  }
  /*   for (time in state) {
    console.log(time, ":", state[time]);
  } */

  let result = 0;
  for (let time in state) {
    // console.log("bucle for (let time in state): time ===", time);

    if (state[time].leaves !== undefined) {
      // somebody leaves
      for (let friend of state[time].leaves) {
        friendIsLeaving(friend);
      }
    }

    if (time == targetTime) return findFirstEmptyChair();
    // somebody arrives
    if (Number(state[time].arrives) >= 0) {
      friendIsArriving(state[time].arrives);
      // console.log("friend", state[time].arrives, "arrives");
    }
    // console.log(emptyChairs);
  }

  return result;
};

// prettier-ignore
let times = [[1, 4], [2, 3], [4, 6]];
let targetFriend = 1;
console.log(smallestChair(times, targetFriend)); // 1

// prettier-ignore
(times = [ [3, 10], [1, 5], [2, 6],]), (targetFriend = 0);
console.log(smallestChair(times, targetFriend)); // 2

/* prettier-ignore */
times = [[33889,98676],[80071,89737],[44118,52565],[52992,84310],[78492,88209],[21695,67063],[84622,95452],[98048,98856],[98411,99433],[55333,56548],[65375,88566],[55011,62821],[48548,48656],[87396,94825],[55273,81868],[75629,91467]];
targetFriend = 6;
console.log(smallestChair(times, targetFriend)); // 2

/* prettier-ignore */
times = [[4,5],[12,13],[5,6],[1,2],[8,9],[9,10],[6,7],[3,4],[7,8],[13,14],[15,16],[14,15],[10,11],[11,12],[2,3],[16,17]];
targetFriend = 15;
console.log(smallestChair(times, targetFriend)); // 0
