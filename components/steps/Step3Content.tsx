"use client";
import Textarea from "@/components/ui/Textarea";
import FieldError from "@/components/ui/FieldError";
import { z } from "zod";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useMemo } from "react";
import { ca } from "zod/locales";

export const step3Schema = z.object({
  content: z.string().min(50, "Content must be at least 50 characters"),
});

export type Step3 = z.infer<typeof step3Schema>;

// Opsi marked (opsional): line breaks & smartypants
marked.setOptions({
  breaks: true, // treat single line-breaks as <br>
  // smartypants: true, // “quotes”, dashes—lebih rapi
});

type Props = {
  data: Step3;
  onChange: (p: Partial<Step3>) => void;
  errors: Partial<Record<keyof Step3, string>>;
};

export default function Step3Content({ data, onChange, errors }: Props) {
  // Parse + sanitasi HTML hasil markdown
  const sanitized = useMemo(() => {
    try {
      const raw = marked.parse(data.content || "") as string;
      return DOMPurify.sanitize(raw);
    } catch {
      return "";
    }
  }, [data.content]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm">
          Blog Content (Markdown supported)
        </label>
        <Textarea
          rows={14}
          value={data.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder={`# Judul

Tuliskan konten di sini...

- Bullet list
- **Bold** dan _Italic_

> Blockquote

\`inline code\`

\`\`\`ts
// code block
const hello: string = 'world';
\`\`\``}
        />
        <FieldError message={errors.content} />
      </div>

      {/* Preview */}
      <div className="rounded-xl border p-3 dark:border-neutral-800">
        <h4 className="mb-2 text-sm font-semibold">Preview</h4>
        <div
          className="prose max-w-none whitespace-pre-wrap dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
      </div>
    </div>
  );
}
