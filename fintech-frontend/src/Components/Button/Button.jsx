import React from "react";
import './Button.css'
function Button({btnType = 'primary', action}) {
  const btnClass = btnType==='secondary' ?  'donateBtnSecondary' : 'donateBtnPrimary'
  return <button className={btnClass}>{action}</button>;
}

export default Button;
