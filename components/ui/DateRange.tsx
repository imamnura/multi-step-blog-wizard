"use client";
import { ChangeEvent } from "react";

type Props = {
  start?: string;
  end?: string;
  onChange: (r: { start?: string; end?: string }) => void;
  className?: string;
};

export default function DateRange({
  start,
  end,
  onChange,
  className = "",
}: Props) {
  const onStart = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ start: e.target.value || undefined, end });
  const onEnd = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ start, end: e.target.value || undefined });

  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm">From</span>
        <input
          type="date"
          value={start ?? ""}
          onChange={onStart}
          className="rounded-xl border border-neutral-300 px-3 py-2 [data-theme=dark]:border-neutral-700"
        />
      </div>
      <div className="flex item-center gap-2">
        <span className="text-sm">To</span>
        <input
          type="date"
          value={end ?? ""}
          onChange={onEnd}
          className="rounded-xl border border-neutral-300 px-3 py-2 [data-theme=dark]:border-neutral-700"
        />
      </div>
    </div>
  );
}
