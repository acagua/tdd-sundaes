import React from "react";

export const OptionItem = ({ item, altSuffix, updateItemCount }) => {
  const { imagePath, name } = item;

  const handleChange = ({ target }) => {
    updateItemCount(
      name,
      altSuffix === "scoop" ? target.value : +target.checked
    );
  };

  const ChildComponent =
    altSuffix === "scoop" ? (
      <>
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
      </>
    ) : (
      <>
        <input
          id={`input-checkbox-${altSuffix}-${name.toLowerCase()}`}
          type="checkbox"
          defaultChecked={false}
          onChange={handleChange}
        />
        <label htmlFor={`input-checkbox-${altSuffix}-${name.toLowerCase()}`}>
          {name}
        </label>
      </>
    );

  return (
    <>
      <li>
        <img
          src={`http://localhost:3030${imagePath}`}
          alt={`${name} ${altSuffix}`}
        />
      </li>
      {ChildComponent}
    </>
  );
};
