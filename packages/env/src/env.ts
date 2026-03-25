import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  skipValidation: true,
  server: {
    DATABASE_URL: z.string(),
    BOT_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    ADMIN_APP_URL: z.string(),
    SESSION_LENGTH: z.coerce.number().default(600),
    AUTH_REDIRECT_URI: z.string(),
    AUTH_SECRET: z.string()
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BOT_TOKEN: process.env.BOT_TOKEN,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    ADMIN_APP_URL: process.env.ADMIN_APP_URL,
    SESSION_LENGTH: process.env.SESSION_LENGTH,
    AUTH_REDIRECT_URI: process.env.AUTH_REDIRECT_URI,
    AUTH_SECRET: process.env.AUTH_SECRET
  },
});
