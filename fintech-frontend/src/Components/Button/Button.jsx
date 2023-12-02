import React from "react";
import './Button.css'
function Button({btnType = 'primary', action, onClick }) {
  const btnClass = btnType==='secondary' ?  'donateBtnSecondary' : 'donateBtnPrimary'
  return <button className={btnClass} onClick={onClick}>{action}</button>;
}

export default Button;
