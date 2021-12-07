import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScoopOption } from "./ScoopOption";
import { ToppingsOption } from "./ToppingsOption";

export const Options = ({ optionType }) => {
  //scoops or toppings

  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => setItems(null));
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingsOption;

  return (
    <div>
      <ul>
        {items?.map((item, index) => (
          <ItemComponent key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
