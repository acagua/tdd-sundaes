import { screen, render } from "@testing-library/react";
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
