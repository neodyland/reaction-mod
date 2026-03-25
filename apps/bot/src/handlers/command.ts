import {
  EmbedBuilder,
  PermissionsBitField,
  type CommandInteraction,
} from "discord.js";
import type { BotCommand } from "@/types/command";

function hasPermissions(
  memberPermissions: Readonly<PermissionsBitField> | null,
  requiredPermissions: bigint[]
): boolean {
  if (!memberPermissions) return false;
  return requiredPermissions.every((perm) => memberPermissions.has(perm));
}

function createErrorEmbed(title: string, description: string): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor("#FF0000")
    .setTimestamp();
}

export async function handleCommand(interaction: CommandInteraction) {
  try {
    const commandModule = await import(
      `../commands/${interaction.commandName}.ts`
    );
    const command = commandModule.default as BotCommand;

    if (!command.slashCommand.enabled) {
      const embed = createErrorEmbed(
        "Command Disabled",
        "This command is currently disabled."
      );
      await interaction.reply({ embeds: [embed], flags: "Ephemeral" });
      return;
    }

    if (command.botPermissions.length > 0) {
      const botMember = interaction.guild?.members.me;
      const requiredPerms = new PermissionsBitField(command.botPermissions).bitfield;
      const missingPerms = new PermissionsBitField(requiredPerms);

      if (!hasPermissions(botMember?.permissions ?? null, [requiredPerms])) {
        const embed = createErrorEmbed(
          "Missing Bot Permissions",
          `I need the following permissions to execute this command:\n\`${missingPerms.toArray().join("`, `")}\``
        );
        await interaction.reply({ embeds: [embed], flags: "Ephemeral" });
        return;
      }
    }

    if (command.userPermissions.length > 0) {
      const member = interaction.guild?.members.cache.get(interaction.user.id);
      const requiredPerms = new PermissionsBitField(command.userPermissions).bitfield;
      const missingPerms = new PermissionsBitField(requiredPerms);

      if (!hasPermissions(member?.permissions ?? null, [requiredPerms])) {
        const embed = createErrorEmbed(
          "Missing Permissions",
          `You need the following permissions to use this command:\n\`${missingPerms.toArray().join("`, `")}\``
        );
        await interaction.reply({ embeds: [embed], flags: "Ephemeral" });
        return;
      }
    }

    for (const validation of command.validations) {
      const error = await validation(interaction);
      if (error) {
        const embed = createErrorEmbed("Validation Failed", error);
        await interaction.reply({ embeds: [embed], flags: "Ephemeral" });
        return;
      }
    }

    await command.interactionRun(interaction);
  } catch (error) {
    console.error(`Error while executing command:`, error);
    const errorEmbed = createErrorEmbed(
      "An error occurred while executing this command!",
      `An error occurred while executing this command.\n\nPlease contact support if this persists.`
    );

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ embeds: [errorEmbed], flags: "Ephemeral" });
    } else {
      await interaction.reply({ embeds: [errorEmbed], flags: "Ephemeral" });
    }
  }
}
