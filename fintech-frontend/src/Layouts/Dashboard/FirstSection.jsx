import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Card from "../../Components/Dashboard/Card";
import fakeDonations from "../../FakeData/fakeDonations";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import "./FirstSection.css";
import CreateCampaign from "../../Components/Dashboard/CreateCampaign";
import fakeUsers from "../../FakeData/fakeUsers";
import UserContext from "../../useContext/userContext";
import Button from "../../Components/Button/Button";
import fetchDonations from "../../utils/donations";
import fetchCampaigns from "../../utils/campaignAxios";
import fetchUsers from "../../utils/userAxios";

function FirstSection() {
  const { user } = useContext(UserContext);
  let [campaignApi, setCampaignApi] = useState();
  let [donationApi, setDonationApi] = useState();
  let [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchNumbersSections() {
    setIsLoading(true);
    console.log("function");
    try {
      let donations = await fetchDonations();
      setDonationApi(donations);
      let campaign = await fetchCampaigns();
      setCampaignApi(campaign);
      let users = await fetchUsers();
      setUsers(users);
      if (donations && campaign && users) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchNumbersSections();
  }, []);

  let count = 0;
  let totalDonation = 0;
  let activeCampaign = 0;
  let completedCampaign = 0;
  let counterCreator = 0;
  let counterDonors = 0;

  console.log(donationApi);
  if (donationApi && campaignApi && users && !isLoading) {
    donationApi.data.map((data) => {
      if (data.Donor?.User.userName === user.userName) {
        count++;
      }
    });

    donationApi.data.map((data) => {
      if (data.Donor?.User.userName === user.userName) {
        totalDonation += data.transferredAmount;
      }
    });

    campaignApi.map((data) => {
      if (data.status == "active") {
        activeCampaign++;
      }
    });
    campaignApi.map((data) => {
      if (data.status == "completed") {
        completedCampaign++;
      }
    });
    users.map((data) => {
      if (data.role === "creator") {
        counterCreator++;
      } else if (data.role === "donor") {
        counterDonors++;
      }
    });
  }

  return (
    <div>
      {!isLoading ? (
        <div>
          <h1>Dashboard</h1>

          {user.role === "donor" ? (
            <div className="firstSection">
              <Card title="Number of donated campaigns" value={count} />
              <Card title="Total funds donated" value={totalDonation} />
            </div>
          ) : user.role === "admin" ? (
            <div className="firstSection">
              <Card
                title="Number of ongoing campaigns"
                value={activeCampaign}
              />
              <Card
                title="Number of completed campaigns"
                value={completedCampaign}
              />
              <Card title="Number of Creators" value={counterCreator} />
              <Card title="Number of Donors" value={counterDonors} />
            </div>
          ) : // for creator
          // <div className="firstSection">
          //   <Card title="Number of closed campaigns" value={} />
          //   <Card
          //     title="Number of completed campaigns"
          //     value={}
          //   />
          //   <Card title="Number of pending campaigns" value={} />
          // </div>
          null}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default FirstSection;
