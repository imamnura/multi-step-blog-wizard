import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  it("initializes and persists", () => {
    const { result } = renderHook(() => useLocalStorage("k", { a: 1 }));
    expect(result.current[0]).toEqual({ a: 1 });
    act(() => result.current[1]({ a: 2 }));
    expect(JSON.parse(window.localStorage.getItem("k") || "{}")).toEqual({
      a: 2,
    });
  });
});
