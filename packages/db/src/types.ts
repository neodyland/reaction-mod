export const Behaviour = {
  BLACKLIST: "BLACKLIST",
  WHITELIST: "WHITELIST",
} as const;

export type Behaviour = typeof Behaviour[keyof typeof Behaviour];

export const Action = {
  DELETE: "DELETE",
  TIMEOUT: "TIMEOUT",
} as const;

export type Action = typeof Action[keyof typeof Action];

export interface Server {
  id: string;
  enabled: boolean;
  behaviour: Behaviour;
  action: Action;
  logChannelId: string | null;
  timeoutDuration: number | null;
  unicodeEmojiList: string[];
  Emojis: Emoji[];
  TextChannels: TextChannel[];
}

export interface TextChannel {
  id: string;
  name: string;
  serverId: string;
}

export interface Emoji {
  id: string;
  name: string;
  isAnimated: boolean;
  isInList: boolean;
  serverId: string;
}

export interface Session {
  id: string;
  userId: string;
  serverId: string;
  createdAt: Date;
}