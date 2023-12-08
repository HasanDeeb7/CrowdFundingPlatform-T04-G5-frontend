import React from "react";
import "./Button.css";
function Button({ btnType = "primary", action, onClick, isDisabled = false }) {
  const btnClass =
    btnType === "secondary"
      ? "donateBtnSecondary"
      : btnType === "danger"
      ? "danger"
      : "donateBtnPrimary";
  return (
    <button
      className={`${btnClass} ${isDisabled ? "disabledBtn" : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {action}
    </button>
  );
}

export default Button;
