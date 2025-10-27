"use client";
import type { WizardData } from "@/components/Wizard";

export default function Step4Review({ data }: { data: WizardData }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h4 className="mb-2 text-sm font-semibold">Title</h4>
          <p>{data.title}</p>
        </div>
        <div className="rounded-xl border p-4">
          <h4 className="mb-2 text-sm font-semibold">Author</h4>
          <p>{data.author}</p>
        </div>
        <div className="rounded-xl border p-4">
          <h4 className="mb-2 text-sm font-semibold">Category</h4>
          <p>{data.category}</p>
        </div>
        <div className="rounded-xl border p-4">
          <h4 className="mb-2 text-sm font-semibold">Summary</h4>
          <p className="text-neutral-700">{data.summary}</p>
        </div>
      </div>
      <div className="rounded-xl border p-4">
        <h4 className="mb-2 text-sm font-semibold">Content</h4>
        <div className="prose max-w-none whitespace-pre-wrap">
          {data.content}
        </div>
      </div>
    </div>
  );
}
