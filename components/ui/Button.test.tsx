import Button from "./Button";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("Button component", () => {
  it("render with text and respond to click", () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("render with disabled state", () => {
    const fn = vi.fn();
    render(
      <Button onClick={fn} disabled>
        Can't Click Me
      </Button>
    );
    fireEvent.click(screen.getByText("Can't Click Me"));
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
