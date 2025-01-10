import {exit} from "process";
import * as fs from "fs";

const ARGS_COUNT = 1;
const SEPARATOR = " ";
const MIN_LEVEL_DIFF = 1;
const MAX_LEVEL_DIFF = 3;

const [, , ...args] = process.argv;
if (args.length < ARGS_COUNT) {
    console.log(`Usage: node day-2/index.js <input-file-path> [tolerate]`);
    exit(1);
}

const INPUT_FILE_PATH = args[0];
if (!INPUT_FILE_PATH) {
    console.log(`Usage: node day-2/index.js <input-file-path> [tolerate]`);
    exit(1);
}
const IS_TOLERATE = args[1] === "tolerate";

console.info(`${IS_TOLERATE ? "" : "not "}tolerated`);

function isSafe(levels: number[]): boolean {
    const diffs = levels.reduce((acc, curr, index) => {
        if (index <= 0) return acc;
        if (acc.hasZero) return acc;

        const prev = levels[index - 1];
        const diff = prev - curr;
        // console.debug("diff", {index, prev, curr, diff});

        if (diff === 0) {
            acc.hasZero = true;
            return acc;
        }

        acc.maxDiff = Math.max(acc.maxDiff, diff);
        acc.minDiff = Math.min(acc.minDiff, diff);

        return acc;
    }, {maxDiff: -Number.MAX_VALUE, minDiff: Number.MAX_VALUE, hasZero: false});
    // console.debug("report", {report, diffs});

    // there are no increasing or decreasing diffs
    if (diffs.hasZero) return false;

    // there are increasing diffs and decreasing diffs
    if (diffs.maxDiff * diffs.minDiff <= 0) return false;

    // out of bounds diff
    if (Math.max(Math.abs(diffs.maxDiff), Math.abs(diffs.minDiff)) > MAX_LEVEL_DIFF) return false;

    // console.debug("report", levels, "is safe!");
    return Math.min(Math.abs(diffs.maxDiff), Math.abs(diffs.minDiff)) >= MIN_LEVEL_DIFF;
}

const res = fs.readFileSync(INPUT_FILE_PATH, "utf8")
    .split("\n")
    .reduce((acc, report) => {
        const levels = report.split(SEPARATOR)
            .map(Number);

        if (isSafe(levels)) return acc + 1;
        if (!IS_TOLERATE) return acc;

        for (let index = 0; index < levels.length; index++) {
            const spliced = [...levels].slice(0, index)
                .concat([...levels].slice(index + 1));

            if (!isSafe(spliced)) continue;
            return acc + 1;
        }

        // console.info("report", report, "is safe!");
        return acc;
    }, 0);

console.log("result", res);