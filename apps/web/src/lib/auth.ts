import { setup } from "@mikandev/next-discord-auth";
import { env } from "@repo/env";

await setup({
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
  redirectUri: env.AUTH_REDIRECT_URI,
  scopes: ["identify"],
  jwtSecret: env.AUTH_SECRET,
});
