import React from "react";

export const ScoopOption = ({ item }) => {
  const { imagePath, name } = item;
  return (
    <li>
      <img src={`http://localhost:3030${imagePath}`} alt={`${name} scoop`} />
    </li>
  );
};
