//import { screen, render, waitFor } from "@testing-library/react";
import {
  screen,
  render,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { OrderEntry } from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test.only("handles error for scoops and toppings routes", async () => {
  const overwrittenHandlers = [
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    ),
  ];

  server.resetHandlers(overwrittenHandlers);

  render(<OrderEntry />);
  // esto sirve pero en caso de que se deban esperar varias respuestas del server se usa el WaitFor
  //   const alerts = await screen.findAllByRole("alert", {
  //     name: "An unexpected error ocurred. Please try again later.",
  //   });
  // expect(alerts).toHaveLength(2);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test.skip("only selected test", () => {
  //this test shows as skipped in the test results
  //if you want to test only specific testcases you can use test.only and the other test will be ignored
  //to skip only specific testcases you can use test.skip
});
