"use client";

import { toggleEmojiInList } from "@/actions/settings";
import { Behaviour } from "@repo/db/types";
import { useTransition } from "react";

interface EmojiListProps {
  sessionId: string;
  serverId: string;
  emojis: Array<{
    id: string;
    name: string;
    isAnimated: boolean;
    isInList: boolean;
  }>;
  behaviour: Behaviour;
}

export function EmojiList({
  sessionId,
  serverId,
  emojis,
  behaviour,
}: EmojiListProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (emojiId: string) => {
    startTransition(async () => {
      await toggleEmojiInList(sessionId, serverId, emojiId);
    });
  };

  const listedEmojis = emojis.filter((e) => e.isInList);
  const unlistedEmojis = emojis.filter((e) => !e.isInList);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {behaviour === Behaviour.BLACKLIST ? "Blocked Emojis" : "Allowed Emojis"}
        </h3>
        {listedEmojis.length === 0 ? (
          <p className="text-sm text-base-content/60">
            No emojis {behaviour === Behaviour.BLACKLIST ? "blocked" : "allowed"} yet
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {listedEmojis.map((emoji) => (
              <button
                key={emoji.id}
                onClick={() => handleToggle(emoji.id)}
                disabled={isPending}
                className="btn btn-sm btn-primary"
                title={emoji.name}
              >
                <img
                  src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.isAnimated ? "gif" : "png"}?size=32`}
                  alt={emoji.name}
                  className="w-5 h-5"
                />
                {emoji.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="divider" />

      <div>
        <h3 className="text-lg font-semibold mb-3">
          {behaviour === Behaviour.BLACKLIST ? "Available Emojis" : "Blocked Emojis"}
        </h3>
        {unlistedEmojis.length === 0 ? (
          <p className="text-sm text-base-content/60">
            All emojis are{" "}
            {behaviour === Behaviour.BLACKLIST ? "blocked" : "allowed"}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {unlistedEmojis.map((emoji) => (
              <button
                key={emoji.id}
                onClick={() => handleToggle(emoji.id)}
                disabled={isPending}
                className="btn btn-sm btn-ghost"
                title={emoji.name}
              >
                <img
                  src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.isAnimated ? "gif" : "png"}?size=32`}
                  alt={emoji.name}
                  className="w-5 h-5"
                />
                {emoji.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
