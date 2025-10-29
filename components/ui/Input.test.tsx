import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";
import { vi } from "vitest";

describe("Input Component", () => {
  it("renders with correct placeholder", () => {
    render(<Input placeholder="Enter text" value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("calls onChange handler when input changes", () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Enter text" value="" onChange={handleChange} />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "New value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("displays the correct value", () => {
    render(
      <Input placeholder="Enter text" value="Test value" onChange={() => {}} />
    );
    const inputElement = screen.getByDisplayValue("Test value");
    expect(inputElement).toBeInTheDocument();
  });
});
