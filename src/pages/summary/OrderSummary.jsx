import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { SummaryForm } from "./SummaryForm";

export const OrderSummary = ({ setPhase }) => {
  const [orderDetails] = useOrderDetails();
  let scoopsSummary = [];
  for (const [key, value] of orderDetails.scoops) {
    scoopsSummary.push(<li key={key}>{`${value} ${key}`}</li>);
  }
  let toppingsSummary = [];
  for (const [key] of orderDetails.toppings) {
    toppingsSummary.push(<li key={key}>{`${key}`}</li>);
  }
  return (
    <div>
      <h2 id="scoops">Scoops</h2>
      <ul aria-labelledby="scoops">{scoopsSummary}</ul>
      <h2 id="toppings">Toppings</h2>
      <ul aria-labelledby="toppings">{toppingsSummary}</ul>
      <SummaryForm setPhase={setPhase} />
    </div>
  );
};
