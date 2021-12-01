import React, { useState } from "react";

export const SummaryForm = () => {
  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}> Terms and Conditions </span>
    </span>
  );

  const [checked, setChecked] = useState(false);
  return (
    <div>
      <input
        id="tyc-checkbox"
        aria-checked={checked}
        onClick={(e) => setChecked(e.target.checked)}
        type="checkbox"
      />
      <label htmlFor="tyc-checkbox">
        I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
      </label>

      <button type="submit" disabled={!checked}>
        Confirm Order
      </button>
    </div>
  );
};
