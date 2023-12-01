import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import DoughnutSection from "../../Components/Dashboard/DoughnutSection";
import ChartsSeaction from "../../Components/Dashboard/ChartsSection";
import Slide from "../../Components/Dashboard/Slide";
import SecondSection from "../../Layouts/Dashboard/SecondSection";
import FirstSection from "../../Layouts/Dashboard/FirstSection";
defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 40;
defaults.plugins.title.color = "white";
defaults.plugins.title.align = "center";
function Dashboard() {
  return (
    <div className="dash">
      <FirstSection />
      <SecondSection />
    </div>
  );
}

export default Dashboard;
