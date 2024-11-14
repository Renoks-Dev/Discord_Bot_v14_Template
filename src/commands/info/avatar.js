import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("avatar")
  .setDescription("Get the avatar of your own avatar or another user.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user's avatar to show. (optional)")
  );

export async function execute(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const { user, options } = interaction;
    const pickedUser = options.getUser("user");

    if (pickedUser) {
      await interaction.editReply({
        content: `📷 ${
          pickedUser.username
        }'s avatar: ${pickedUser.displayAvatarURL({
          dynamic: true,
        })}`,
        ephemeral: true,
      });
    } else {
      await interaction.editReply({
        content: `📷 Your avatar: ${user.displayAvatarURL({ dynamic: true })}`,
        ephemeral: true,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
