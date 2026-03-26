"use server";

import { prisma, Behaviour, Action } from "@repo/db";
import { revalidatePath } from "next/cache";
import { getSessionData } from "@/lib/data";

export async function updateServerEnabled(
  sessionId: string,
  serverId: string,
  enabled: boolean,
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  await prisma.server.update({
    where: { id: serverId },
    data: { enabled },
  });

  revalidatePath(`/settings/${sessionId}`);
}

export async function updateServerBehaviour(
  sessionId: string,
  serverId: string,
  behaviour: Behaviour,
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  await prisma.server.update({
    where: { id: serverId },
    data: { behaviour },
  });

  revalidatePath(`/settings/${sessionId}`);
}

export async function updateServerAction(
  sessionId: string,
  serverId: string,
  action: Action,
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  await prisma.server.update({
    where: { id: serverId },
    data: { action },
  });

  revalidatePath(`/settings/${sessionId}`);
}

export async function updateLogChannel(
  sessionId: string,
  serverId: string,
  logChannelId: string | null,
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  await prisma.server.update({
    where: { id: serverId },
    data: { logChannelId },
  });

  revalidatePath(`/settings/${sessionId}`);
}

export async function updateTimeoutDuration(
  sessionId: string,
  serverId: string,
  timeoutDuration: number,
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  await prisma.server.update({
    where: { id: serverId },
    data: { timeoutDuration },
  });

  revalidatePath(`/settings/${sessionId}`);
}

export async function toggleEmojiInList(
  sessionId: string,
  serverId: string,
  emojiId: string,
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  const emoji = await prisma.emoji.findUnique({
    where: { id: emojiId },
  });

  if (!emoji || emoji.serverId !== serverId) {
    throw new Error("Emoji not found");
  }

  await prisma.emoji.update({
    where: { id: emojiId },
    data: { isInList: !emoji.isInList },
  });

  revalidatePath(`/settings/${sessionId}`);
}

export async function updateUnicodeEmojiList(
  sessionId: string,
  serverId: string,
  unicodeEmojiList: string[],
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  await prisma.server.update({
    where: { id: serverId },
    data: { unicodeEmojiList },
  });

  revalidatePath(`/settings/${sessionId}`);
}

export async function addUnicodeEmoji(
  sessionId: string,
  serverId: string,
  emoji: string,
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  await prisma.server.update({
    where: { id: serverId },
    data: {
      unicodeEmojiList: {
        push: emoji,
      },
    },
  });

  revalidatePath(`/settings/${sessionId}`);
}

export async function removeUnicodeEmoji(
  sessionId: string,
  serverId: string,
  emoji: string,
) {
  const session = await getSessionData(sessionId);
  if (!session || session.serverId !== serverId) {
    throw new Error("Unauthorized");
  }

  const server = await prisma.server.findUnique({
    where: { id: serverId },
    select: { unicodeEmojiList: true },
  });

  if (!server) {
    throw new Error("Server not found");
  }

  await prisma.server.update({
    where: { id: serverId },
    data: {
      unicodeEmojiList: server.unicodeEmojiList.filter((e) => e !== emoji),
    },
  });

  revalidatePath(`/settings/${sessionId}`);
}
