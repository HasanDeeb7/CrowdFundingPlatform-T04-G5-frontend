import React, { useContext } from "react";
import logo from "../../images/Ellipse 9.png";
import { Link, NavLink } from "react-router-dom";
import Button from "../Button/Button";
import UserContext from "../../useContext/userContext";

export default function SubSlide({ data }) {
  const { user } = useContext(UserContext);
  // console.log("Subslide");
  return (
    <div className="sub">
      <div className="first">
        <img src={logo} alt="campaigns" />
      </div>
      <div className="second">
        {user.role === "admin" || user.role === "donor" ? (
          <NavLink to="/singlecampaign" state={data}>
            <h4>{data.title}</h4>
            <p>{data.description}</p>
          </NavLink>
        ) : null}

        {user.role === "admin" ? (
          <>
            <Button action="Accept" />
            <Button btnType="secondary" action="deny" />
          </>
        ) : null}
      </div>
    </div>
  );
}
