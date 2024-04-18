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

  console.log(`Total score following the strategy guide is: ${totalScore}`);
}

calculateTotalScore("./src/input.txt").catch(console.error);
