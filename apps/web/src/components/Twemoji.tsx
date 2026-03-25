"use client";

import { useMemo } from "react";
import twemoji from "@discordapp/twemoji";

interface TwemojiProps {
  emoji: string;
  className?: string;
}

export function Twemoji({ emoji, className = "" }: TwemojiProps) {
  // Pre-parse emoji to HTML string for better performance
  const html = useMemo(() => {
    return twemoji.parse(emoji, {
      folder: "svg",
      ext: ".svg",
    });
  }, [emoji]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
