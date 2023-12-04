import React from "react";
import logo from "../../images/Ellipse 9.png";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function SubSlide({ data, page }) {
  const description = data.description.split(" ").slice(0, 30).join(" ");

  console.log(description);
  return (
    <div className="sub">
      <div className="first">
        <img src={logo} alt="campaigns" />
      </div>
      {page === "dashboard" ? (
        <div className="second">
          <Link to="/${data.id}">
            <h4>{data.title}</h4>
            <p>{description}</p>
          </Link>
          {/* {role=== "admin"? */}
          <Button action="Accept" />
          <Button btnType="secondary" action="deny" />
          {/* :null} */}
        </div>
      ) : (
        <div className="second secondRequest">
          <Link to="/${data.id}">
            <h4>{data.title}</h4>
            <p>{description}</p>
          </Link>
          {/* {role=== "admin"? */}
          <div>
            <Button action="Accept" page="allRequests" />
            <Button btnType="secondary" action="deny" />
          </div>

          {/* :null} */}
        </div>
      )}
    </div>
  );
}
