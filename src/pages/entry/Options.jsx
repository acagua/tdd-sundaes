import React, { useEffect, useState } from "react";
import axios from "axios";
import { OptionItem } from "./OptionItem";
import { ScoopOption } from "./ScoopOption";
import { ToppingsOption } from "./ToppingsOption";
import { AlertBanner } from "../common/AlertBanner";
import { PRICE_PER_ITEM } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export const Options = ({ optionType }) => {
  //scoops or toppings
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        setItems(null);
        setError(true);
      });
  }, [optionType]);

  // const ElementOption = optionType === "scoops" ? OptionItem: ToppingsOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const altSuffix = optionType === "scoops" ? "scoop" : "topping";

  if (error) return <AlertBanner />;

  return (
    <div>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <ul>
        {items?.map((item, index) => (
          <OptionItem
            key={index}
            item={item}
            altSuffix={altSuffix}
            updateItemCount={(itemName, newItemCount) =>
              updateItemCount(itemName, newItemCount, optionType)
            }
          />
        ))}
      </ul>
    </div>
  );
};
