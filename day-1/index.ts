import * as fs from "fs";
import {exit} from "process";

enum Mode {
    DISTANCE = "DISTANCE",
    SIMILARITY = "SIMILARITY"
}

const [, , ...args] = process.argv;
if (args.length < 2) {
    console.log(`Usage: node day-1/index.js <${Object.values(Mode).join("|")}> <input-file-path>`);
    exit(1);
}

const MODE = args[0] as Mode;
if (!Object.values(Mode).includes(MODE)) {
    console.error("Invalid mode ", MODE);
    exit(1);
}

const INPUT_FILE_PATH = args[1] || "day-1/input";

const SEPARATOR = "   ";

// read file `input`
const input = fs.readFileSync(INPUT_FILE_PATH, "utf8");

// gets the first and second arrays from the input
let {first, second} = input.split("\n")
    .reduce((acc, line) => {
        const [firstStr, secondStr] = line.split(SEPARATOR);

        acc.first.push(parseInt(firstStr, 10));
        acc.second.push(parseInt(secondStr, 10));

        return acc;
    }, {first: [] as number[], second: [] as number[]});

if (first.length !== second.length)
    throw new Error("Arrays are not of the same length");

function distance(first: number[], second: number[]) {
    // sort the arrays in ascending order
    const sortFn = (a: number, b: number) => a - b;
    first = first.sort(sortFn);
    second = second.sort(sortFn);

    // find the difference between the two arrays
    return first.reduce(
        (acc, curr, index) => acc + Math.abs(curr - second[index]),
        0
    );
}

function similarity(first: number[], second: number[]) {
    const countMap = second.reduce((acc, curr) => {
        const count = acc.get(curr);
        if (count)
            acc.set(curr, count + 1);
        else
            acc.set(curr, 1);

        return acc;
    }, new Map<number, number>());

    return first.reduce((acc, curr) => {
        const count = countMap.get(curr);
        if (!count) return acc;

        return acc + curr * count;
    }, 0);
}

switch (MODE) {
    case Mode.DISTANCE:
        console.log(MODE, distance(first, second));
        break;
    case Mode.SIMILARITY:
        console.log(MODE, similarity(first, second));
        break;
}