import { PermissionFlagsBits, type CommandInteraction } from "discord.js";
import type { BotCommand } from "@/types/command";

export default {
  name: "ping",
  description: "Replies with Pong!",

  // Example: Require bot to have SendMessages permission
  // botPermissions: [PermissionFlagsBits.SendMessages],
  botPermissions: [],

  // Example: Require user to have Administrator permission
  // userPermissions: [PermissionFlagsBits.Administrator],
  userPermissions: [],

  // Example: Custom validation
  // validations: [
  //   (interaction) => {
  //     if (!interaction.guild) {
  //       return "This command can only be used in a server!";
  //     }
  //     return null;
  //   }
  // ],
  validations: [],

  slashCommand: {
    enabled: true,
    options: [],
  },

  interactionRun: async (interaction: CommandInteraction) => {
    const ping = Math.abs(Math.round(interaction.client.ws.ping));
    await interaction.reply("<a:loading:1272805571585642506>");
    const roundtrip = Math.abs(Date.now() - interaction.createdTimestamp);
    interaction.editReply(`API Latency: ${ping}ms\nRoundtrip: ${roundtrip}ms`);
  },
} satisfies BotCommand;
