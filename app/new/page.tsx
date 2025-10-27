"use client";

import Wizard from "@/components/Wizard";

export default function NewPostPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create New Post</h1>
      <p className="text-sm text-neutral-600">
        Fill the step below. You can go back anytime.
      </p>
      <Wizard />
    </div>
  );
}
