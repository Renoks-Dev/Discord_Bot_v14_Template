import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("flip")
  .setDescription("Flip a coin!");

export async function execute(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const result = Math.random() < 0.5 ? "Heads" : "Tails";

  const embed = new EmbedBuilder()
    .setColor("Yellow")
    .setTitle("Coin Flip")
    .setDescription(`The coin landed on **${result}**!`)
    .setTimestamp();

  await interaction.editReply({ embeds: [embed], ephemeral: true });
}
