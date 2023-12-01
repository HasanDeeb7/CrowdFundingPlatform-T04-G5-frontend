import React from "react";
import Card from "../../Components/Dashboard/Card";
import fakeDonations from "../../FakeData/fakeDonations";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import "./FirstSection.css";

function FirstSection() {
  let count = 0;
  let totalDonation = 0;
  let activeCampaign = 0;
  let completedCampaign = 0;
  //   fakeDonations.map((data) => {
  //     if (data.donorName == this.donorName) {
  //       count++;
  //     }
  //   });

  //   fakeDonations.map((data) => {
  //     if (data.donorName == this.donorName) {
  //       totalDonation += data.transferredAmount;
  //     }
  //   });

  fakeCampaigns.map((data) => {
    if (data.status == "active") {
      activeCampaign++;
    }
  });
  fakeCampaigns.map((data) => {
    if (data.status == "completed") {
      completedCampaign++;
    }
  });

  return (
    <div>
      {/* {role === "admin" ? (
        <div className="firstSection">
          <Card title="Number of donated campaigns" value={count} />
          <Card title="Total funds donated" value={totalDonation} />
        </div>
      ) : role === "Donor" ? ( */}
      <div className="firstSection">
        <Card title="Number of ongoing campaigns" value={activeCampaign} />
        <Card title="Number of completed campaigns" value={completedCampaign} />
      </div>
      {/*   ) : null} */}
    </div>
  );
}

export default FirstSection;
