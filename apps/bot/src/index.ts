import { deployCommands } from "@/deploy";
import { setPresence } from "@/presence";
import { handleCommand } from "@/handlers/command";
import { handleReaction } from "@/handlers/reaction";
import { syncTextChannels, syncEmojis } from "@/lib/syncData";
import {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  MessageReaction,
} from "discord.js";
import { env } from "@repo/env";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on("clientReady", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  deployCommands();
  setPresence(client);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      return;
    }
  }
  await handleReaction(reaction, user);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    try {
      await handleCommand(interaction);
    } catch (e) {
      console.error(e);
    }
  }
});

client.on("guildCreate", async (guild) => {
  await syncTextChannels(guild);
  await syncEmojis(guild);
});

client.login(env.BOT_TOKEN);
