import * as fs from "fs";
import * as readline from "readline";

interface Range {
  start: number;
  end: number;
}

function parseRange(rangeStr: string): Range {
  const [start, end] = rangeStr.split("-").map(num => Number(num));
  return { start, end };
}

function isContained(a: Range, b: Range): boolean {
  return (
    (a.start <= b.start && a.end >= b.end) ||
    (b.start <= a.start && b.end >= a.end)
  );
}

function processAssignments(filePath: string): void {
  const reader = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let count = 0;

  reader.on("line", (line: string) => {
    const ranges = line.split(",").map((range) => parseRange(range));
    if (isContained(ranges[0], ranges[1])) {
      count++;
    }
  });

  reader.on("close", () => {
    console.log(
      `Number of assignment pairs where one range fully contains the other: ${count}`
    );
  });
}

processAssignments("./src/input.txt");
