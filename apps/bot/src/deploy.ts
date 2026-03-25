import { REST, Routes } from "discord.js";
import { env } from "@repo/env";
import { commands } from "@/commands";

const rest = new REST({ version: "10" }).setToken(env.BOT_TOKEN || "");

export function deployCommands() {
  (async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      const commandDataArray = [];

      for (const command of commands) {
        if (command.slashCommand.enabled) {
          console.log(`Preparing ${command.name} command for registration`);

          const commandData = {
            name: command.name,
            description: command.description,
            options: command.slashCommand.options,
          };

          commandDataArray.push(commandData);
        }
      }

      console.log(`Registering all commands`);

      await rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID || ""), {
        body: commandDataArray,
      });
    } catch (error) {
      console.error(
        "An error occurred while refreshing application commands:",
        error,
      );
    }
  })();
}
