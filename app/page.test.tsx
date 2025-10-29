import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { PostsProvider } from "@/context/PostsContext";

describe("HomePage", () => {
  it("renders title", () => {
    render(
      <PostsProvider>
        <HomePage />
      </PostsProvider>
    );
    expect(screen.getByText(/Latest Posts/i)).toBeInTheDocument();
  });
});
