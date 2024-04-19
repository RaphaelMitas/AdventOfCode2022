import * as fs from "fs";
import * as readline from "readline";

function calculatePriority(item: string): number {
  if (item >= "a" && item <= "z") {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else if (item >= "A" && item <= "Z") {
    return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
  return 0;
}

// PART 1
function processRucksacks(filePath: string): void {
  const reader = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let totalPrioritySum = 0;

  reader.on("line", (line: string) => {
    const midIndex = line.length / 2;
    const firstCompartment = new Set(line.slice(0, midIndex));
    const secondCompartment = new Set(line.slice(midIndex));

    const commonItems = [...firstCompartment].filter((item) =>
      secondCompartment.has(item)
    );

    for (const item of commonItems) {
      totalPrioritySum += calculatePriority(item);
    }
  });

  reader.on("close", () => {
    console.log(`Total priority sum: ${totalPrioritySum}`);
  });
}

// PART 2
function processGroups(filePath: string): void {
  const reader = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let lines: string[] = [];
  let totalPrioritySum = 0;

  reader.on("line", (line: string) => {
    lines.push(line);
    if (lines.length === 3) {
      const itemSets = lines.map((line) => new Set(line.split("")));
      const commonItems = [...itemSets[0]].filter(
        (item) => itemSets[1].has(item) && itemSets[2].has(item)
      );

      for (const item of commonItems) {
        totalPrioritySum += calculatePriority(item);
      }
      lines = [];
    }
  });

  reader.on("close", () => {
    console.log(`Total priority sum: ${totalPrioritySum}`);
  });
}

processGroups("./src/input.txt");
