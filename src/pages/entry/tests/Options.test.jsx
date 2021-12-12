//import { screen, render } from "@testing-library/react";
import { screen, render } from "../../../test-utils/testing-library-utils";
//import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { Options } from "../Options";

test("displays image for each scopp from the server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopsImages = await screen.findAllByRole("img", { name: /scoop$/i }); //name == alt text en images
  expect(scoopsImages).toHaveLength(2);

  // confirm alt names
  const altText = scoopsImages.map((scoop) => scoop.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  const toppingsImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingsImages).toHaveLength(3);

  const altText = toppingsImages.map((topping) => topping.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
