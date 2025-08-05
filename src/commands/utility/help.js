import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import logger from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Shows all available commands');

export async function execute(interaction) {
  try {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🤖 Bot Commands')
      .setDescription('Here are all the available commands:')
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .addFields(
        {
          name: '⚙️ Utility',
          value:
            "`/ping` - Check the bot's latency and connection status\n`/help` - Shows all available commands",
          inline: false,
        },
        {
          name: '🎮 Fun',
          value:
            '`/flip` - Flip a coin!\n`/roll` - Roll a specified number of dice.',
          inline: false,
        },
        {
          name: 'ℹ️ Information',
          value:
            '`/avatar` - Get the avatar of your own avatar or another user.\n`/userinfo` - Display information about your account or another user.\n`/serverinfo` - Display information about this server.',
          inline: false,
        },
        {
          name: '🎨 Design',
          value: '`/randomcolor` - Generate a random color.',
          inline: false,
        }
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    logger.error('Error in help command:', error);
    await interaction.reply({
      content: '❌ Failed to display help information.',
      ephemeral: true,
    });
  }
}
