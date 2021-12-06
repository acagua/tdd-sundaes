import { render, fireEvent, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";
describe("Validate order summary form behavior", () => {
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
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test("popover responds to hover", () => {
    render(<SummaryForm />);
    const popoverString = /no icecream will actually be delivered/i;
    const tycString = /terms and conditions/i;
    const nullPopover = screen.queryByText(popoverString);
    expect(nullPopover).not.toBeInTheDocument();

    const tycInfo = screen.getByText(tycString);
    userEvent.hover(tycInfo);
    //its not query by so if not found = throws error but its more legible this way
    const popover = screen.getByText(popoverString);
    expect(popover).toBeInTheDocument(); //not needed, but more readable > best practices

    userEvent.unhover(tycInfo);
    const nullUnhoveredPopover = screen.queryByText(popoverString);
    expect(nullUnhoveredPopover).not.toBeInTheDocument();
  });
});
