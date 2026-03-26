import {
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type CommandInteraction,
} from "discord.js";
import type { BotCommand } from "@/types/command";
import { env } from "@repo/env";
import { prisma } from "@repo/db";
import { syncTextChannels, syncEmojis } from "@/lib/syncData";

export default {
  name: "settings",
  description:
    "Open the settings interface for managing the emoji allowlist behaviour.",
  botPermissions: [PermissionFlagsBits.ManageMessages],
  userPermissions: [PermissionFlagsBits.ManageGuild],
  validations: [
    (interaction) => {
      if (!interaction.guild) {
        return "This command can only be used in a server!";
      }
      return null;
    },
  ],

  slashCommand: {
    enabled: true,
    options: [],
  },

  interactionRun: async (interaction: CommandInteraction) => {
    if (!interaction.guild) return;

    await interaction.deferReply({ flags: "Ephemeral" });

    await syncTextChannels(interaction.guild);
    await syncEmojis(interaction.guild);

    const session = await prisma.session.create({
      data: {
        userId: interaction.user.id,
        serverId: interaction.guild.id,
      },
    });

    const settingsUrl = `${env.ADMIN_APP_URL}/settings/${session.id}`;

    const embed = new EmbedBuilder()
      .setTitle("Server Settings")
      .setDescription(
        "Click the button below to configure your server's emoji moderation settings. This URL will be valid for 10 minutes.",
      )
      .setColor("#5865F2");

    const button = new ButtonBuilder()
      .setLabel("Open Settings")
      .setStyle(ButtonStyle.Link)
      .setURL(settingsUrl);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.editReply({
      embeds: [embed],
      components: [row],
    });
  },
} satisfies BotCommand;
