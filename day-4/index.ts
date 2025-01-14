import {exit} from "process";
import * as fs from "node:fs";

function usage() {
    console.log(`Usage: node day-3/index.js <input-file-path> [conditional]`);
    exit(1);
}

const [, , ...args] = process.argv;
const ARGS_COUNT = 1;
if (args.length < ARGS_COUNT) usage();

const INPUT_FILE_PATH = args[0];
if (!INPUT_FILE_PATH) usage();

const input = fs.readFileSync(INPUT_FILE_PATH, "utf8");

const WORDS = ["X", "M", "A", "S"];
const matrix = input.split("\n").map(line => line.split(""));

function countWords(matrix: string[][], x: number, y: number, words: string[]): number {
    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[x].length) return 0;

    let [xd, xR, yd, yR, xD, xDR, yD, yDR] = [true, true, true, true, true, true, true, true];
    for (let i = 0; i < words.length; i++) {
        // x axis
        if (x + i >= matrix.length || matrix[x + i][y] !== words[i]) xd = false;
        // x axis reverse
        if (x - i < 0 || matrix[x - i][y] !== words[i]) xR = false;
        // y axis
        if (y + i >= matrix[x].length || matrix[x][y + i] !== words[i]) yd = false;
        // y axis reverse
        if (y - i < 0 || matrix[x][y - i] !== words[i]) yR = false;
        // diagonal
        if (x + i >= matrix.length || y + i >= matrix[x].length || matrix[x + i][y + i] !== words[i]) xD = false;
        if (x + i >= matrix.length || y - i < 0 || matrix[x + i][y - i] !== words[i]) yDR = false;
        if (x - i < 0 || y + i >= matrix[x].length || matrix[x - i][y + i] !== words[i]) xDR = false;
        if (x - i < 0 || y - i < 0 || matrix[x - i][y - i] !== words[i]) yD = false;
    }

    // console.debug("countWords", x, y, matrix[x][y], {xd, xR, yd, yR, xD, xDR, yD, yDR});
    return [xd, xR, yd, yR, xD, xDR, yD, yDR].filter(x => x).length;
}

let count = 0;
for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
        const curr = matrix[x][y];
        if (curr !== WORDS[0]) continue;
        count += countWords(matrix, x, y, WORDS);
    }
}

console.log("result", count);