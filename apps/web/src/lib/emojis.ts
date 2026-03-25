import discordEmojisData from "./discord-emojis.json";

export interface EmojiData {
  emoji: string;
  name: string;
  keywords: string[];
}

// Parse Discord's emoji data (excluding diversity variants for simplicity)
export const emojiData: EmojiData[] = discordEmojisData.emojis
  .filter((e) => !("diversityParent" in e)) // Exclude skin tone variants
  .map((emoji) => ({
    emoji: emoji.surrogates,
    name: emoji.names[0].replace(/_/g, " "), // Use first name, replace underscores
    keywords: emoji.names, // Use all Discord names as keywords
  }));

export function searchEmojis(query: string): EmojiData[] {
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {
    return emojiData;
  }

  return emojiData.filter((emoji) => {
    return (
      emoji.name.toLowerCase().includes(lowerQuery) ||
      emoji.keywords.some((keyword) =>
        keyword.toLowerCase().replace(/_/g, " ").includes(lowerQuery)
      ) ||
      emoji.emoji === lowerQuery
    );
  });
}
