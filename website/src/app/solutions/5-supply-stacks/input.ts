interface Move {
  quantity: number;
  fromStack: number;
  toStack: number;
}

/**
 * Parse input string and return stacks and moves
 * @param input string containing crate stacks and moves
 * @returns [string[][], Move[]] stacks and moves parsed from input
 * @throws Error
 **/
function parseInput(input: string): [string[][], Move[]] {
  const stacks: string[][] = [];
  const moves: Move[] = [];
  let parsingStacks = true;
  const lines = input.split("\n");

  lines.forEach((line) => {
    if (line.trim().match(/^[0-9]+/)) {
      parsingStacks = false;
    }

    if (parsingStacks) {
      //parse stacks
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
    } else {
      //parse moves
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

  //reverse stacks
  stacks.forEach((stack) => stack.reverse());
  return [stacks, moves];
}

/**
 * Simulate crates movement
 * @param stacks stacks of crates
 * @param moves moves to simulate
 * @returns final order of crates as 2D array
 **/
function simulateCratesMovement(stacks: string[][], moves: Move[]): string[][] {
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

/**
 * Simulate crates movement with a different strategy
 * @param stacks stacks of crates
 * @param moves moves to simulate
 * @returns final order of crates as 2D array
 **/
function simulateCratesMovement2(
  stacks: string[][],
  moves: Move[]
): string[][] {
  for (const move of moves) {
    const crates = stacks[move.fromStack - 1].splice(
      stacks[move.fromStack - 1].length - move.quantity
    );
    stacks[move.toStack - 1].push(...crates);
  }

  return stacks;
}

export function simulateMovements(inputData: string): string {
  let [stacks, moves] = parseInput(inputData);
  const finalStacks = simulateCratesMovement(stacks, moves);
  const output1 = finalStacks.reduce(
    (acc, stack) => `${acc}${stack.pop() || ""}`,
    ""
  );

  [stacks, moves] = parseInput(inputData);
  const finalStacks2 = simulateCratesMovement2(stacks, moves);
  const output2 = finalStacks2.reduce(
    (acc, stack) => `${acc}${stack.pop() || ""}`,
    ""
  );

  return `PART 1: ${output1}\nPART 2: ${output2}`;
}

export const input = `[G]                 [D] [R]
[W]         [V]     [C] [T] [M]
[L]         [P] [Z] [Q] [F] [V]
[J]         [S] [D] [J] [M] [T] [V]
[B]     [M] [H] [L] [Z] [J] [B] [S]
[R] [C] [T] [C] [T] [R] [D] [R] [D]
[T] [W] [Z] [T] [P] [B] [B] [H] [P]
[D] [S] [R] [D] [G] [F] [S] [L] [Q]
 1   2   3   4   5   6   7   8   9

move 1 from 3 to 5
move 5 from 5 to 4
move 6 from 7 to 3
move 6 from 1 to 3
move 1 from 1 to 9
move 1 from 1 to 4
move 3 from 6 to 9
move 2 from 7 to 5
move 1 from 5 to 7
move 1 from 7 to 2
move 2 from 2 to 5
move 2 from 6 to 3
move 6 from 8 to 9
move 7 from 3 to 9
move 1 from 8 to 7
move 8 from 9 to 7
move 5 from 4 to 8
move 1 from 6 to 2
move 2 from 8 to 4
move 9 from 9 to 1
move 2 from 8 to 5
move 1 from 8 to 5
move 5 from 9 to 2
move 1 from 6 to 8
move 5 from 1 to 7
move 1 from 8 to 2
move 2 from 1 to 7
move 1 from 2 to 6
move 4 from 5 to 4
move 2 from 1 to 4
move 13 from 7 to 8
move 3 from 8 to 6
move 2 from 6 to 8
move 10 from 3 to 5
move 2 from 7 to 6
move 3 from 5 to 6
move 10 from 8 to 1
move 1 from 8 to 6
move 6 from 2 to 4
move 1 from 5 to 8
move 5 from 6 to 3
move 2 from 8 to 6
move 1 from 7 to 9
move 2 from 2 to 7
move 3 from 5 to 1
move 2 from 7 to 2
move 6 from 6 to 3
move 7 from 5 to 6
move 5 from 3 to 2
move 10 from 1 to 8
move 2 from 1 to 3
move 8 from 3 to 7
move 9 from 4 to 8
move 1 from 9 to 2
move 2 from 7 to 8
move 4 from 6 to 9
move 1 from 4 to 9
move 5 from 7 to 4
move 3 from 6 to 5
move 1 from 1 to 5
move 14 from 4 to 8
move 3 from 9 to 7
move 4 from 5 to 9
move 2 from 4 to 1
move 27 from 8 to 6
move 2 from 7 to 2
move 2 from 7 to 4
move 4 from 2 to 9
move 7 from 8 to 4
move 10 from 4 to 1
move 18 from 6 to 5
move 6 from 9 to 2
move 1 from 9 to 5
move 11 from 2 to 6
move 2 from 5 to 4
move 1 from 2 to 8
move 2 from 4 to 9
move 2 from 8 to 3
move 1 from 6 to 8
move 4 from 9 to 7
move 4 from 7 to 8
move 7 from 5 to 1
move 4 from 6 to 3
move 2 from 3 to 7
move 6 from 5 to 3
move 2 from 8 to 2
move 14 from 6 to 2
move 3 from 8 to 1
move 15 from 2 to 3
move 1 from 6 to 1
move 14 from 3 to 2
move 2 from 2 to 5
move 1 from 9 to 3
move 13 from 1 to 3
move 4 from 2 to 6
move 10 from 1 to 3
move 2 from 6 to 9
move 6 from 2 to 9
move 6 from 5 to 2
move 2 from 6 to 8
move 7 from 9 to 5
move 1 from 5 to 8
move 2 from 7 to 6
move 34 from 3 to 6
move 19 from 6 to 2
move 12 from 6 to 9
move 3 from 6 to 3
move 2 from 3 to 2
move 1 from 6 to 5
move 17 from 2 to 8
move 2 from 3 to 2
move 8 from 9 to 4
move 7 from 5 to 2
move 5 from 4 to 1
move 4 from 1 to 6
move 1 from 1 to 6
move 6 from 6 to 8
move 2 from 8 to 4
move 17 from 8 to 6
move 2 from 4 to 5
move 17 from 6 to 9
move 22 from 9 to 7
move 1 from 5 to 2
move 20 from 2 to 7
move 29 from 7 to 9
move 1 from 4 to 7
move 3 from 8 to 3
move 1 from 8 to 5
move 3 from 8 to 2
move 2 from 2 to 4
move 27 from 9 to 7
move 2 from 3 to 2
move 1 from 5 to 2
move 18 from 7 to 5
move 1 from 3 to 2
move 1 from 5 to 6
move 18 from 5 to 3
move 1 from 6 to 3
move 2 from 9 to 5
move 10 from 3 to 5
move 4 from 3 to 6
move 1 from 7 to 1
move 1 from 5 to 1
move 6 from 7 to 6
move 1 from 6 to 2
move 4 from 4 to 8
move 5 from 5 to 4
move 1 from 3 to 8
move 2 from 1 to 8
move 2 from 2 to 5
move 3 from 3 to 8
move 6 from 8 to 2
move 1 from 3 to 9
move 1 from 6 to 3
move 6 from 2 to 8
move 7 from 8 to 4
move 8 from 5 to 2
move 5 from 4 to 6
move 2 from 8 to 3
move 2 from 3 to 9
move 1 from 3 to 9
move 2 from 7 to 1
move 2 from 1 to 2
move 12 from 2 to 4
move 1 from 9 to 7
move 1 from 6 to 2
move 9 from 7 to 9
move 1 from 8 to 2
move 9 from 9 to 8
move 6 from 7 to 8
move 4 from 4 to 1
move 6 from 2 to 5
move 1 from 4 to 9
move 3 from 1 to 9
move 6 from 4 to 5
move 5 from 8 to 9
move 8 from 4 to 6
move 3 from 9 to 8
move 1 from 9 to 3
move 3 from 8 to 3
move 5 from 9 to 2
move 3 from 2 to 6
move 3 from 6 to 9
move 3 from 6 to 2
move 4 from 2 to 6
move 6 from 9 to 7
move 1 from 1 to 8
move 8 from 8 to 5
move 20 from 5 to 3
move 2 from 2 to 8
move 6 from 7 to 1
move 10 from 6 to 3
move 4 from 6 to 7
move 4 from 1 to 9
move 2 from 1 to 2
move 3 from 6 to 9
move 5 from 8 to 3
move 3 from 7 to 9
move 17 from 3 to 2
move 1 from 6 to 2
move 2 from 6 to 9
move 1 from 6 to 4
move 12 from 9 to 2
move 1 from 4 to 7
move 8 from 3 to 8
move 8 from 8 to 9
move 7 from 9 to 2
move 1 from 9 to 7
move 18 from 2 to 9
move 1 from 7 to 2
move 2 from 7 to 1
move 1 from 1 to 2
move 4 from 2 to 7
move 15 from 9 to 3
move 1 from 9 to 1
move 2 from 1 to 8
move 6 from 2 to 4
move 8 from 2 to 1
move 2 from 8 to 5
move 2 from 9 to 3
move 4 from 4 to 1
move 2 from 5 to 8
move 2 from 8 to 9
move 14 from 3 to 1
move 2 from 9 to 7
move 2 from 4 to 3
move 1 from 2 to 9
move 5 from 7 to 9
move 21 from 1 to 9
move 2 from 1 to 6
move 3 from 2 to 4
move 1 from 7 to 3
move 19 from 9 to 5
move 1 from 2 to 7
move 1 from 7 to 2
move 3 from 4 to 2
move 19 from 5 to 7
move 2 from 2 to 5
move 1 from 5 to 3
move 1 from 3 to 4
move 8 from 9 to 4
move 1 from 6 to 3
move 1 from 2 to 6
move 1 from 2 to 1
move 8 from 7 to 3
move 5 from 4 to 7
move 2 from 6 to 4
move 1 from 5 to 9
move 1 from 1 to 6
move 1 from 1 to 2
move 2 from 4 to 7
move 1 from 4 to 2
move 2 from 4 to 9
move 1 from 6 to 8
move 1 from 1 to 5
move 1 from 8 to 6
move 1 from 1 to 4
move 25 from 3 to 1
move 1 from 4 to 2
move 2 from 3 to 6
move 3 from 1 to 9
move 6 from 9 to 8
move 1 from 6 to 3
move 1 from 2 to 9
move 15 from 7 to 6
move 2 from 2 to 6
move 1 from 3 to 8
move 1 from 1 to 4
move 6 from 8 to 4
move 1 from 3 to 8
move 1 from 8 to 5
move 2 from 5 to 2
move 8 from 6 to 7
move 1 from 8 to 7
move 1 from 9 to 4
move 9 from 4 to 5
move 19 from 1 to 3
move 9 from 3 to 5
move 6 from 7 to 2
move 2 from 1 to 7
move 7 from 2 to 4
move 7 from 5 to 6
move 5 from 4 to 3
move 3 from 5 to 8
move 1 from 2 to 4
move 2 from 4 to 8
move 14 from 6 to 1
move 6 from 5 to 6
move 1 from 5 to 2
move 7 from 1 to 6
move 1 from 2 to 4
move 4 from 6 to 4
move 1 from 5 to 4
move 2 from 1 to 9
move 2 from 9 to 4
move 2 from 1 to 8
move 9 from 3 to 6
move 3 from 7 to 4
move 4 from 8 to 6
move 3 from 7 to 6
move 1 from 7 to 2
move 1 from 7 to 5
move 3 from 8 to 4
move 26 from 6 to 1
move 8 from 1 to 2
move 1 from 6 to 4
move 5 from 2 to 7
move 2 from 2 to 4
move 10 from 4 to 7
move 1 from 6 to 1
move 22 from 1 to 2
move 1 from 6 to 1
move 6 from 4 to 7
move 1 from 5 to 1
move 1 from 1 to 2
move 21 from 7 to 2
move 38 from 2 to 3
move 8 from 2 to 6
move 2 from 4 to 8
move 2 from 8 to 2
move 1 from 1 to 3
move 1 from 2 to 8
move 1 from 2 to 5
move 6 from 6 to 4
move 2 from 4 to 2
move 2 from 2 to 6
move 1 from 8 to 2
move 28 from 3 to 1
move 11 from 1 to 2
move 8 from 1 to 7
move 4 from 6 to 4
move 8 from 3 to 1
move 8 from 2 to 5
move 6 from 5 to 4
move 2 from 5 to 4
move 8 from 3 to 4
move 22 from 4 to 1
move 2 from 3 to 5
move 33 from 1 to 5
move 26 from 5 to 6
move 4 from 5 to 7
move 2 from 2 to 7
move 2 from 7 to 2
move 2 from 7 to 8
move 2 from 8 to 3
move 6 from 1 to 3
move 5 from 5 to 1
move 1 from 5 to 7
move 7 from 7 to 5
move 4 from 5 to 6
move 5 from 1 to 8
move 4 from 2 to 4
move 2 from 7 to 4
move 2 from 7 to 3
move 5 from 4 to 6
move 1 from 8 to 2
move 1 from 2 to 4
move 10 from 3 to 6
move 44 from 6 to 9
move 2 from 5 to 7
move 1 from 5 to 8
move 41 from 9 to 1
move 1 from 6 to 4
move 2 from 8 to 1
move 1 from 7 to 3
move 1 from 3 to 8
move 2 from 9 to 8
move 29 from 1 to 9
move 2 from 1 to 5
move 2 from 8 to 3
move 1 from 3 to 5
move 2 from 5 to 9
move 1 from 5 to 7
move 25 from 9 to 2
move 10 from 2 to 1
move 1 from 7 to 8
move 2 from 4 to 1
move 2 from 8 to 9
move 1 from 8 to 6
move 4 from 2 to 4
move 4 from 2 to 5
move 1 from 6 to 5
move 1 from 2 to 7
move 2 from 4 to 1
move 18 from 1 to 3
move 8 from 9 to 4
move 15 from 3 to 9
move 3 from 4 to 8
move 4 from 5 to 8
move 4 from 2 to 4
move 10 from 9 to 4
move 4 from 8 to 5
move 2 from 7 to 2
move 11 from 4 to 9
move 12 from 4 to 9
move 2 from 5 to 7
move 4 from 2 to 4
move 5 from 8 to 1
move 1 from 5 to 6
move 1 from 4 to 6
move 1 from 3 to 9
move 1 from 5 to 7
move 4 from 1 to 6
move 6 from 1 to 5
move 6 from 5 to 9
move 3 from 7 to 6
move 9 from 6 to 5
move 8 from 5 to 2
move 7 from 2 to 3
move 1 from 3 to 1
move 7 from 3 to 5
move 2 from 4 to 1
move 1 from 2 to 6
move 2 from 1 to 3
move 8 from 5 to 9
move 3 from 1 to 3
move 1 from 6 to 1
move 2 from 4 to 1
move 1 from 5 to 2
move 2 from 1 to 6
move 2 from 6 to 3
move 2 from 3 to 2
move 2 from 2 to 4
move 1 from 2 to 6
move 3 from 3 to 9
move 2 from 4 to 8
move 3 from 3 to 1
move 4 from 1 to 7
move 2 from 8 to 4
move 7 from 9 to 6
move 1 from 1 to 4
move 11 from 9 to 7
move 3 from 9 to 3
move 14 from 9 to 5
move 6 from 6 to 5
move 4 from 5 to 9
move 10 from 7 to 6
move 1 from 3 to 7
move 2 from 4 to 1
move 4 from 7 to 9
move 9 from 6 to 1
move 3 from 6 to 5
move 15 from 9 to 1
move 1 from 4 to 7
move 4 from 9 to 7
move 12 from 5 to 1
move 3 from 7 to 3
move 4 from 7 to 2
move 1 from 9 to 3
move 22 from 1 to 2
move 21 from 2 to 6
move 3 from 1 to 9
move 1 from 3 to 7
move 1 from 7 to 3
move 1 from 3 to 2
move 8 from 1 to 4
move 1 from 9 to 2
move 7 from 4 to 8
move 3 from 3 to 9
move 3 from 3 to 5
move 4 from 2 to 3
move 1 from 1 to 3
move 4 from 8 to 5
move 2 from 8 to 3
move 5 from 3 to 2
move 6 from 5 to 3
move 2 from 5 to 8
move 2 from 1 to 7
move 2 from 7 to 4
move 15 from 6 to 9
move 8 from 3 to 1
move 3 from 5 to 9
move 2 from 4 to 9
move 8 from 1 to 3
move 8 from 9 to 8
move 1 from 1 to 4
move 3 from 5 to 9
move 4 from 8 to 1
move 1 from 3 to 9
move 2 from 4 to 3
move 2 from 8 to 6
move 3 from 8 to 7
move 8 from 2 to 5
move 3 from 5 to 2
move 4 from 3 to 4
move 3 from 6 to 1
move 2 from 5 to 9
move 4 from 4 to 1
move 2 from 5 to 6
move 1 from 5 to 4
move 2 from 2 to 1
move 4 from 3 to 9
move 1 from 7 to 3
move 2 from 7 to 4
move 2 from 4 to 7
move 1 from 6 to 7
move 1 from 2 to 8
move 2 from 3 to 9
move 14 from 1 to 8
move 1 from 6 to 2
move 2 from 7 to 1
move 3 from 8 to 3
move 6 from 8 to 5`;
