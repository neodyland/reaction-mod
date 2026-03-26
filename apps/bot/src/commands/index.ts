import type { BotCommand } from "@/types/command";
import ping from "./ping";
import settings from "./settings";

/**
 * Command registry - all commands must be registered here
 * to be included in the bundle when using `bun build --compile`
 */
export const commands: BotCommand[] = [ping, settings];

/**
 * Command map for quick lookups by command name
 */
export const commandMap = new Map<string, BotCommand>(
  commands.map((cmd) => [cmd.name, cmd]),
);

/**
 * Get a command by name
 */
export function getCommand(name: string): BotCommand | undefined {
  return commandMap.get(name);
}
