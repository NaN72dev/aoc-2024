import {exit} from "process";
import * as fs from "node:fs";

function usage(){
    console.log(`Usage: node day-3/index.js <input-file-path> [conditional]`);
    exit(1);
}

const [, , ...args] = process.argv;
const ARGS_COUNT = 1;
if (args.length < ARGS_COUNT) usage();

const INPUT_FILE_PATH = args[0];
if (!INPUT_FILE_PATH) usage();

const IS_CONDITIONAL = args[1] === "conditional";

const input = fs.readFileSync(INPUT_FILE_PATH, "utf8");

// regex to match mul(X,Y), x, y is a number 1 - 3 digits
const MUL_REGEX = /mul\((\d+),(\d+)\)/g;
// matches do(), don't(), mul(x,y)
const DO_DONT_REGEX = /do\(\)|don't\(\)/g;
const COMBINED_REG = new RegExp(`(${DO_DONT_REGEX.source})|(${MUL_REGEX.source})`, "g");

let matches = input.match(MUL_REGEX);
if (IS_CONDITIONAL)
    matches = input.match(COMBINED_REG);

if (!matches) {
    console.error("No mul found");
    exit(1);
}

function filterDoDont(_matches: RegExpMatchArray): string[] {
    const matches = [..._matches];
    while (true) {
        const dontIndex = matches.findIndex(match => match.startsWith("don't()"));
        const doIndex = matches.findIndex(match => match.startsWith("do()"));

        if (doIndex < dontIndex
            || doIndex !== -1 && dontIndex === -1
        ) {
            matches.splice(doIndex, 1);
            continue;
        }
        if (dontIndex === -1) break;

        matches.splice(dontIndex, doIndex - dontIndex + 1);
    }

    return matches;
}

let filteredMatches = matches.map(match => match);
if (IS_CONDITIONAL) filteredMatches = filterDoDont(matches);

const res = filteredMatches.reduce((acc, match) => {
    const [ x, y] = match
        .replace("mul(", "")
        .replace(")", "")
        .split(",")
        .map(x => parseInt(x, 10));

    return acc + x * y;
}, 0);
console.log("result", res);