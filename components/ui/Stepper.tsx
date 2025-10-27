"use client";
export default function Stepper({ step }: { step: number }) {
  const items = ["Metadata", "Summary", "Content", "Review"];
  return (
    <ol className="mb-6 grid grid-cols-4 gap-2 text-sm">
      {items.map((label, index) => {
        const active = index + 1 <= step;
        return (
          <li
            key={label}
            className={`rounded-xl border px-3 py-2 text-center ${
              active ? "bg-black text-white" : "bg-white"
            }`}
          >
            {index + 1}. {label}
          </li>
        );
      })}
    </ol>
  );
}
