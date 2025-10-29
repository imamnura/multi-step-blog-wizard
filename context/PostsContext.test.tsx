import { renderHook, act } from "@testing-library/react";
import { PostsProvider, usePosts } from "./PostsContext";
import { ReactNode } from "react";

function wrapper({ children }: { children: ReactNode }) {
  return <PostsProvider>{children}</PostsProvider>;
}

describe("PostsContext", () => {
  it("adds posts and persists", () => {
    const { result } = renderHook(() => usePosts(), { wrapper });
    act(() => {
      result.current.addPost({
        id: "id-1",
        title: "t",
        author: "a",
        summary: "s",
        category: "Tech",
        content: "x".repeat(30),
        createdAt: new Date().toISOString(),
      });
    });
    expect(result.current.state.posts.length).toBeGreaterThan(0);
    expect(localStorage.getItem("blog-wizard-posts")).toBeTruthy();
  });
});
