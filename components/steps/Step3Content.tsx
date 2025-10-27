"use client";
import Textarea from "@/components/ui/Textarea";
import FieldError from "@/components/ui/FieldError";
import { z } from "zod";

export const step3Schema = z.object({
  content: z.string().min(50, "Content must be at least 50 characters"),
});

export type Step3 = z.infer<typeof step3Schema>;

type Props = {
  data: Step3;
  onChange: (p: Partial<Step3>) => void;
  errors: Partial<Record<keyof Step3, string>>;
};

export default function Step3Content({ data, onChange, errors }: Props) {
  return (
    <div>
      <label className="mb-1 block text-sm">Blog Content</label>
      <Textarea
        rows={12}
        value={data.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Write your blog post here..."
      />
      <FieldError message={errors.content} />
    </div>
  );
}
