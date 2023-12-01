import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import React from "react";

function DoughnutSection() {
  return (
    <div
      style={{
        width: "90%",
        height: "300px",
        backgroundColor: "var(--secondary-bg-clr)",
        margin: "30px",
        padding: "15px",
        borderRadius: "var(--card-border-radius)",
      }}
    >
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
