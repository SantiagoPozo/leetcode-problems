var MyCalendarTwo = function () {
  this.book = [];
  this.intersections = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */

MyCalendarTwo.prototype.isCompatible = function (start, end) {
  let left = 0;
  let right = this.intersections.length - 1;

  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    const [s, e] = this.intersections[mid];
    if (s < end && e > start) {
      return false; // Hay un triple solapamiento
    }
    if (start >= e) left = mid + 1;
    else right = mid - 1;
  }

  return true;
};

MyCalendarTwo.prototype.book = function (start, end) {
  if (!this.isCompatible(start, end)) return false;

  let left = 0;
  let right = this.book.length - 1;

  // Insertar en 'book' usando búsqueda binaria
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    const [s, e] = this.book[mid];
    if (start >= e) left = mid + 1;
    else right = mid - 1;
  }

  // Insertamos el nuevo intervalo en la posición correcta de 'book'
  this.book.splice(left, 0, [start, end]);

  // Actualizar 'intersections'
  let mid = left;

  // Array auxiliar para nuevas intersecciones
  let newIntersections = [];

  // Revisar hacia adelante
  for (let i = mid; i < this.book.length; i++) {
    const [s, e] = this.book[i];
    if (s < end && e > start) {
      newIntersections.push([Math.max(s, start), Math.min(e, end)]);
    }
    if (s >= end) break;
  }

  // Revisar hacia atrás
  for (let i = mid - 1; i >= 0; i--) {
    const [s, e] = this.book[i];
    if (s < end && e > start) {
      newIntersections.unshift([Math.max(s, start), Math.min(e, end)]);
    }
    if (e <= start) break;
  }

  // Insertar las nuevas intersecciones
  for (let inter of newIntersections) {
    left = 0;
    right = this.intersections.length - 1;

    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2);
      const [s, e] = this.intersections[mid];
      if (inter[0] >= e) left = mid + 1;
      else right = mid - 1;
    }

    this.intersections.splice(left, 0, inter);
  }

  return true;
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(start,end)
 */

// test MyCalendarTwo
let books = [];
let expected = [];

// books = [[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]];
// expected = [null, true, true, true, false, true, true];
// const calendar1 = new MyCalendarTwo();
// printBookings(books);

// test MyCalendarTwo
books = [
  [],
  [47, 50],
  [1, 10],
  [27, 36],
  [40, 47],
  [20, 27],
  [15, 23],
  [10, 18],
  [27, 36],
  [17, 25],
  [8, 17],
  [24, 33],
  [23, 28],
  [21, 27],
  [47, 50],
  [14, 21],
  [26, 32],
  [16, 21],
  [2, 7],
  [24, 33],
  [6, 13],
  [44, 50],
  [33, 39],
  [30, 36],
  [6, 15],
  [21, 27],
  [49, 50],
  [38, 45],
  [4, 12],
  [46, 50],
  [13, 21],
];
expected = [
  null,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
];
const calendar2 = new MyCalendarTwo();
printBookings(calendar2, books, expected);

function printBookings(calendar, books, expected) {
  let ans = [];
  for (let i = 1; i < books.length; i++) {
    console.log(" ");
    console.log(books[i]);
    ans[i] = calendar.book(books[i][0], books[i][1]);
    console.log(
      `booking ${books[i][0] < 10 ? " " + books[i][0] : books[i][0]} to ${
        books[i][1] < 10 ? " " + books[i][1] : books[i][1]
      }:`,
      ans[i],
      ans[i] ? " " : "",
      "expected:",
      expected[i],
      expected[i] ? " " : "",
      ans[i] !== expected[i] ? "\x1b[31m fail!!!" : "\x1b[32m OK",
      "\x1b[37m"
    );
  }

  console.log("book:", calendar.book);
  console.log("intersections:", calendar.intersections);
}
