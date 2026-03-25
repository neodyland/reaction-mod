"use client";

import { updateTimeoutDuration } from "@/actions/settings";
import { Action } from "@repo/db/types";
import { useTransition, useState } from "react";

interface TimeoutDurationInputProps {
  sessionId: string;
  serverId: string;
  timeoutDuration: number;
  action: Action;
}

export function TimeoutDurationInput({
  sessionId,
  serverId,
  timeoutDuration,
  action,
}: TimeoutDurationInputProps) {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(timeoutDuration);

  const handleBlur = () => {
    if (value !== timeoutDuration && value > 0) {
      startTransition(async () => {
        await updateTimeoutDuration(sessionId, serverId, value);
      });
    }
  };

  if (action !== Action.TIMEOUT) return null;

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Timeout Duration (seconds)</span>
      </label>
      <input
        type="number"
        className="input input-bordered mx-2"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={handleBlur}
        disabled={isPending}
        min={1}
        max={2419200}
      />
      <label className="label">
        <span className="label-text-alt">
          How long to timeout users (max 28 days)
        </span>
      </label>
    </div>
  );
}