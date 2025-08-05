import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import logger from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('flip')
  .setDescription('Flip a coin!');

export async function execute(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

    const embed = new EmbedBuilder()
      .setColor('Yellow')
      .setTitle('Coin Flip')
      .setDescription(`The coin landed on **${result}**!`)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    logger.error('Error in flip command:', error);
  }
}
