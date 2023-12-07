import React, { useEffect, useState } from "react";
import Progress from "rsuite/Progress";
import { getPercentage } from "../../utils/getPercentage";
import "./CampaignsStats.css";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import Button from "../Button/Button";
import { FaHandHoldingHeart } from "react-icons/fa6";
import DonationModal from "../DonationModal/DonationModal";
import RecentDonations from "./RecentDonations";
function CampaignStats({ data }) {
  const progressData = getPercentage(data.amountContributed, data.target);
  const status = progressData === 100 ? "success" : "active";
  const recentItem = useMotionValue(0);
  const recentDonationsList = data.Donations?.slice(-3);

  console.log(recentDonationsList);
  const rounded = useTransform(recentItem, (latest) =>
    Math.round(latest).toLocaleString("en-US")
  );

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
    console.log(data);
    const controls = animate(
      recentItem,
      data.Donation?.transferredAmount || 2000
    );

    return controls.stop;
  }, []);

  return (
    <motion.div
      initial={{ x: 70 }}
      animate={{ x: 0 }}
      transition={{ duration: 1, ease: [0, 0.7, 0.2, 2] }}
      className="campaignStats"
    >
      {isDonationModalOpen ? (
        <DonationModal closeHandler={() => setIsDonationModalOpen(false)} />
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
          <span className="firstDonation">First Donation</span>
          <span className="topDonorsItem firstDonor">
            <FaHandHoldingHeart />
            <span className="donorItemName">Bill Gates</span>{" "}
            <span className="donorItemAmount">$2,500</span>
          </span>
          <Button
            action="Donate"
            onClick={() => setIsDonationModalOpen(true)}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default CampaignStats;
