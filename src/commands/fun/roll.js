import { SlashCommandBuilder } from 'discord.js';
import logger from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Roll a specified number of dice.')
  .addIntegerOption(option =>
    option
      .setName('sides')
      .setDescription('Number of sides on the dice.')
      .setRequired(true)
  )
  .addIntegerOption(option =>
    option
      .setName('dice')
      .setDescription('Number of dice to roll.')
      .setRequired(true)
  );

export async function execute(interaction) {
  try {
    await interaction.deferReply();

    const { options, user } = interaction;

    const userId = user.id;
    const sides = options.getInteger('sides');
    const dice = options.getInteger('dice');
    const results = [];
    let total = 0;

    for (let i = 0; i < dice; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      results.push(roll);
      total += roll;
    }

    await interaction.editReply({
      content: `<@${userId}> - 🎲 You rolled: ${results.join(
        ', '
      )} (Total: ${total})`,
    });
  } catch (error) {
    logger.error('Error in roll command:', error);
  }
}
