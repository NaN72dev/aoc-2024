import {exit} from "process";
import * as fs from "fs";

const ARGS_COUNT = 1;
const [, , ...args] = process.argv;
if (args.length < ARGS_COUNT) {
    console.log(`Usage: node day-2/index.js <input-file-path>`);
    exit(1);
}

const INPUT_FILE_PATH = args[0];
if (!INPUT_FILE_PATH) {
    console.log(`Usage: node day-2/index.js <input-file-path>`);
    exit(1);
}

const input = fs.readFileSync(INPUT_FILE_PATH, "utf8");
console.log(input);
