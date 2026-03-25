import { prisma } from "@repo/db";
import { cache } from "react";
import { env } from "@repo/env";

export const getSessionData = cache(async (sessionId: string) => {
  const sessionAgeLimit = new Date(Date.now() - env.SESSION_LENGTH * 1000);

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
      createdAt: {
        gte: sessionAgeLimit,
      },
    },
  });

  return session;
});

export const getServerSettings = cache(async (serverId: string) => {
  const server = await prisma.server.findUnique({
    where: { id: serverId },
    include: {
      Emojis: {
        orderBy: { name: "asc" },
      },
      TextChannels: {
        orderBy: { name: "asc" },
      },
    },
  });

  return server;
});

export const getServerEmojis = cache(async (serverId: string) => {
  const emojis = await prisma.emoji.findMany({
    where: { serverId },
    orderBy: { name: "asc" },
  });

  return emojis;
});

export const getServerChannels = cache(async (serverId: string) => {
  const channels = await prisma.textChannel.findMany({
    where: { serverId },
    orderBy: { name: "asc" },
  });

  return channels;
});