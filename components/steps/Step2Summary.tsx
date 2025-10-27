"use client";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import FieldError from "@/components/ui/FieldError";
import { z } from "zod";

export const step2Schema = z.object({
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(300, "Summary must be at most 300 characters"),
  category: z.enum(
    [
      "Tech",
      "Lifestyle",
      "Business",
      "Entertainment",
      "Health",
      "Science",
      "Sports",
      "World",
    ],
    { message: "Choose a category" }
  ),
});

export type Step2 = z.infer<typeof step2Schema>;

type Props = {
  data: Step2;
  onChange: (p: Partial<Step2>) => void;
  errors: Partial<Record<keyof Step2, string>>;
};

export default function Step2Summary({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm">Summary</label>
        <Textarea
          rows={4}
          value={data.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          placeholder="A short teaser for your post..."
        />
        <FieldError message={errors.summary} />
      </div>
      <div>
        <label className="mb-1 block text-sm">Blog Category</label>
        <Select
          value={data.category}
          onChange={(e) => onChange({ category: e.target.value as any })}
        >
          <option value="">Select a category</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Business">Business</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Science">Science</option>
          <option value="Sports">Sports</option>
          <option value="World">World</option>
        </Select>
        <FieldError message={errors.category} />
      </div>
    </div>
  );
}
