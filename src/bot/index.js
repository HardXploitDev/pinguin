import { Client, Collection } from 'discord.js';
import fs from 'fs/promises'; // Use fs.promises for async file operations
import path from 'path';
import { pathToFileURL } from 'url';
import configJSON from '../../config.json' assert { type: 'json' };

const client = new Client({ intents: 65027 });

client.commands = new Collection();

const commandsPath = path.resolve("src", "bot", "commands");
const commandFiles = await fs.readdir(commandsPath);

for (const file of commandFiles) {
  const absoluteFile = path.join(commandsPath, file);
  const command = await import(pathToFileURL(absoluteFile));
  client.commands.set(command.data.name, command);
}

export function getCommandsArray() {
  return client.commands.map((command) => command.data.name);
}

const eventsPath = path.resolve("src", "bot", "events");
const eventFiles = await fs.readdir(eventsPath);

for (const file of eventFiles) {
  const absoluteFile = path.join(eventsPath, file);
  const event = await import(pathToFileURL(absoluteFile));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(configJSON.login);
