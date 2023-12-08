import React, { useContext, useEffect, useState } from "react";
import Progress from "rsuite/Progress";
import { getPercentage } from "../../utils/getPercentage";
import "./CampaignsStats.css";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import Button from "../Button/Button";
import { FaHandHoldingHeart } from "react-icons/fa6";
import DonationModal from "../DonationModal/DonationModal";
import RecentDonations from "./RecentDonations";
import UserContext from "../../useContext/userContext.js";
import { deleteCampaign } from "../../axios/campaings.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CampaignStats({ data }) {
  const { user } = useContext(UserContext);
  const progressData = getPercentage(data.amountContributed, data.target);
  const status = progressData === 100 ? "success" : "active";
  const recentItem = useMotionValue(0);
  const recentDonationsList = data.Donations?.slice(-3);
  const firstDonation = data.Donations[0];
  const navigate = useNavigate();
  console.log(recentDonationsList);
  const rounded = useTransform(recentItem, (latest) =>
    Math.round(latest).toLocaleString("en-US")
  );

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
    console.log(data.title);
    const controls = animate(
      recentItem,
      data.Donation?.transferredAmount || 2000
    );

    return controls.stop;
  }, []);
  async function handleDelete() {
    try {
      const response = await deleteCampaign(data.id);
      if (response) {
        toast.success("Campaign Deleted");
        return navigate("/campaigns", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <motion.div
      initial={{ x: 70 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: [0, 0.7, 0.2, 2] }}
      className="campaignStats"
    >
      {isDonationModalOpen ? (
        <DonationModal
          closeHandler={() => setIsDonationModalOpen(false)}
          campaignId={data.id}
          campaignName={data.title}
        />
      ) : (
        ""
      )}
      <div className="statsCard">
        <div className="fundsContainer">
          <span>
            ${data.amountContributed} USD raised of ${data.target} goal
          </span>
          <div>
            <Progress
              percent={progressData}
              showInfo={true}
              strokeColor="var(--light-gold-clr)"
              status={status}
            />
          </div>
        </div>
        <div className="topDonors">
          <h4> Recent Donations</h4>
          <ul className="topDonorsList">
            {recentDonationsList.map((item) => {
              return (
                <RecentDonations
                  name={`${item.Donor?.User.firstName}`}
                  transferredAmount={item.transferredAmount}
                />
              );
            })}
          </ul>
        </div>

        <div className="topDonorContainer">
          {firstDonation && (
            <>
              <span className="firstDonation">First Donation</span>
              <span className="topDonorsItem firstDonor">
                <FaHandHoldingHeart />
                <span className="donorItemName">
                  {firstDonation?.Donor?.User.firstName}
                </span>{" "}
                <span className="donorItemAmount">
                  ${firstDonation?.transferredAmount?.toLocaleString()}
                </span>
              </span>
            </>
          )}
          {user.role === "donor" ? (
            <Button
              action="Donate"
              onClick={() => setIsDonationModalOpen(true)}
            />
          ) : user.role === "admin" ? (
            <Button action="Delete" onClick={handleDelete} btnType="danger" />
          ) : (
            ""
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CampaignStats;
