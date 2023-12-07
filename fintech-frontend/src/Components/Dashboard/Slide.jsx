import React, { useContext, useEffect, useState } from "react";
import SubSlide from "./SubSlide";
import "./Slide.css";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import fakeDonors from "../../FakeData/fakeDonors";
import fakeDonations from "../../FakeData/fakeDonations";
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
  campaignApi.map((data) => {
    {
      return data.status === "pending" ? pending.push(data) : null;
    }
  });
  return (
    !isLoading && (
      <div className="container1">
        <h3>compaigns interacted with</h3>
        <div className="child">
          {user.role == "donor"
            ? // <SubSlide data={campaign} />
              donationApi.data.map((data) => {
                if (data.Donor?.User.userName === user.userName) {
                  return <SubSlide data={data.Campaign} />;
                }
              })
            : // : user.role === "creator"
            // ? fakeDonors.slice(0, 10).map((data) => <SubSlide data={data} />)
            user.role === "admin"
            ? pending.slice(0, 5).map((data) => <SubSlide data={data} />)
            : null}
          {user.role === "admin" ? (
            <Link to="adminrequests">
              <Button action="more" />
            </Link>
          ) : null}
        </div>
      </div>
    )
  );
}

export default Slide;
