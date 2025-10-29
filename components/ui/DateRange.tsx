"use client";
import { ChangeEvent } from "react";

type Props = {
  startDate?: string;
  endDate?: string;
  onChange: (r: { startDate?: string; endDate?: string }) => void;
  className?: string;
};

export default function DateRange({
  startDate,
  endDate,
  onChange,
  className = "",
}: Props) {
  const onStart = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ startDate: e.target.value || undefined, endDate });
  const onEnd = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ startDate, endDate: e.target.value || undefined });

  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <label className="text-sm" htmlFor="startDate">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate ?? ""}
          onChange={onStart}
          className="rounded-xl border border-neutral-300 px-3 py-2 [data-theme=dark]:border-neutral-700"
        />
      </div>
      <div className="flex item-center gap-2">
        <label className="text-sm" htmlFor="endDate">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate ?? ""}
          onChange={onEnd}
          className="rounded-xl border border-neutral-300 px-3 py-2 [data-theme=dark]:border-neutral-700"
        />
      </div>
    </div>
  );
}
