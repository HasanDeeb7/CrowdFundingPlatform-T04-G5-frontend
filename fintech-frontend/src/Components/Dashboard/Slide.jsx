import React, { useContext, useEffect, useState } from "react";
import SubSlide from "./SubSlide";
import "./Slide.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import UserContext from "../../useContext/userContext";
import fetchDonations from "../../utils/donations";
import fetchCampaigns from "../../utils/campaignAxios";

function Slide() {
  let [campaignApi, setCampaignApi] = useState([]);
  let [donationApi, setDonationApi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchDashboard() {
    let donations = await fetchDonations();
    setDonationApi(donations);
    let campaign = await fetchCampaigns();
    setCampaignApi(campaign);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchDashboard();
  }, []);

  const { user } = useContext(UserContext);
  let pending = [];
  // request pending for admin
  if (campaignApi) {
    campaignApi.map((data) => {
      {
        return data.status === "pending" ? pending.push(data) : null;
      }
    });
  }
  return (
    !isLoading && (
      <div className="container1">
        {user.role === "donor" ? (
          <h3>Campaigns Interacted With</h3>
        ) : user.role === "admin" ? (
          <h3>Some Campaigns Requests</h3>
        ) : user.role === "creator" ? (
          <h3>Your Campaigns</h3>
        ) : null}

        <div className="child">
          {user.role === "donor"
            ? donationApi.data.map((data) => {
                if (data.Donor?.User.userName === user.userName) {
                  return <SubSlide data={data.Campaign} />;
                } else {
                  return "";
                }
              })
            : user.role === "creator"
            ? campaignApi.map((data) =>
                data.Creator.User.userName === user.userName ? (
                  <SubSlide data={data} />
                ) : (
                  ""
                )
              )
            : user.role === "admin"
            ? pending.slice(0, 5).map((data) => <SubSlide data={data} />)
            : null}
          {user.role === "admin" ? (
            <Link to="adminrequests">
              <Button action="More" />
            </Link>
          ) : null}
        </div>
      </div>
    )
  );
}

export default Slide;
