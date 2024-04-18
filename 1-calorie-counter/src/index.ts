import * as fs from 'fs';
import * as readline from 'readline';

async function calculateTopThreeCalories(filePath: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
    });

    let caloriesList: number[] = [];
    let currentSum = 0;

    for await (const line of rl) {
        if (line.trim() === "") {
            if (currentSum > 0) {
                caloriesList.push(currentSum);
                currentSum = 0;
            }
        } else {
            const calories = parseInt(line, 10);
            if (!isNaN(calories)) {
                currentSum += calories;
            }
        }
    }

    if (currentSum > 0) {
        caloriesList.push(currentSum);
    }


    caloriesList.sort((a, b) => b - a);
    const topThreeCalories = caloriesList.slice(0, 3);
    const totalCalories = topThreeCalories.reduce((acc, curr) => acc + curr, 0);

    console.log(`The total calories carried by the top three Elves is: ${totalCalories}`);
}

calculateTopThreeCalories('./src/input.txt').catch(console.error);
