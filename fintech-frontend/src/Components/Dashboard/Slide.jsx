import React, { useContext } from "react";
import SubSlide from "./SubSlide";
import "./Slide.css";
import fakeCampaigns from "../../FakeData/fakeCampaigns";
import fakeDonors from "../../FakeData/fakeDonors";
import fakeDonations from "../../FakeData/fakeDonations";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import UserContext from "../../useContext/userContext";

function Slide() {
  const { user } = useContext(UserContext);
  let pending = [];
  // request pending for admin
  fakeCampaigns.map((data) => {
    {
      return data.status === "pending" ? pending.push(data) : null;
    }
  });
  return (
    <div className="container1">
      <h3>compaigns interacted with</h3>
      <div className="child">
        {user.role == "donor"
          ? fakeDonations.map((data) => {
              {
                console.log(user.userName);
                return user.userName === data.donorName
                  ? fakeCampaigns.map((campaign) => {
                      return campaign.title === data.campaignTitle ? (
                        <SubSlide data={campaign} />
                      ) : null;
                    })
                  : null;
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
  );
}

export default Slide;
