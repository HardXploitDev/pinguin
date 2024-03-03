import chalk from "chalk";

function Timestamp() {
    const date = new Date();

    const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return timestamp;
    console.log(timestamp)
}

export function successLog(args) {
    let successLog = chalk.green(`(${Timestamp()}) [pinguin] ${args}`);

    return successLog;
}

export function errorLog(args) {
    let errorLog = chalk.red(`(${Timestamp()}) [pinguin] ${args}`);

    if (args) {
        return errorLog;
    } else {
        return chalk.red(`(${Timestamp()}) [pinguin] An internal error occurred, please review it before continuing.`);
    };
}