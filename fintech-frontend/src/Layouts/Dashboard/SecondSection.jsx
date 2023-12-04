import React from "react";
import DoughnutSection from "../../Components/Dashboard/DoughnutSection";
import ChartsSeaction from "../../Components/Dashboard/ChartsSection";
import Slide from "../../Components/Dashboard/Slide";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import "./SecondSection.css";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 30;
defaults.plugins.title.color = "white";
defaults.plugins.title.align = "center";
function SecondSection() {
  return (
    <div className="secondSection">
      <div className="second1">
        <DoughnutSection />
        <ChartsSeaction />
      </div>
      <div className="second2">
        <Slide />
      </div>
    </div>
  );
}

export default SecondSection;
