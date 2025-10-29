import { paginate } from "./paginate";

describe("paginate", () => {
  it("returns correct slice and meta", () => {
    const arr = Array.from({ length: 10 }, (_, i) => i + 1);
    const { items, total, totalPages, current } = paginate(arr, 2, 4);
    expect(total).toBe(10);
    expect(totalPages).toBe(3);
    expect(current).toBe(2);
    expect(items).toEqual([5, 6, 7, 8]);
  });
});
