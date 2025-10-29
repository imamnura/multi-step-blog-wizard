import { render, screen, fireEvent } from "@testing-library/react";
import DateRange from "./DateRange";
import { vi } from "vitest";

describe("DateRange Component", () => {
  it("renders with correct labels", () => {
    render(
      <DateRange
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
  });

  it("calls onChange handler when startDate date changes", () => {
    const handleChange = vi.fn();
    render(<DateRange startDate="" endDate="" onChange={handleChange} />);
    const startDateInput = screen.getByLabelText("Start Date");
    fireEvent.change(startDateInput, { target: { value: "2023-01-01" } });
    expect(handleChange).toHaveBeenCalledWith({
      startDate: "2023-01-01",
      endDate: "",
    });
  });

  it("calls onChange handler when endDate date changes", () => {
    const handleChange = vi.fn();
    render(<DateRange startDate="" endDate="" onChange={handleChange} />);
    <DateRange startDate="" endDate="" onChange={handleChange} />;
    const endDateInput = screen.getByLabelText("End Date");
    fireEvent.change(endDateInput, { target: { value: "2023-12-31" } });
    expect(handleChange).toHaveBeenCalledWith({
      startDate: "",
      endDate: "2023-12-31",
    });
  });

  it("displays the correct startDate and endDate dates", () => {
    render(
      <DateRange
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={() => {}}
      />
    );
    const startDateInput = screen.getByDisplayValue("2023-01-01");
    const endDateInput = screen.getByDisplayValue("2023-12-31");
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
  });

  it("passes undefined when clearing a date", () => {
    const handleChange = vi.fn();
    render(
      <DateRange
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={handleChange}
      />
    );

    const startDateInput = screen.getByLabelText("Start Date");
    fireEvent.change(startDateInput, { target: { value: "" } });

    expect(handleChange).toHaveBeenCalledWith({
      startDate: undefined,
      endDate: "2023-12-31",
    });
  });
});
