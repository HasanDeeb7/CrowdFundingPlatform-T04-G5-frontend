import React, { useContext, useEffect, useState } from "react";
import Progress from "rsuite/Progress";
import { getPercentage } from "../../utils/getPercentage";
import "./CampaignsStats.css";
import { animate, useMotionValue, motion } from "framer-motion";
import Button from "../Button/Button";
import { FaHandHoldingHeart } from "react-icons/fa6";
import DonationModal from "../DonationModal/DonationModal";
import RecentDonations from "./RecentDonations";
import UserContext from "../../useContext/userContext.js";
import { deleteCampaign } from "../../utils/campaings.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CampaignStats({ data }) {
  const { user } = useContext(UserContext);
  const progressData = getPercentage(data.amountContributed, data.target);
  const status = progressData === 100 ? "success" : "active";
  const recentItem = useMotionValue(0);
  const recentDonationsList = data.Donations?.slice(-3).reverse();
  const firstDonation = data.Donations[0];
  const navigate = useNavigate();

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
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.7, ease: [0, 0.2, 0.2, 1.1] }}
      className="campaignStats"
    >
      {isDonationModalOpen ? (
        <DonationModal
          closeHandler={() => setIsDonationModalOpen(false)}
          campaignId={data.id}
          campaignName={data.title}
          creatorId={data.Creator?.User?.id}
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
                  name={`${
                    firstDonation?.Donor?.User?.firstName
                      ? firstDonation.Donor.User.firstName
                      : "Anonymous"
                  }`}
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
                  {firstDonation?.Donor?.User?.firstName
                    ? firstDonation.Donor.User.firstName
                    : "Anonymous"}
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
