"use client";

import Link from "next/link";
import { usePosts } from "@/context/PostsContext";
import { formatDate } from "@/lib/date";

export default function HomePage() {
  const { state } = usePosts();
  const posts = state.posts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        <Link
          href="/new"
          className="rounded-lg bg-black px-3 py-2 tex-sm text-white hover:opacity-90"
        >
          Create Posts
        </Link>
      </div>
      {posts.length === 0 ? (
        <div className="rounded-xl border p-6 text-neutral-600">
          No Posts Yet. Create your first post!
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <li
              key={p.id}
              className="rounded-xl border p-4 hover:bg-neutral-50"
            >
              <Link href={`/post/${p.id}`} className="block">
                <h3 className="line-clamp-1 text-lg font-semibold">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                  by {p.author} • {formatDate(p.createdAt)}
                </p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="rounded-full border px-2 py-0.5">
                    {p.category}
                  </span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-neutral-700">
                  {p.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
