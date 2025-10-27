"use client";
import Input from "@/components/ui/Input";
import FieldError from "@/components/ui/FieldError";
import { z } from "zod";

export const step1Schema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters"),
  author: z
    .string()
    .min(3, "Author must be at least 3 characters")
    .max(100, "Author must be at most 100 characters"),
});
export type Step1 = z.infer<typeof step1Schema>;

type Props = {
  data: Step1;
  onChange: (p: Partial<Step1>) => void;
  errors: Partial<Record<keyof Step1, string>>;
};

export default function Step1Meta({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm">Blog Title *</label>
        <Input
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Why Edge Rendering Matters"
        />
        <FieldError message={errors.title} />
      </div>
      <div>
        <label className="mb-1 block text-sm">Author Name *</label>
        <Input
          value={data.author}
          onChange={(e) => onChange({ author: e.target.value })}
          placeholder="e.g. Jane Doe"
        />
        <FieldError message={errors.author} />
      </div>
    </div>
  );
}
