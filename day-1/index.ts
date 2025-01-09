import * as fs from "fs";

const [, , ...args] = process.argv;
let INPUT_FILE_PATH;
if (args.length !== 1)
    INPUT_FILE_PATH = "day-1/input";
else
    INPUT_FILE_PATH = args[0];

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

// sort the arrays in ascending order
const sortFn = (a: number, b: number) => a - b;
first = first.sort(sortFn);
second = second.sort(sortFn);

if (first.length !== second.length) {
    throw new Error("Arrays are not of the same length");
}

// find the difference between the two arrays
const difference = first.reduce(
    (acc, curr, index) => acc + Math.abs(curr - second[index]),
    0
);
console.log(difference);