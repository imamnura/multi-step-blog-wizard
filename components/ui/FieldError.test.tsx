import { render, screen, fireEvent } from "@testing-library/react";
import FieldError from "./FieldError";

describe("FieldError Component", () => {
  it("renders with correct error message", () => {
    render(<FieldError message="This is an error" />);
    expect(screen.getByText("This is an error")).toBeInTheDocument();
  });

  it("does not render when no message is provided", () => {
    render(<FieldError message="" />);
    const errorElement = screen.queryByText(/./); // any text
    expect(errorElement).toBeNull();
  });

  it("applies the correct CSS class for styling", () => {
    render(<FieldError message="Styled error" />);
    const errorElement = screen.getByText("Styled error");
    expect(errorElement).toHaveClass("mt-1 text-xs text-red-600");
  });
});
