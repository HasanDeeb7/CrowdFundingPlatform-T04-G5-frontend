import React from "react";
import SubSlide from "./SubSlide";
import "./Slide.css";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
function Slide() {
  return (
    <div className="container">
      <h3>compaigns interacted with</h3>
      <div className="child">
        {fakeCampaigns.map((data) => (
          <SubSlide data={data} />
        ))}
      </div>
    </div>
  );
}

export default Slide;
