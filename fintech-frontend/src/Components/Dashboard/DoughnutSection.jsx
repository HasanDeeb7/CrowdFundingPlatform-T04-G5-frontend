import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import React from "react";

function DoughnutSection() {
  return (
    <div className="doughnut">
      <Doughnut
        data={{
          labels: ["Donation"],
          datasets: [
            {
              data: [50, 30],
              backgroundColor: ["#c27613", "#1c1f21"],
              borderColor: ["#0a0b0c"],
              hoverOffset: 1,
              borderWidth: 2,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              text: "All Donation",
              padding: { top: 10, bottom: 30 },
            },
          },
        }}
      />
    </div>
  );
}

export default DoughnutSection;
