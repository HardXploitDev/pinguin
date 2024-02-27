import chalk from "chalk";
import CliTable3 from "cli-table3";
import fs from "node:fs";
import path from "node:path";
import { getCommandsArray } from "../../bot/index.js";

const table = new CliTable3();

export function Table(...args) {

    const table = new Table({
        head: ['Command Name', 'Status'],
      });
    
      client.commands.forEach((command) => {
        const status = command.isEnabled ? 'On' : 'Off';
        table.push([command.data.name, status]);
      });
    
      return table.toString();
}