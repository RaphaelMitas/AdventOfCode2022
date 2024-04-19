import * as fs from "fs";
import * as readline from "readline";

interface Range {
  start: number;
  end: number;
}

function parseRange(rangeStr: string): Range {
  const [start, end] = rangeStr.split("-").map((num) => Number(num));
  return { start, end };
}

//PART 1
function isContained(a: Range, b: Range): boolean {
  return (
    (a.start <= b.start && a.end >= b.end) ||
    (b.start <= a.start && b.end >= a.end)
  );
}

//PART 2
function overlaps(a: Range, b: Range): boolean {
  return a.start <= b.end && a.end >= b.start;
}

function processAssignments(filePath: string): void {
  const reader = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let count = 0;
  let countOverlaps = 0;

  reader.on("line", (line: string) => {
    const ranges = line.split(",").map((range) => parseRange(range));
    if (isContained(ranges[0], ranges[1])) {
      count++;
    }
    if (overlaps(ranges[0], ranges[1])) {
      countOverlaps++;
    }
  });

  reader.on("close", () => {
    console.log(
      `Number of assignment pairs where one range fully contains the other: ${count}`
    );
    console.log(
      `Number of assignment pairs where the ranges overlap: ${countOverlaps}`
    );
  });
}

processAssignments("./src/input.txt");
