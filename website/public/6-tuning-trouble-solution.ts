import * as fs from "fs";
import * as readline from "readline";

function findStartOfPacket(
  datastream: string,
  numberOfUniqueChars: number
): number {
  for (let i = 0; i <= datastream.length - numberOfUniqueChars; i++) {
    const window = datastream.substring(i, i + numberOfUniqueChars);
    const uniqueChars = new Set(window);
    if (uniqueChars.size === numberOfUniqueChars) {
      return i + numberOfUniqueChars;
    }
  }
  return -1;
}

function processFile(filePath: string): void {
  const reader = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  reader.on("line", (line: string) => {
    let position = findStartOfPacket(line, 4);
    console.log(`PART 1: ${position}`);
    
    position = findStartOfPacket(line, 14);
    console.log(`PART 2: ${position}`);
  });

  reader.on("close", () => {
    console.log("Finished processing the file.");
  });
}

processFile("./src/input.txt");
