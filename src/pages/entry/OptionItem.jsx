import React from "react";

export const OptionItem = ({ item, altSuffix, updateItemCount, child }) => {
  const { imagePath, name } = item;

  const handleChange = ({ target }) => {
    updateItemCount(name, target.value);
  };
  return (
    <>
      <li>
        <img
          src={`http://localhost:3030${imagePath}`}
          alt={`${name} ${altSuffix}`}
        />
      </li>
      <label htmlFor={`input-spinner-${altSuffix}-${name.toLowerCase()}`}>
        {name}
      </label>
      <input
        id={`input-spinner-${altSuffix}-${name.toLowerCase()}`}
        role="spinbutton"
        type="number"
        defaultValue={0}
        onChange={handleChange}
      />
      {child}
    </>
  );
};
