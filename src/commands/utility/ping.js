import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import logger from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription("Check the bot's latency and connection status");

export async function execute(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const ping = interaction.client.ws.ping;
    const uptime = interaction.client.uptime;

    // Calculate uptime in a readable format
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Determine status and color based on ping
    let status, color, statusText;
    if (ping < 50) {
      status = '🟢';
      color = '#00ff00';
      statusText = 'Excellent';
    } else if (ping < 100) {
      status = '🟡';
      color = '#ffff00';
      statusText = 'Good';
    } else if (ping < 150) {
      status = '🟠';
      color = '#ffa500';
      statusText = 'Fair';
    } else {
      status = '🔴';
      color = '#ff0000';
      statusText = 'Poor';
    }

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('🏓 Bot Latency Information')
      .setDescription(`${status} **Connection Status:** ${statusText}`)
      .addFields(
        {
          name: '📡 Bot Latency',
          value: `\`${ping}ms\``,
          inline: true,
        },
        {
          name: '🌐 API Latency',
          value: `\`${ping}ms\``,
          inline: true,
        },
        {
          name: '⏱️ Uptime',
          value: `\`${uptimeString}\``,
          inline: true,
        },
        {
          name: '📊 Server Count',
          value: `\`${interaction.client.guilds.cache.size}\``,
          inline: true,
        },
        {
          name: '👥 User Count',
          value: `\`${interaction.client.users.cache.size}\``,
          inline: true,
        },
        {
          name: '⚡ Memory Usage',
          value: `\`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB\``,
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    await interaction.editReply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    logger.error('Error in ping command:', error);
    await interaction.editReply({
      content: '❌ Failed to get the ping information.',
      ephemeral: true,
    });
  }
}
