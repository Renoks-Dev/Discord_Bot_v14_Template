import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("userinfo")
  .setDescription("Display information about your account or another user.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user to get info about. (optional)")
  );

export async function execute(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user") || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(`${user.username}'s Info`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "User ID", value: user.id, inline: true },
        { name: "Mention", value: `<@${user.id}>`, inline: true },
        { name: "Username", value: user.tag, inline: true },
        {
          name: "Joined Server On",
          value: member.joinedAt ? member.joinedAt.toDateString() : "Unknown",
          inline: true,
        },
        {
          name: "Account Created On",
          value: user.createdAt ? user.createdAt.toDateString() : "Unknown",
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: "User Info",
        iconURL: user.displayAvatarURL({ dynamic: true }),
      });

    await interaction.editReply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    console.error(error);
  }
}
