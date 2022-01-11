import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  render(<App />);
  //add icecream scoops and toppings
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, "2");
  userEvent.click(cherriesTopping);
  //find and click order button
  const orderSundaeButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSundaeButton);
  //check summary based on order
  //   const summaryScoopsList = screen.getByRole("list", { name: "Scoops" });
  const summaryVanillaScoops = screen.getByText(/2 vanilla/i);
  expect(summaryVanillaScoops).toBeInTheDocument();

  const summaryCherryTopping = screen.getByText("Cherries");
  expect(summaryCherryTopping).toBeInTheDocument();
  //accept terms and conditions and confirm order
  const tycCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(tycCheckbox);
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);
  //confirm order number on confirmation page
  const orderNumber = await screen.findByText(/your order number is \d+/i, {
    exact: false,
  });
  expect(orderNumber).toHaveTextContent("123456789");
  //   //click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderButton);
  //check scoops and toppings have been reset
  const vanillaScoopReset = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const cherriesToppingReset = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(vanillaScoopReset).toHaveValue(0);
  expect(cherriesToppingReset).not.toBeChecked();
  //await something to avoid errors?
});
