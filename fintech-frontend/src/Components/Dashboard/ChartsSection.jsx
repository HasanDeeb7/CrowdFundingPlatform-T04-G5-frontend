import { Line } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import React from "react";
import fakeCampaigns from "../../FakeData/fakeCampaigns";

function ChartsSeaction() {
  return (
    <div className="chart">
      <Line
        data={{
          labels: fakeCampaigns.map((data) => data.title),
          datasets: [
            {
              label: "campaign",
              data: fakeCampaigns.map((data) => data.amountContributed),
              backgroundColor: ["#c27613"],
              borderColor: "#c27613",
            },
            // {
            //   label: "Donor",
            //   data: [25, 10, 15],
            //   backgroundColor: ["rgba(43, 63, 229, 0.8)"],
            //   borderColor: "rgb(255, 99, 132)",
            // },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.5,
            },
          },
          plugins: {
            title: {
              text: "All Campaign",
            },
          },
        }}
      />
    </div>
  );
}

export default ChartsSeaction;
