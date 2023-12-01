import React from "react";
import DoughnutSection from "../../Components/Dashboard/DoughnutSection";
import ChartsSeaction from "../../Components/Dashboard/ChartsSection";
import Slide from "../../Components/Dashboard/Slide";
import "./SecondSection.css";
function SecondSection() {
  return (
    <div className="secondSection">
      <div style={{ width: "50%" }}>
        <DoughnutSection />
        <ChartsSeaction />
      </div>
      <div style={{ width: "50%", margin: "30px" }}>
        <Slide />
      </div>
    </div>
  );
}

export default SecondSection;
