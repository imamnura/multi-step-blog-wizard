"use client";

import Link from "next/link";
import { usePosts } from "@/context/PostsContext";
import { formatDate, isWithinDateRange } from "@/lib/date";
import { useEffect, useMemo, useState } from "react";
import DateRange from "@/components/ui/DateRange";
import Pagination from "@/components/ui/Pagination";
import { paginate } from "@/lib/paginate";
import { Category } from "@/types/post";
import { set } from "zod";

export default function HomePage() {
  const { state } = usePosts();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [start, setStart] = useState<string | undefined>(); //yyyy-mm-dd
  const [end, setEnd] = useState<string | undefined>(); //yyyy-mm-dd
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  //reset page saat filter berubah
  useEffect(() => {
    setPage(1);
  }, [q, cat, start, end, pageSize]);

  const filteredPosts = useMemo(() => {
    const lower = q.trim().toLowerCase();
    return state.posts.filter((p) => {
      const matchQ =
        !lower ||
        p.title.toLowerCase().includes(lower) ||
        p.author.toLowerCase().includes(lower) ||
        p.summary.toLowerCase().includes(lower);
      const matchCat = cat === "All" || p.category === cat;
      const matchDate = isWithinDateRange(p.createdAt, start, end);
      return matchQ && matchCat && matchDate;
    });
  }, [q, cat, start, end, state.posts]);

  const { items, total, totalPages, current } = useMemo(
    () => paginate(filteredPosts, page, pageSize),
    [filteredPosts, page, pageSize]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        <Link
          href="/new"
          className="rounded-lg bg-black px-3 py-2 tex-sm text-white hover:opacity-90 [data-theme=dark]:bg-white [data-theme=dark]:text-black"
        >
          Create Posts
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <input
          placeholder="Cari judul/summary/author..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="md:col-span-5 rounded-xl border border-neutral-300 px-3 py-2 [data-theme=dark]:bg-neutral-900 [data-theme=dark]:border-neutral-700"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as any)}
          className="md:col-span-2 rounded-xl border border-neutral-300 px-3 py-2 [data-theme=dark]:bg-neutral-900 [data-theme=dark]:border-neutral-700"
        >
          <option value="All">All Categories</option>
          <option value="Tech">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Business">Business</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Science">Science</option>
          <option value="Sports">Sports</option>
          <option value="World">World</option>
        </select>
        <DateRange
          className="md:col-span-5"
          startDate={start}
          endDate={end}
          onChange={({ startDate: s, endDate: e }) => {
            setStart(s);
            setEnd(e);
          }}
        />
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border p-6 text-neutral-600">
          No Posts Yet. Create your first post!
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((p) => (
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
          <Pagination
            className=""
            total={total}
            page={current}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            totalPages={totalPages}
            pageSizeOptions={[4, 6, 8, 12]}
          />
        </>
      )}
    </div>
  );
}
