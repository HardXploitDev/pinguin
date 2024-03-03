import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import configJSON from '../../config.json' assert { type: 'json' };
import { errorLog, successLog } from '../cli/functions/logger.js';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';
const rest = new REST({ version: '10' }).setToken(configJSON.token);

const commands = [];
const commandsPath = path.resolve("src", "bot", "commands");
const commandFiles = await fs.readdir(commandsPath);

for (const file of commandFiles) {
  const absoluteFile = path.join(commandsPath, file)
  const command = await import(pathToFileURL(absoluteFile));
  commands.push(command.data.toJSON());
}

export default function deployCommands() {
  rest
    .put(
      Routes.applicationCommands(
        configJSON.clientId,
      ),
      { body: commands }
    )
    .then(() => console.log(successLog(`Registered ${commands.length} application commands.`)))
    .catch((error) => console.log(`${errorLog()}
    ${error}`
    ));
}