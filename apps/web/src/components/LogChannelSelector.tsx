"use client";

import { updateLogChannel } from "@/actions/settings";
import { useTransition } from "react";

interface LogChannelSelectorProps {
  sessionId: string;
  serverId: string;
  logChannelId: string | null;
  channels: Array<{ id: string; name: string }>;
}

export function LogChannelSelector({
  sessionId,
  serverId,
  logChannelId,
  channels,
}: LogChannelSelectorProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (channelId: string) => {
    startTransition(async () => {
      await updateLogChannel(
        sessionId,
        serverId,
        channelId === "" ? null : channelId,
      );
    });
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Log Channel</span>
      </label>
      <select
        className="select select-bordered mx-2"
        value={logChannelId || ""}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isPending}
      >
        <option value="">No logging</option>
        {channels.map((channel) => (
          <option key={channel.id} value={channel.id}>
            #{channel.name}
          </option>
        ))}
      </select>
      <label className="label">
        <span className="label-text-alt">Where to send moderation logs</span>
      </label>
    </div>
  );
}
