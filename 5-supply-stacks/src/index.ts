import * as fs from "fs";
import * as readline from "readline";

interface Move {
  quantity: number;
  fromStack: number;
  toStack: number;
}

/**
 * Parse input file and return stacks and moves
 * @param filePath path to input file
 * @returns Promise<[string[][], Move[]]>
 * @throws Error
 * @async
 **/
function parseInput(filePath: string): Promise<[string[][], Move[]]> {
  return new Promise((resolve, reject) => {
    const stacks: string[][] = [];
    const moves: Move[] = [];
    let parsingStacks = true;

    const reader = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    reader.on("line", (line: string) => {
      if (line.trim().match(/^[0-9]+/)) {
        parsingStacks = false;
      }

      if (parsingStacks) { //parse stacks
        for (let i = 0; i < line.length; i += 4) {
          let segment = line.slice(i, i + 3).trim();
          const stackIndex = i / 4;
          if (!stacks[stackIndex]) {
            stacks[stackIndex] = [];
          }
          if (segment) {
            segment = segment.replace(/\[|\]/g, "");
            stacks[stackIndex].push(segment);
          }
        }
      } else { //parse moves
        const match = line.match(/move (\d+) from (\d+) to (\d+)/);
        if (match) {
          moves.push({
            quantity: parseInt(match[1]),
            fromStack: parseInt(match[2]),
            toStack: parseInt(match[3]),
          });
        }
      }
    });

    reader.on("close", () => {
      //reverse stacks
      stacks.forEach((stack) => stack.reverse());
      resolve([stacks, moves]);
    });

    reader.on("error", (error) => {
      reject(error);
    });
  });
}

/**
 * Simulate crates movement
 * @param stacks stacks of crates
 * @param moves moves to simulate
 * @returns final order of crates as 2D array
 * @async
 **/
async function simulateCratesMovement(
  stacks: string[][],
  moves: Move[]
): Promise<string[][]> {
  for (const move of moves) {
    while (move.quantity > 0) {
      const crate = stacks[move.fromStack - 1].pop();
      if (crate) {
        stacks[move.toStack - 1].push(crate);
        move.quantity--;
      } else {
        break;
      }
    }
  }

  return stacks;
}

parseInput("./src/input.txt")
  .then(([stacks, moves]) => simulateCratesMovement(stacks, moves))
  .then((stacks) => stacks.reduce((acc, stack) => `${acc}${stack.pop()}`, ""))
  .then(console.log);
