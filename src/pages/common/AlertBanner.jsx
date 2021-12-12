import React from "react";

export const AlertBanner = ({ message }) => {
  const alertMessage =
    message || "An unexpected error ocurred. Please try again later.";
  return <div role="alert">{alertMessage}</div>;
};
