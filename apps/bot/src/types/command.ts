import type { CommandInteraction, PermissionResolvable } from "discord.js";

/**
 * Validation function that checks if a command can be executed.
 * Returns null if valid, or an error message string if invalid.
 */
export type ValidationFunction = (
  interaction: CommandInteraction,
) => Promise<string | null> | string | null;

/**
 * Slash command configuration
 */
export interface SlashCommandConfig {
  enabled: boolean;
  options: any[];
}

/**
 * Bot command structure with type-safe permissions
 */
export interface BotCommand {
  /** Command name (lowercase, no spaces) */
  name: string;

  /** Command description */
  description: string;

  /** Permissions required by the bot to execute this command */
  botPermissions: PermissionResolvable[];

  /** Permissions required by the user to execute this command */
  userPermissions: PermissionResolvable[];

  /** Custom validation functions to run before command execution */
  validations: ValidationFunction[];

  /** Slash command configuration */
  slashCommand: SlashCommandConfig;

  /** Command execution function */
  interactionRun: (interaction: CommandInteraction) => Promise<void>;
}
