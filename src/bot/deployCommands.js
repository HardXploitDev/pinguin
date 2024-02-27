import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import configJSON from '../../config.json' assert { type: 'json' };
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

const commands = [];
const commandsPath = path.resolve("src", "bot", "commands");
const commandFiles = fs
  .readdir(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const absoluteFile = path.join(commandsPath, file)
  const command = await import(pathToFileURL(absoluteFile));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(configJSON.token);

rest
  .put(
    Routes.applicationGuildCommands(
      configJSON.clientId,
    ),
    { body: commands }
  )
  .then(() => console.log(chalk.bgGreen('[PINGUIN] Successfully registered application commands.')))
  .catch(console.error);