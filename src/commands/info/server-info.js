import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import logger from '../../utils/logger.js';

export const data = new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Display information about this server.');

export async function execute(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const { guild } = interaction;
    const owner = await guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle(`${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: 'Server ID', value: guild.id.toString(), inline: true },
        {
          name: 'Owner',
          value: `<@${owner.id}>`,
          inline: true,
        },
        { name: 'Members', value: `${guild.memberCount}`, inline: true },
        {
          name: 'Created At',
          value: `${guild.createdAt.toDateString()}`,
          inline: true,
        },
        {
          name: 'Verification Level',
          value: `${guild.verificationLevel}`,
          inline: true,
        },
        {
          name: 'Boost Level',
          value: guild.premiumTier ? `Tier ${guild.premiumTier}` : 'None',
          inline: true,
        },
        {
          name: 'Boosts',
          value: `${guild.premiumSubscriptionCount || 0}`,
          inline: true,
        }
      )
      .setImage(guild.bannerURL({ dynamic: true }) || null)
      .setTimestamp()
      .setFooter({
        text: 'Server Info',
        iconURL: guild.iconURL({ dynamic: true }),
      });

    await interaction.editReply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    logger.error('Error in server-info command:', error);
  }
}
