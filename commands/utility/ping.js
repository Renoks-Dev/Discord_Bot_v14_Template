import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(interaction) {
  await interaction.deferReply({ ephemeral: true });

  await interaction.editReply({
    content: `🌐 The ping of the bot: ${interaction.client.ws.ping}!`,
    ephemeral: true,
  });
}
