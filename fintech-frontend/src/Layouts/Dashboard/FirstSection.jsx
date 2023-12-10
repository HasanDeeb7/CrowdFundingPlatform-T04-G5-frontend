import React, { useState, useContext, useEffect } from "react";

import Card from "../../Components/Dashboard/Card";
import "./FirstSection.css";
import UserContext from "../../useContext/userContext";
import fetchDonations from "../../utils/donations";
import fetchCampaigns from "../../utils/campaignAxios";
import fetchUsers from "../../utils/userAxios";
import Loading from "../../Components/Loading/Loading";

function FirstSection() {
  const { user } = useContext(UserContext);
  let [campaignApi, setCampaignApi] = useState();
  let [donationApi, setDonationApi] = useState();
  let [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchNumbersSections() {
    setIsLoading(true);
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
  let completedCampaignForCreator = 0;
  let pendingCampaignForCreator = 0;

  // console.log(donationApi);
  if (donationApi && campaignApi && users && !isLoading) {
    donationApi.data.map((data) => {
      if (data.Donor?.User?.userName === user.userName) {
        count++;
      }
    });

    donationApi.data.map((data) => {
      if (data.Donor?.User?.userName === user.userName) {
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
    campaignApi.map((data) => {
      if (data.status == "completed") {
        if (user.userName === data.Creator.User.userName)
          completedCampaignForCreator++;
      }
    });
    campaignApi.map((data) => {
      if (data.status == "pending") {
        if (user.userName === data.Creator.User.userName)
          pendingCampaignForCreator++;
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
          ) : user.role === "creator" ? (
            <div className="firstSection">
              <Card
                title="Number of completed campaigns"
                value={completedCampaignForCreator}
              />
              <Card
                title="Number of pending campaigns"
                value={pendingCampaignForCreator}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default FirstSection;
