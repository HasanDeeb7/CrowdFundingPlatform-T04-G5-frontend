import React from "react";
import logo from "../../images/Ellipse 9.png";
import { Button, ButtonToolbar } from "rsuite";
import { Link } from "react-router-dom";

export default function SubSlide({ data }) {
  const description = data.description.split(" ").slice(0, 30).join(" ");

  console.log(description);
  return (
    <div className="sub">
      <div className="first">
        <img src={logo} alt="campaigns" />
      </div>
      <div className="second">
        <Link to="/${data.id}">
          <h4>{data.title}</h4>
          <p>{description}</p>
        </Link>
        {/* {role=== "admin"?
        :null} */}
      </div>
    </div>
  );
}
