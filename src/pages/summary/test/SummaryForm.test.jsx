import { render, fireEvent, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";

// describe("Validate order summary form behavior", () => {
test("Default behavior: checkbox is unchecked and button disabled", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("summary form behavior when checked", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});
// });
