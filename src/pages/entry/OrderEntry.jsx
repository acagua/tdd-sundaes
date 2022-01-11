import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Options } from "./Options";

export const OrderEntry = ({ setPhase }) => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button
        onClick={() => {
          setPhase("review");
        }}
      >
        Order Sundae
      </button>
    </div>
  );
};
