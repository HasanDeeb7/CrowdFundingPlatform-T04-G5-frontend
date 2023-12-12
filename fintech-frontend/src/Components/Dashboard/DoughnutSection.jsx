import { Doughnut } from "react-chartjs-2";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../useContext/userContext";
import fetchCampaigns from "../../utils/campaignAxios";
import fetchDonations from "../../utils/donations";

function DoughnutSection() {
  const { user } = useContext(UserContext);
  let filtered;
  let activeCampaign = [];
  let sumTransfered = 0;
  let sumTarget = 0;
  let [campaignApi, setCampaignApi] = useState([]);
  let [donationApi, setDonationApi] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  async function fetchDoughnut() {
    let donations = await fetchDonations();
    setDonationApi(donations);
    let campaign = await fetchCampaigns();
    setCampaignApi(campaign);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchDoughnut();
  }, []);
  if (donationApi && campaignApi && !isLoading) {
    filtered = donationApi.data.filter(
      (data) => data.Donor?.User?.userName === user.userName
    );
    donationApi.data.map((data) => {
      sumTarget += data.Campaign.target;
      sumTransfered += data.transferredAmount;
    });
    campaignApi.map((data) => {
      if (data.Creator?.User.userName === user.userName) {
        if (data.status === "active") activeCampaign.push(data);
      }
    });
  }
  return (
    !isLoading &&
    campaignApi.length > 0 && (
      <div className="doughnut">
        {user.role === "donor" ? (
          filtered.length !== 0 ? (
            <Doughnut
              data={{
                labels: ["active campaign progress"],
                datasets: [
                  {
                    data: [
                      filtered[filtered.length - 1].transferredAmount,
                      filtered[filtered.length - 1].Campaign.target -
                        filtered[filtered.length - 1].transferredAmount,
                    ],
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
                    text: "Active Campaign",
                    padding: { top: 10, bottom: 30 },
                  },
                },
              }}
            />
          ) : (
            <h2>no data found</h2>
          )
        ) : user.role === "admin" ? (
          <Doughnut
            data={{
              labels: ["active campaigns progress"],
              datasets: [
                {
                  data: [sumTransfered, sumTarget - sumTransfered],
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
                  text: "Active Campaign",
                  padding: { top: 10, bottom: 30 },
                },
              },
            }}
          />
        ) : user.role === "creator" ? (
          activeCampaign.length === 0 ? (
            <h2>no data found</h2>
          ) : (
            <Doughnut
              data={{
                labels: ["active campaign progress"],
                datasets: [
                  {
                    data: [
                      activeCampaign[activeCampaign.length - 1]
                        .amountContributed,
                      activeCampaign[activeCampaign.length - 1].target -
                        activeCampaign[activeCampaign.length - 1]
                          .amountContributed,
                    ],
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
                    text: "Active Campaigns",
                    padding: { top: 10, bottom: 30 },
                  },
                },
              }}
            />
          )
        ) : null}
      </div>
    )
  );
}

export default DoughnutSection;
