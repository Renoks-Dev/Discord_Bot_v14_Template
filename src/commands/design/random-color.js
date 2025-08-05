import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import logger from '../../utils/logger.js';

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100
  )}%)`;
}

export const data = new SlashCommandBuilder()
  .setName('randomcolor')
  .setDescription('Generate a random color.');

export async function execute(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const hexColor = `#${randomColor.padStart(6, '0')}`;

    const rgbColor = hexToRgb(hexColor);
    const hslColor = hexToHsl(hexColor);

    const embed = new EmbedBuilder()
      .setColor(hexColor)
      .setTitle("Here's your random color!")
      .setFields([
        { name: 'RGB', value: `\`${rgbColor}\`` },
        { name: 'HEX', value: `\`${hexColor}\`` },
        { name: 'HSL', value: `\`${hslColor}\`` },
      ]);

    await interaction.editReply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    logger.error('Error in random-color command:', error);
  }
}
