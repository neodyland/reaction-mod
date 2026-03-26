import { prisma } from "@repo/db";
import type { Guild } from "discord.js";
import { ChannelType } from "discord.js";

export const syncTextChannels = async (guild: Guild) => {
  await prisma.server.upsert({
    where: { id: guild.id },
    create: { id: guild.id },
    update: {},
  });

  const channels = await guild.channels.fetch();
  const textChannels = channels.filter(
    (channel) => channel?.type === ChannelType.GuildText,
  );

  for (const [_, channel] of textChannels) {
    if (!channel) continue;
    await prisma.textChannel.upsert({
      where: { id: channel.id },
      create: {
        id: channel.id,
        name: channel.name,
        serverId: guild.id,
      },
      update: {
        name: channel.name,
      },
    });
  }
};

export const syncEmojis = async (guild: Guild) => {
  await prisma.server.upsert({
    where: { id: guild.id },
    create: { id: guild.id },
    update: {},
  });

  const emojis = await guild.emojis.fetch();

  for (const [_, emoji] of emojis) {
    if (!emoji) continue;
    await prisma.emoji.upsert({
      where: { id: emoji.id },
      create: {
        id: emoji.id,
        name: emoji.name || "unknown",
        isAnimated: emoji.animated || false,
        serverId: guild.id,
      },
      update: {
        name: emoji.name || "unknown",
        isAnimated: emoji.animated || false,
      },
    });
  }
};
