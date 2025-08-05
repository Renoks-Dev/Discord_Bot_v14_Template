import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import config from './config/config.js';
import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

async function loadCommands() {
  try {
    const commandsFolderPath = join(__dirname, 'commands');
    const commandFolders = readdirSync(commandsFolderPath);

    for (const folder of commandFolders) {
      const commandsPath = join(commandsFolderPath, folder);
      const commandFiles = readdirSync(commandsPath).filter(file =>
        file.endsWith('.js')
      );

      for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const fileUrl = pathToFileURL(filePath).href;
        const command = await import(fileUrl);

        if ('data' in command && 'execute' in command) {
          client.commands.set(command.data.name, command);
          logger.info(`Loaded command: ${command.data.name}`);
        } else {
          logger.warn(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
    }

    logger.info(`Loaded ${client.commands.size} commands`);
  } catch (error) {
    logger.error('Error loading commands:', error);
    throw error;
  }
}

async function loadEvents() {
  try {
    const eventsPath = join(__dirname, 'events');
    const eventFiles = readdirSync(eventsPath).filter(file =>
      file.endsWith('.js')
    );

    for (const file of eventFiles) {
      const filePath = join(eventsPath, file);
      const fileUrl = pathToFileURL(filePath).href;
      const event = await import(fileUrl);

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }

      logger.info(`Loaded event: ${event.name}`);
    }

    logger.info(`Loaded ${eventFiles.length} events`);
  } catch (error) {
    logger.error('Error loading events:', error);
    throw error;
  }
}

async function startBot() {
  try {
    logger.info('Starting bot...');

    await loadCommands();
    await loadEvents();

    await client.login(config.token);

    logger.info(`Bot logged in as ${client.user.tag}`);
  } catch (error) {
    logger.error('Failed to start bot:', error);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('unhandledRejection', error => {
  logger.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

startBot();
