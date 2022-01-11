import React, { useEffect, useState } from "react";
import axios from "axios";

export const OrderConfirmation = ({ setPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {
        setOrderNumber(`something went wrong: ${err}`);
      });
  }, []);

  return (
    <div>
      <p>your order number is {orderNumber}</p>
      <button onClick={() => setPhase("inProgress")}>New order</button>
    </div>
  );
};
