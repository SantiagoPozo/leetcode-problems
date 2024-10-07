class MyCalendarTwo {
  constructor() {
    this.calendar = [];
    this.intersections = [];
  }

  isCompatible(start, end) {
    for (let [s, e] of this.intersections) {
      if (s < end && e > start) {
        return false; // Hay un triple solapamiento
      }
    }
    return true;
  }

  book(start, end) {
    if (!this.isCompatible(start, end)) return false;

    // Verificar intersecciones
    for (let [s, e] of this.calendar) {
      if (s < end && e > start) {
        this.intersections.push([Math.max(s, start), Math.min(e, end)]);
      }
    }

    // Insertar el nuevo intervalo en calendar
    this.calendar.push([start, end]);
    return true;
  }
}

// Test MyCalendarTwo
const books = [
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

const expected = [
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
      `booked?: ${ans[i]}   expected: ${expected[i]}   ${
        ans[i] === expected[i]
          ? "\x1b[32mOK \x1b[37m"
          : "\x1b[31mfail!!! \x1b[37m"
      }`
    );
  }

  console.log("calendar:", calendar.calendar);
  console.log("intersections:", calendar.intersections);
}
