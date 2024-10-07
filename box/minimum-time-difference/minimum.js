/* function findMinDifference(timePoints) {
  let minutes0 = [];
  let minutes1 = [];
  let minutes2 = [];

  for (const time of timePoints) {
    const [hour, minute] = time.split(":");
    const totalMinutes = parseInt(hour) * 60 + parseInt(minute);
    if (totalMinutes < 480) {
      if (minutes0.includes(totalMinutes)) {
        return 0;
      } else {
        minutes0.push(totalMinutes);
      }
    } else if (totalMinutes < 960) {
      if (minutes1.includes(totalMinutes)) {
        return 0;
      } else {
        minutes1.push(totalMinutes);
      }
    } else {
      if (minutes2.includes(totalMinutes)) {
        return 0;
      } else {
        minutes2.push(totalMinutes);
      }
    }
  }

  minutes0.sort((a, b) => a - b);
  minutes1.sort((a, b) => a - b);
  minutes2.sort((a, b) => a - b);

  const minutes = [...minutes0, ...minutes1, ...minutes2];

  minutes.push(minutes[0] + 1440);

  let minDifference = 1440;
  for (let i = 0; i < minutes.length - 1; i++) {
    const diff = minutes[i + 1] - minutes[i];
    if (diff < minDifference) {
      minDifference = diff;
    }
  }

  return minDifference;
} 
// 69ms; 51.60MB  
*/

function findMinDifference(timePoints) {
  let minutes = [];

  for (const time of timePoints) {
    const [hour, minute] = time.split(":");
    const totalMinutes = parseInt(hour) * 60 + parseInt(minute);
    if (minutes.includes(totalMinutes)) return 0;
    else minutes.push(totalMinutes);
  }

  minutes.sort((a, b) => a - b);
  minutes.push(minutes[0] + 1440);

  let minDifference = 1440;
  for (let i = 0; i < minutes.length - 1; i++) {
    const diff = minutes[i + 1] - minutes[i];
    if (diff < minDifference) {
      minDifference = diff;
    }
  }

  return minDifference;
}

console.log(findMinDifference(["23:59", "00:00"])); // 1
console.log(findMinDifference(["00:00", "23:59", "00:00"])); // 0
console.log(findMinDifference(["00:00", "04:00", "22:00"])); // 120
