import { Line } from "react-chartjs-2";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../useContext/userContext";
import fetchDonations from "../../utils/donations";
import fetchCampaigns from "../../utils/campaignAxios";

function ChartsSection() {
  const { user } = useContext(UserContext);
  console.log(user);
  let [campaignApi, setCampaignApi] = useState([]);
  let [donationApi, setDonationApi] = useState();

  const [isLoading, setIsLoading] = useState(true);

  async function fetchCharts() {
    let donations = await fetchDonations();
    setDonationApi(donations);
    let campaign = await fetchCampaigns();
    setCampaignApi(campaign);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchCharts();
  }, []);
  let activeCampaign = [];
  let donorsCampaign = [];
  let activeForCreator = [];
  if (campaignApi && donationApi) {
    activeCampaign.push(campaignApi.filter((data) => data.status === "active"));
    donorsCampaign = donationApi.data.filter((data) =>
      data.Donor?.User?.userName === user.userName
        ? data.Campaign.status === "active"
        : null
    );
    activeForCreator = campaignApi.filter((data) =>
      data.Creator?.User.userName === user.userName
        ? data.status === "active"
        : null
    );
  }
  return (
    !isLoading &&
    campaignApi.length > 0 && (
      <div className="chart">
        {user.role === "admin" ? (
          <Line
            data={{
              labels: activeCampaign[0].map((data) => data.title),
              datasets: [
                {
                  label: "Target",
                  data: activeCampaign[0].map((data) =>
                    data.status === "active" ? data.target : null
                  ),
                  backgroundColor: ["#c27613"],
                  borderColor: "#c27613",
                },
                {
                  label: "Progress",
                  data: activeCampaign[0].map((data) =>
                    data.status === "active" ? data.amountContributed : null
                  ),
                  backgroundColor: ["#ffc42e"],
                  borderColor: "#ffc42e",
                },
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
                  text: "Campaigns",
                },
              },
            }}
          />
        ) : user.role === "donor" ? (
          donorsCampaign.length === 0 ? (
            <h2>no data found</h2>
          ) : (
            <Line
              data={{
                labels: donorsCampaign.map((data) => data.Campaign.title),
                datasets: [
                  {
                    label: "Target",
                    data: donorsCampaign.map((data) =>
                      data.Campaign.status === "active"
                        ? data.Campaign.target
                        : null
                    ),
                    backgroundColor: ["#c27613"],
                    borderColor: "#c27613",
                  },
                  {
                    label: "Progress",
                    data: donorsCampaign.map((data) =>
                      data.Campaign.status === "active"
                        ? data.Campaign.amountContributed
                        : null
                    ),
                    backgroundColor: ["#ffc42e"],
                    borderColor: "#ffc42e",
                  },
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
                    text: "Campaigns",
                  },
                },
              }}
            />
          )
        ) : user.role === "creator" ? (
          activeForCreator.length === 0 ? (
            <h2>no data found</h2>
          ) : (
            <Line
              data={{
                labels: activeForCreator[
                  activeForCreator.length - 1
                ].Donations.map(
                  (data) => data.updatedAt.split(":")[0].split("T")[0]
                ),
                datasets: [
                  {
                    label: "Donations",
                    data: activeForCreator[
                      activeForCreator.length - 1
                    ].Donations.map((data) => data.transferredAmount),
                    backgroundColor: ["#c27613"],
                    borderColor: "#c27613",
                  },
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
                    text: "Active Campaign",
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

export default ChartsSection;
