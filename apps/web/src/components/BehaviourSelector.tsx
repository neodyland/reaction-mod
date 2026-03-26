"use client";

import { updateServerBehaviour } from "@/actions/settings";
import { Behaviour } from "@repo/db/types";
import { useTransition } from "react";

interface BehaviourSelectorProps {
  sessionId: string;
  serverId: string;
  behaviour: Behaviour;
}

export function BehaviourSelector({
  sessionId,
  serverId,
  behaviour,
}: BehaviourSelectorProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (newBehaviour: Behaviour) => {
    startTransition(async () => {
      await updateServerBehaviour(sessionId, serverId, newBehaviour);
    });
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">Moderation Mode</span>
      </label>
      <div className="join">
        <button
          className={`btn join-item ${behaviour === Behaviour.BLACKLIST ? "btn-disabled" : "btn-primary"} ml-2`}
          onClick={() => handleChange(Behaviour.BLACKLIST)}
          disabled={isPending}
        >
          Blacklist
        </button>
        <button
          className={`btn join-item ${behaviour === Behaviour.WHITELIST ? "btn-disabled" : "btn-primary"}`}
          onClick={() => handleChange(Behaviour.WHITELIST)}
          disabled={isPending}
        >
          Whitelist
        </button>
      </div>
      <label className="label">
        <span className="label-text-alt">
          {behaviour === Behaviour.BLACKLIST
            ? "Block emojis in the list"
            : "Allow only emojis in the list"}
        </span>
      </label>
    </div>
  );
}
