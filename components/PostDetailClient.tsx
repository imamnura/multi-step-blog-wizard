"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Post } from "@/types/post";
import Button from "@/components/ui/Button";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("blog-wizard-posts");
      const list = raw ? (JSON.parse(raw) as Post[]) : [];
      setPost(list.find((x) => x.id === id) ?? null);
    } catch {
      setPost(null);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="rounded-xl border p-6">
        <p className="text-sm text-neutral-700">Post not found</p>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => router.push("/")}
        >
          Go Back Home
        </Button>
      </div>
    );
  }

  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>
      <p className="mt-0! text-sm text-neutral-600">by {post.author}</p>
      <p className="text-neutral-700">{post.summary}</p>
      <hr />
      <div className="whitespace-pre-wrap">{post.content}</div>
    </article>
  );
}
