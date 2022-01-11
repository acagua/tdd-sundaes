//import { render, screen } from "@testing-library/react";
import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { Options } from "../Options";
import { OrderEntry } from "../OrderEntry";

test("subotal updates when scoops change", async () => {
  render(<Options optionType="scoops" />);

  //subtotalstarts at $0
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  //vainlla scoops = 1
  // subtotal = $2
  const vanillaScoopSpinner = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaScoopSpinner);
  userEvent.type(vanillaScoopSpinner, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  //chocolate scoops = 2
  // subtotal = $6
  const chocolateScoopSpinner = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateScoopSpinner);
  userEvent.type(chocolateScoopSpinner, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("subotal updates when toppings change", async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const mnmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });

  expect(cherriesCheckbox).not.toBeChecked();
  expect(mnmsCheckbox).not.toBeChecked();

  userEvent.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  userEvent.click(mnmsCheckbox);
  expect(mnmsCheckbox).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  expect(cherriesCheckbox).not.toBeChecked();
});

describe("Grand total", () => {
  //   test.only("Grand total starts in 0", async () => {
  //     render(<OrderEntry />);
  //     const total = await waitFor(() => {
  //       screen.getByRole("heading", { name: /^grand total: \$/i });
  //     });
  //     expect(total).toHaveTextContent("0.00");
  //   });
  test("update grand total on scoops change", async () => {
    render(<OrderEntry />);
    const total = screen.getByRole("heading", { name: /^grand total: \$/i });
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    //check that total start in 0, previous test is validated here because here we await
    //for the other components to render
    expect(total).toHaveTextContent("0.00");
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "2");
    expect(total).toHaveTextContent("4.00");
    // userEvent.clear(vanillaScoop);
    // expect(total).toHaveTextContent("0.00");
  });
  test("update grand total on toppings change", async () => {
    render(<OrderEntry />);
    const total = screen.getByRole("heading", { name: /^grand total: \$/i });
    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    expect(total).toHaveTextContent("0.00");
    userEvent.click(cherriesTopping);
    expect(total).toHaveTextContent("1.50");
  });
  test("update grand total when item is removed", async () => {
    render(<OrderEntry />);
    const total = screen.getByRole("heading", { name: /^grand total: \$/i });
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "1");
    expect(total).toHaveTextContent("2.00");
    userEvent.click(cherriesTopping);
    expect(total).toHaveTextContent("3.50");
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "0");
    expect(total).toHaveTextContent("1.50");
    userEvent.click(cherriesTopping);
    expect(total).toHaveTextContent("0.00");
  });
});
