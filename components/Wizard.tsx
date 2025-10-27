"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Stepper from "@/components/ui/Stepper";
import Step1Meta, { step1Schema } from "@/components/steps/Step1Meta";
import Step2Summary, { step2Schema } from "@/components/steps/Step2Summary";
import Step3Content, { step3Schema } from "@/components/steps/Step3Content";
import Step4Review from "@/components/steps/Step4Review";
import { z } from "zod";
import { usePosts } from "@/context/PostsContext";
import type { Category } from "@/types/post";
import { useRouter } from "next/navigation";

export type WizardData = {
  title: string;
  author: string;
  summary: string;
  category:
    | "Tech"
    | "Lifestyle"
    | "Business"
    | "Entertainment"
    | "Health"
    | "Science"
    | "Sports"
    | "World"
    | "";
  content: string;
};

const defaultData: WizardData = {
  title: "",
  author: "",
  summary: "",
  category: "",
  content: "",
};

export default function Wizard() {
  const { addPost } = usePosts();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(defaultData);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const patch = (p: Partial<WizardData>) =>
    setData((prev) => ({ ...prev, ...p }));

  const validate = () => {
    try {
      if (step === 1)
        step1Schema.parse({ title: data.title, author: data.author });
      if (step === 2)
        step2Schema.parse({
          summary: data.summary,
          category: data.category || undefined,
        });
      if (step === 3) step3Schema.parse({ content: data.content });
      setErrors({});
      return true;
    } catch (e: any) {
      const fieldErrors: Record<string, string> = {};
      e.issues?.forEach((i: any) => (fieldErrors[i.path[0]] = i.message));
      setErrors(fieldErrors);
      return false;
    }
  };

  const onNext = () => {
    if (!validate()) return;
    setStep((s) => Math.min(4, s + 1));
  };

  const onBack = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = () => {
    const merged = z
      .intersection(step1Schema, z.intersection(step2Schema, step3Schema))
      .safeParse(data);
    if (!merged.success) {
      setStep(1);
      return;
    }
    const { title, author, summary, category, content } =
      merged.data as WizardData;
    const newPost = {
      id: crypto.randomUUID(),
      title,
      author,
      summary,
      category: category as Category,
      content,
      createdAt: new Date().toISOString(),
    };
    addPost(newPost);
    setSuccess("Blog post created successfully!");
    setData(defaultData);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Stepper step={step} />

      {success && (
        <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="rounded-2xl border p-6">
        {step === 1 && (
          <Step1Meta
            data={{ title: data.title, author: data.author }}
            onChange={patch}
            errors={{ title: errors.title, author: errors.author }}
          />
        )}
        {step === 2 && (
          <Step2Summary
            data={{
              summary: data.summary,
              category: (data.category as any) || "",
            }}
            onChange={patch}
            errors={{ summary: errors.summary, category: errors.category }}
          />
        )}
        {step === 3 && (
          <Step3Content
            data={{ content: data.content }}
            onChange={patch}
            errors={{ content: errors.content }}
          />
        )}
        {step === 4 && <Step4Review data={data} />}

        <div className="mt-6 flex items-center justify-between">
          <Button onClick={onBack} disabled={step === 1} variant="ghost">
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={onNext}>Next</Button>
          ) : (
            <Button onClick={onSubmit}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
}
