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

processRucksacks("./src/input.txt");
