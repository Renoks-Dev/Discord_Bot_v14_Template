import { Events } from 'discord.js';
import logger from '../utils/logger.js';

export const name = Events.InteractionCreate;
export async function execute(interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    logger.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error('Command execution error:', {
      command: interaction.commandName,
      user: interaction.user.tag,
      guild: interaction.guild?.name,
      error: error.message,
      stack: error.stack,
    });

    const errorMessage = 'There was an error while executing this command!';

    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: errorMessage,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: errorMessage,
          ephemeral: true,
        });
      }
    } catch (replyError) {
      logger.error('Failed to send error message to user:', replyError);
    }
  }
}
