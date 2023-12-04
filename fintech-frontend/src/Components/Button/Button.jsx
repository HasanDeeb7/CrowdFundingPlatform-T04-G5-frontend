import React from "react";
import "./Button.css";
function Button({ btnType = "primary", action, onClick, page }) {
  const btnClass =
    btnType === "secondary" ? "donateBtnSecondary" : "donateBtnPrimary";
  return page == "allRequests" ? (
    <button className={`${btnClass} request`} onClick={onClick}>
      {action}
    </button>
  ) : (
    <button className={btnClass} onClick={onClick}>
      {action}
    </button>
  );
}

export default Button;
