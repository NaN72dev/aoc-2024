import {exit} from "process";
import * as fs from "node:fs";

function usage(){
    console.log(`Usage: node day-3/index.js <input-file-path>`);
    exit(1);
}

const [, , ...args] = process.argv;
const ARGS_COUNT = 1;
if (args.length < ARGS_COUNT) usage();

const INPUT_FILE_PATH = args[0];
if (!INPUT_FILE_PATH) usage();

const input = fs.readFileSync(INPUT_FILE_PATH, "utf8");

// regex to match mul(X,Y), x, y is a number 1 - 3 digits
const MUL_REGEX = /mul\((\d+),(\d+)\)/g;
const matches = input.match(MUL_REGEX);
if (!matches) {
    console.error("No mul found");
    exit(1);
}

const res = matches.reduce((acc, match) => {
    // match x, y in `mul(x,y)`
    const [ x, y] = match
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(x => parseInt(x, 10));

    return acc + x * y;
}, 0);
console.log("result", res);