import { Events, ActivityType } from 'discord.js';
import logger from '../utils/logger.js';

export const name = Events.ClientReady;

export const once = true;

export function execute(client) {
  logger.info(`Ready! Logged in as ${client.user.tag}`);

  // Set bot activity
  client.user.setActivity({
    name: `${client.commands.size} commands | /help`,
    type: ActivityType.Watching,
  });

  // Log bot statistics
  logger.info(`Bot is in ${client.guilds.cache.size} guilds`);
  logger.info(`Serving ${client.users.cache.size} users`);

  // Set up activity rotation (optional)
  setInterval(() => {
    const activities = [
      { name: `${client.commands.size} commands`, type: ActivityType.Watching },
      {
        name: `${client.guilds.cache.size} servers`,
        type: ActivityType.Watching,
      },
      { name: '/help for commands', type: ActivityType.Playing },
    ];

    const activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity);
  }, 10000); // Change every 30 seconds 30000
}
