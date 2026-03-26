"use client";

import { updateServerAction } from "@/actions/settings";
import { Action } from "@repo/db/types";
import { useTransition } from "react";

interface ActionSelectorProps {
  sessionId: string;
  serverId: string;
  action: Action;
}

export function ActionSelector({
  sessionId,
  serverId,
  action,
}: ActionSelectorProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (newAction: Action) => {
    startTransition(async () => {
      await updateServerAction(sessionId, serverId, newAction);
    });
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Action on Violation</span>
      </label>
      <div className="join">
        <button
          className={`btn join-item ${action === Action.DELETE ? "btn-disabled" : "btn-primary"} ml-2`}
          onClick={() => handleChange(Action.DELETE)}
          disabled={isPending}
        >
          Remove Reaction
        </button>
        <button
          className={`btn join-item ${action === Action.TIMEOUT ? "btn-disabled" : "btn-primary"}`}
          onClick={() => handleChange(Action.TIMEOUT)}
          disabled={isPending}
        >
          Timeout User
        </button>
      </div>
    </div>
  );
}
