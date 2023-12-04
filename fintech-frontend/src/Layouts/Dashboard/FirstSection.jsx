import React from "react";
import Card from "../../Components/Dashboard/Card";
import fakeDonations from "../../FakeData/fakeDonations";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import "./FirstSection.css";
import CreateCampaign from "../../Components/Dashboard/CreateCampaign";
import fakeUsers from "../../FakeData/fakeUsers";

function FirstSection() {
  let count = 0;
  let totalDonation = 0;
  let activeCampaign = 0;
  let completedCampaign = 0;
  let counterCreator = 0;
  let counterDonors = 0;
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
  fakeUsers.map((data) => {
    if (data.role === "creator") {
      counterCreator++;
    } else if (data.role === "donor") {
      counterDonors++;
    }
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {/* {role === "donor" ? (
        <div className="firstSection">
          <Card title="Number of donated campaigns" value={count} />
          <Card title="Total funds donated" value={totalDonation} />
        </div>
      ) : role === "admin" ? (
      <div className="firstSection">
        <Card title="Number of ongoing campaigns" value={activeCampaign} />
        <Card title="Number of completed campaigns" value={completedCampaign} />
        <Card title="Number of Creators" value={counterCreator} />
        <Card title="Number of Donors" value={counterDonors} />
      </div> 
         ) :null}*/}
      <div className="firstSection">
        <CreateCampaign action="Create Campaign" />
        <Card title="Number of ongoing campaigns" value={activeCampaign} />
        <Card title="Number of completed campaigns" value={completedCampaign} />
        <Card title="Number of Creators" value={counterCreator} />
        <Card title="Number of Donors" value={counterDonors} />
      </div>
    </div>
  );
}

export default FirstSection;
