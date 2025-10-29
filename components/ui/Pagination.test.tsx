import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { vi } from "vitest";

describe("Pagination Component", () => {
  it("navigates pages correctly", () => {
    const set = vi.fn();
    render(
      <Pagination
        total={20}
        page={2}
        pageSize={4}
        totalPages={5}
        onPageChange={set}
      />
    );
    fireEvent.click(screen.getByTitle(/Next/i));
    expect(set).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByTitle(/Previous/i));
    expect(set).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByTitle(/First/i));
    expect(set).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByTitle(/Last/i));
    expect(set).toHaveBeenCalledWith(5);
  });
});
