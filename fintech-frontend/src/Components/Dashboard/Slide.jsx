import React from "react";
import SubSlide from "./SubSlide";
import "./Slide.css";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import fakeDonors from "../../FakeData/fakeDonors";
import fakeDonations from "../../FakeData/fakeDonations";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Slide() {
  let pending = [];
  // request pending for admin
  fakeCampaigns.map((data) => {
    {
      return data.status === "pending" ? pending.push(data) : null;
    }
  });
  return (
    <div className="container1">
      <h3>compaigns interacted with</h3>
      {/* <div className="child"> */}
      {/* {
        role=="donor"?
        fakeDonations.map((data)=>{
          {return this.name===data.donorName?
          <SubSlide data={data}/>
          :null
          }
        
        }):
        role==="creator"?
        fakeDonors.slice(0,10).map((data)=>(<SubSlide data={data}/>)): */}
      {/* role==="admin"?
        
        {pending.slice(0, 5).map((data) => (
          <SubSlide data={data} />
        ))}
        */}
      {/*  } */}
      {/* </div> */}
      <div className="child">
        {pending.slice(0, 5).map((data) => (
          <SubSlide data={data} />
        ))}
        {/* {role==="admin"? */}
        <Link to="adminrequests">
          <Button action="more" />
        </Link>
        {/* :null} */}
      </div>
    </div>
  );
}

export default Slide;
