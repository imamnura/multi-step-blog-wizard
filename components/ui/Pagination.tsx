"use client";

import Button from "./Button";

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export type PaginationProps = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onPageSizeChange?: (s: number) => void;
  pageSizeOptions?: number[];
  className?: string;
};

export default function Pagination({
  total,
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [4, 6, 8, 12],
  className = "",
}: PaginationProps) {
  const siblings = 1;
  const start = Math.max(1, page - siblings);
  const end = Math.min(totalPages, page + siblings);
  const pages = range(start, end);

  return (
    <div
      className={`mt-6 flex flex-col items-center gap-4 justify-between sm:flex-row ${className}`}
    >
      <div className="text-sm text-neutral-600 [data-theme:dark]:text-neutral-400">
        Total {total}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          disabled={page <= 1}
          onClick={() => onPageChange(1)}
          title="First"
        >
          «
        </Button>
        <Button
          variant="ghost"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          title="Previous"
        >
          ‹
        </Button>
        {start > 1 && <span className="px-2">...</span>}
        {pages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "primary" : "ghost"}
            onClick={() => onPageChange(p)}
            className="min-w-9"
          >
            {p}
          </Button>
        ))}
        {end < totalPages && <span className="px-2">...</span>}
        <Button
          variant="ghost"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          title="Next"
        >
          ›
        </Button>
        <Button
          variant="ghost"
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          title="Last"
        >
          »
        </Button>
      </div>

      {onPageSizeChange && (
        <div className="flex items-center gap-2 text-sm">
          <span>Per page</span>
          <select
            className="rounded-xl border border-neutral-300 px-2 py-1 [data-theme:dark]:bg-neutral-900 [data-theme:dark]:border-neutral-700"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
