import { notFound, redirect } from "next/navigation";
import { getSessionData, getServerSettings } from "@/lib/data";
import { EnableToggle } from "@/components/EnableToggle";
import { BehaviourSelector } from "@/components/BehaviourSelector";
import { ActionSelector } from "@/components/ActionSelector";
import { LogChannelSelector } from "@/components/LogChannelSelector";
import { TimeoutDurationInput } from "@/components/TimeoutDurationInput";
import { EmojiList } from "@/components/EmojiList";
import { UnicodeEmojiManager } from "@/components/UnicodeEmojiManager";
import { LoginScreen } from "@/components/LoginScreen";
import { getSession } from "@mikandev/next-discord-auth/server-actions";
import { unauthorized } from "next/navigation";
import { Behaviour } from "@repo/db/types";
import { FaInfoCircle } from "react-icons/fa";
import "@/lib/auth"

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [sessionData, discordSession] = await Promise.all([
    getSessionData(id),
    getSession(),
  ]);
  
  if (!discordSession) {
    return <LoginScreen />;
  }

  if (!sessionData) {
    notFound();
  }

  if (discordSession.user.id !== sessionData.userId) {
    unauthorized();
  }

  const server = await getServerSettings(sessionData.serverId);

  if (!server) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="flex items-center justify-between mb-8">
              <h1 className="card-title text-4xl font-bold from-primary to-secondary">
                Reaction Moderator
              </h1>
            </div>

            <div className="space-y-8">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">General</h2>
                  <EnableToggle
                    sessionId={id}
                    serverId={server.id}
                    enabled={server.enabled}
                  />
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Moderation</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <BehaviourSelector
                      sessionId={id}
                      serverId={server.id}
                      behaviour={server.behaviour}
                    />
                    <ActionSelector
                      sessionId={id}
                      serverId={server.id}
                      action={server.action}
                    />
                  </div>
                  <TimeoutDurationInput
                    sessionId={id}
                    serverId={server.id}
                    timeoutDuration={server.timeoutDuration || 600}
                    action={server.action}
                  />
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Logging</h2>
                  <LogChannelSelector
                    sessionId={id}
                    serverId={server.id}
                    logChannelId={server.logChannelId}
                    channels={server.TextChannels}
                  />
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Custom Emojis</h2>
                  <div className="alert alert-info mb-4">
                    <FaInfoCircle className="shrink-0 w-6 h-6" />
                    <span>
                      Click an emoji to{" "}
                      {server.behaviour === Behaviour.BLACKLIST
                        ? "block/unblock"
                        : "allow/disallow"}{" "}
                      it
                    </span>
                  </div>
                  <EmojiList
                    sessionId={id}
                    serverId={server.id}
                    emojis={server.Emojis}
                    behaviour={server.behaviour}
                  />
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Unicode Emojis</h2>
                  <UnicodeEmojiManager
                    sessionId={id}
                    serverId={server.id}
                    unicodeEmojiList={server.unicodeEmojiList}
                    behaviour={server.behaviour}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}