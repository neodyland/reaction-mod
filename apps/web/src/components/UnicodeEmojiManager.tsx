"use client";

import { addUnicodeEmoji, removeUnicodeEmoji } from "@/actions/settings";
import { Behaviour } from "@repo/db/types";
import { useTransition, useState, useMemo } from "react";
import { Twemoji } from "./Twemoji";
import { emojiData, searchEmojis } from "@/lib/emojis";

interface UnicodeEmojiManagerProps {
  sessionId: string;
  serverId: string;
  unicodeEmojiList: string[];
  behaviour: Behaviour;
}

interface EmojiGridProps {
  emojis: Array<{ emoji: string; name: string }>;
  onEmojiClick: (emoji: string) => void;
  isPending: boolean;
  buttonClass: string;
}

function EmojiGrid({
  emojis,
  onEmojiClick,
  isPending,
  buttonClass,
}: EmojiGridProps) {
  if (!emojis || emojis.length === 0) {
    return (
      <div className="border border-base-300 rounded-lg p-4 text-center text-base-content/60">
        No emojis to display
      </div>
    );
  }

  return (
    <div
      className="border border-base-300 rounded-lg p-2 max-h-96 overflow-y-auto"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))",
        gap: "0.5rem",
      }}
    >
      {emojis.map((emoji) => {
        if (!emoji || !emoji.emoji || !emoji.name) return null;

        return (
          <button
            key={emoji.emoji}
            onClick={() => onEmojiClick(emoji.emoji)}
            disabled={isPending}
            className={`btn btn-sm ${buttonClass} w-full h-12 p-0`}
            title={emoji.name}
            style={{
              contentVisibility: "auto",
              contain: "layout style paint",
            }}
          >
            <Twemoji emoji={emoji.emoji} className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}

export function UnicodeEmojiManager({
  sessionId,
  serverId,
  unicodeEmojiList,
  behaviour,
}: UnicodeEmojiManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const INITIAL_LIMIT = 100;

  const handleToggle = (emoji: string) => {
    startTransition(async () => {
      const isInList = unicodeEmojiList.includes(emoji);
      if (isInList) {
        await removeUnicodeEmoji(sessionId, serverId, emoji);
      } else {
        await addUnicodeEmoji(sessionId, serverId, emoji);
      }
    });
  };

  const filteredEmojis = useMemo(() => {
    if (searchQuery) {
      return searchEmojis(searchQuery);
    }
    // Only show limited emojis initially for performance
    return showAll ? emojiData : emojiData.slice(0, INITIAL_LIMIT);
  }, [searchQuery, showAll]);

  const listedEmojis = useMemo(
    () =>
      filteredEmojis.filter(
        (e) => e && e.emoji && unicodeEmojiList.includes(e.emoji),
      ),
    [filteredEmojis, unicodeEmojiList],
  );

  const unlistedEmojis = useMemo(
    () =>
      filteredEmojis.filter(
        (e) => e && e.emoji && !unicodeEmojiList.includes(e.emoji),
      ),
    [filteredEmojis, unicodeEmojiList],
  );

  const hasMore = !searchQuery && !showAll && emojiData.length > INITIAL_LIMIT;

  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Search Emojis</span>
        </label>
        <input
          type="text"
          placeholder="Search by name or Discord shortcode..."
          className="input input-bordered ml-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isPending}
        />
        <label className="label">
          <span className="label-text-alt">
            Try searching for &quot;heart&quot;, &quot;smile&quot;, or any
            Discord emoji name
          </span>
        </label>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">
          {behaviour === Behaviour.BLACKLIST
            ? "Blocked Unicode Emojis"
            : "Allowed Unicode Emojis"}
          {listedEmojis.length > 0 && (
            <span className="ml-2 text-sm font-normal text-base-content/60">
              ({listedEmojis.length})
            </span>
          )}
        </h3>
        {listedEmojis.length === 0 ? (
          <p className="text-sm text-base-content/60">
            No unicode emojis{" "}
            {behaviour === Behaviour.BLACKLIST ? "blocked" : "allowed"}
          </p>
        ) : (
          <EmojiGrid
            emojis={listedEmojis}
            onEmojiClick={handleToggle}
            isPending={isPending}
            buttonClass="btn-primary"
          />
        )}
      </div>

      <div className="divider" />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">
            {behaviour === Behaviour.BLACKLIST
              ? "Available Unicode Emojis"
              : "Blocked Unicode Emojis"}
            {unlistedEmojis.length > 0 && (
              <span className="ml-2 text-sm font-normal text-base-content/60">
                ({unlistedEmojis.length}
                {hasMore && `/${emojiData.length}`})
              </span>
            )}
          </h3>
          {hasMore && (
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-sm btn-ghost"
              disabled={isPending}
            >
              Show All {emojiData.length}
            </button>
          )}
        </div>
        {unlistedEmojis.length === 0 ? (
          <p className="text-sm text-base-content/60">
            {searchQuery
              ? "No emojis found"
              : `All emojis are ${behaviour === Behaviour.BLACKLIST ? "blocked" : "allowed"}`}
          </p>
        ) : (
          <EmojiGrid
            emojis={unlistedEmojis}
            onEmojiClick={handleToggle}
            isPending={isPending}
            buttonClass="btn-ghost"
          />
        )}
      </div>
    </div>
  );
}
