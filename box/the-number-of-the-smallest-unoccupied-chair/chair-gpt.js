class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swap = null;

      if (leftChildIndex < length) {
        if (this.heap[leftChildIndex] < element) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        if (
          (swap === null && this.heap[rightChildIndex] < element) ||
          (swap !== null &&
            this.heap[rightChildIndex] < this.heap[leftChildIndex])
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }
}

var smallestChair = function (times, targetFriend) {
  const events = [];
  for (let i = 0; i < times.length; i++) {
    events.push([times[i][0], "arrive", i]);
    events.push([times[i][1], "leave", i]);
  }

  events.sort((a, b) => a[0] - b[0] || (a[1] === "leave" ? -1 : 1));

  const freeChairs = new MinHeap();
  for (let i = 0; i < times.length; i++) {
    freeChairs.push(i);
  }

  const occupiedChairs = new MinHeap(); // [departureTime, chairNumber]
  const friendToChair = new Array(times.length);

  for (let [time, type, friend] of events) {
    if (type === "arrive") {
      const chair = freeChairs.pop();
      friendToChair[friend] = chair;
      if (friend === targetFriend) return chair;
      occupiedChairs.push([times[friend][1], chair]);
    } else {
      while (occupiedChairs.size() > 0 && occupiedChairs.peek()[0] <= time) {
        const [, chair] = occupiedChairs.pop();
        freeChairs.push(chair);
      }
    }
  }

  return -1;
};

// Test cases
// prettier-ignore
let times = [[1, 4], [2, 3], [4, 6]];
let targetFriend = 1;
console.log(smallestChair(times, targetFriend)); // 1

// prettier-ignore
times = [[3, 10], [1, 5], [2, 6]];
targetFriend = 0;
console.log(smallestChair(times, targetFriend)); // 2

// prettier-ignore
times = [[33889,98676],[80071,89737],[44118,52565],[52992,84310],[78492,88209],[21695,67063],[84622,95452],[98048,98856],[98411,99433],[55333,56548],[65375,88566],[55011,62821],[48548,48656],[87396,94825],[55273,81868],[75629,91467]];
targetFriend = 6;
console.log(smallestChair(times, targetFriend)); // 2
// prettier-ignore
times = [[4,5],[12,13],[5,6],[1,2],[8,9],[9,10],[6,7],[3,4],[7,8],[13,14],[15,16],[14,15],[10,11],[11,12],[2,3],[16,17]];
targetFriend = 15;
console.log(smallestChair(times, targetFriend)); // 0
