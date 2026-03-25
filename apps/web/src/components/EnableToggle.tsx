"use client";

import { updateServerEnabled } from "@/actions/settings";
import { useTransition } from "react";

interface EnableToggleProps {
  sessionId: string;
  serverId: string;
  enabled: boolean;
}

export function EnableToggle({
  sessionId,
  serverId,
  enabled,
}: EnableToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await updateServerEnabled(sessionId, serverId, !enabled);
    });
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-4">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={enabled}
          onChange={handleToggle}
          disabled={isPending}
        />
        <span className="label-text text-lg">
          {enabled ? "Moderation Active" : "Moderation Disabled"}
        </span>
      </label>
    </div>
  );
}