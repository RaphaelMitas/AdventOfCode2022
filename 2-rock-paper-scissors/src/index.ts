import * as fs from "fs";
import * as readline from "readline";

enum OpponentMove {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

enum YourMove {
  Rock = "X",
  Paper = "Y",
  Scissors = "Z",
}

enum Outcome {
  Win = "win",
  Draw = "draw",
  Lose = "lose",
}

// Dictionary for move scores
const moveScores: Record<YourMove, number> = {
  [YourMove.Rock]: 1,
  [YourMove.Paper]: 2,
  [YourMove.Scissors]: 3,
};

// Dictionary for outcome scores
const outcomeScores: Record<Outcome, number> = {
  [Outcome.Win]: 6,
  [Outcome.Draw]: 3,
  [Outcome.Lose]: 0,
};

// Dictionary to define opponent moves that beat your move
const oppenentBeats: Record<OpponentMove, YourMove> = {
  [OpponentMove.Rock]: YourMove.Scissors,
  [OpponentMove.Paper]: YourMove.Rock,
  [OpponentMove.Scissors]: YourMove.Paper,
};

// Dictionary to define your moves that beat opponent move
const youBeat: Record<YourMove, OpponentMove> = {
  [YourMove.Rock]: OpponentMove.Scissors,
  [YourMove.Paper]: OpponentMove.Rock,
  [YourMove.Scissors]: OpponentMove.Paper,
};

// PART 1
async function calculateTotalScore(filePath: string): Promise<void> {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
  });

  let totalScore = 0;

  for await (const line of rl) {
    const [opponentMoveChar, yourMoveChar] = line.trim().split(" ");
    const opponentMove = opponentMoveChar as OpponentMove;
    const yourMove = yourMoveChar as YourMove;

    const moveScore = moveScores[yourMove];
    let outcomeScore = 0;

    if (youBeat[yourMove] === opponentMove) {
      outcomeScore = outcomeScores[Outcome.Win];
    } else if (oppenentBeats[opponentMove] === yourMove) {
      outcomeScore = outcomeScores[Outcome.Lose];
    } else {
      outcomeScore = outcomeScores[Outcome.Draw];
    }

    totalScore += moveScore + outcomeScore;
  }

  rl.close();

  console.log(`Total score for Part 1: ${totalScore}`);
}

// PART 2
enum ExpectedOutcome {
  Lose = "X",
  Draw = "Y",
  Win = "Z",
}

// Dictionary to convert ExpectedOutcome to Outcome
const convertOutcome = {
  [ExpectedOutcome.Win]: Outcome.Win,
  [ExpectedOutcome.Draw]: Outcome.Draw,
  [ExpectedOutcome.Lose]: Outcome.Lose,
};

const outcomeToMove: Record<OpponentMove, Record<ExpectedOutcome, YourMove>> = {
  [OpponentMove.Rock]: {
    [ExpectedOutcome.Lose]: YourMove.Scissors,
    [ExpectedOutcome.Draw]: YourMove.Rock,
    [ExpectedOutcome.Win]: YourMove.Paper,
  },
  [OpponentMove.Paper]: {
    [ExpectedOutcome.Lose]: YourMove.Rock,
    [ExpectedOutcome.Draw]: YourMove.Paper,
    [ExpectedOutcome.Win]: YourMove.Scissors,
  },
  [OpponentMove.Scissors]: {
    [ExpectedOutcome.Lose]: YourMove.Paper,
    [ExpectedOutcome.Draw]: YourMove.Scissors,
    [ExpectedOutcome.Win]: YourMove.Rock,
  },
};

async function calculateTotalScoreWithOutcome(filePath: string): Promise<void> {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let totalScore = 0;

  for await (const line of rl) {
    const [opponentMoveChar, expectedOutcomeChar] = line.trim().split(" ");
    const opponentMove = opponentMoveChar as OpponentMove;
    const expectedOutcome = expectedOutcomeChar as ExpectedOutcome;

    const yourMove = outcomeToMove[opponentMove][expectedOutcome];
    const moveScore = moveScores[yourMove];

    const outcomeScore = outcomeScores[convertOutcome[expectedOutcome]];

    totalScore += moveScore + outcomeScore;
  }

  rl.close();

  console.log(`Total score for Part 2: ${totalScore}`);
}

calculateTotalScore("./src/input.txt").catch(console.error);
calculateTotalScoreWithOutcome("./src/input.txt").catch(console.error);
