import { prisma, Behaviour, Action } from "@repo/db";
import {
  EmbedBuilder,
  type MessageReaction,
  type PartialMessageReaction,
  type User,
  type PartialUser,
} from "discord.js";

export async function handleReaction(
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
) {
  if (!reaction.message.guild) return;

  const guildId = reaction.message.guild.id;
  const isCustomEmoji = !!reaction.emoji.id;

  try {
    const server = await prisma.server.findUnique({
      where: { id: guildId },
      include: {
        Emojis: isCustomEmoji
          ? {
              where: { id: reaction.emoji.id! },
            }
          : undefined,
      },
    });

    if (!server || !server.enabled) return;

    let isBanned = false;
    let emojiDisplay = "";

    if (isCustomEmoji) {
      const emoji = server.Emojis?.[0];
      if (!emoji) return;

      isBanned =
        server.behaviour === Behaviour.BLACKLIST
          ? emoji.isInList
          : !emoji.isInList;
      emojiDisplay = `<:${emoji.name}:${emoji.id}>`;
    } else {
      const unicodeEmoji = reaction.emoji.name;
      if (!unicodeEmoji) return;

      const isInList = server.unicodeEmojiList.includes(unicodeEmoji);
      isBanned =
        server.behaviour === Behaviour.BLACKLIST ? isInList : !isInList;
      emojiDisplay = unicodeEmoji;
    }

    if (!isBanned) return;

    const member = await reaction.message.guild.members.fetch(user.id);
    if (!member) return;

    if (server.action === Action.DELETE) {
      await reaction.users.remove(user.id);
    } else if (server.action === Action.TIMEOUT && server.timeoutDuration) {
      await member.timeout(server.timeoutDuration * 1000);
      await reaction.users.remove(user.id);
    }

    if (server.logChannelId) {
      const logChannel = await reaction.message.guild.channels.fetch(
        server.logChannelId,
      );
      if (logChannel?.isTextBased()) {
        const embed = new EmbedBuilder()
          .setTitle("Reaction Moderated")
          .setDescription(
            `User: <@${user.id}>\nEmoji: ${emojiDisplay}\nAction: ${server.action}\nChannel: <#${reaction.message.channel.id}>\nMessage: [Jump to message](${reaction.message.url})`,
          )
          .setColor("#FF0000")
          .setTimestamp();

        await logChannel.send({ embeds: [embed] });
      }
    }
  } catch (error) {
    console.error("Error handling reaction:", error);
  }
}
