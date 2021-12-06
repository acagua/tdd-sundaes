import React, { useState } from "react";

export const SummaryForm = () => {
  const [checked, setChecked] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}> Terms and Conditions </span>
    </span>
  );

  const popover = showPopover ? (
    <div>No icecream will actually be Delivered</div>
  ) : (
    <></>
  );

  return (
    <div>
      <input
        id="tyc-checkbox"
        aria-checked={checked}
        onClick={(e) => setChecked(e.target.checked)}
        type="checkbox"
      />
      <label htmlFor="tyc-checkbox">
        I agree to{" "}
        <span
          style={{ color: "blue" }}
          onMouseLeave={() => setShowPopover(false)}
          onMouseEnter={() => setShowPopover(true)}
        >
          Terms and Conditions
        </span>
      </label>
      {popover}
      <button type="submit" disabled={!checked}>
        Confirm Order
      </button>
    </div>
  );
};
