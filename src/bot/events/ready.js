import { Events } from "discord.js";
import chalk from "chalk";
import { successLog } from "../../cli/functions/logger.js";

export const name = Events.ClientReady;
export const once = true;
export async function execute(client) {
	console.log(successLog(`Logged in Discord as ${client.user.tag}.`));
}