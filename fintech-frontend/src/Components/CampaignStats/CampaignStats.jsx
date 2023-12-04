import React, { useEffect, useState } from "react";
import Progress from "rsuite/Progress";
import { getPercentage } from "../../utils/getPercentage";
import "./CampaignsStats.css";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import Button from "../Button/Button";
import { FaHandHoldingHeart } from "react-icons/fa6";

function CampaignStats({ data }) {
  const progressData = getPercentage(data.amountContributed, data.target);
  const status = progressData === 100 ? "success" : "active";
  const firstDonation = useMotionValue(0);
  const rounded = useTransform(firstDonation, (latest) => Math.round(latest));
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  useEffect(() => {
    const controls = animate(firstDonation, 2500);

    return controls.stop;
  }, []);

  return (
    <div className="campaignStats">
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
          <h4> Top Donors</h4>
          <ul className="topDonorsList">
            <li>
              <span className="topDonorsItem">
                <FaHandHoldingHeart />
                <span className="donorItemName">Bill Gates</span>{" "}
                <motion.span className="donorItemAmount">{rounded}</motion.span>
              </span>
            </li>
            <li>
              <span className="topDonorsItem">
                <FaHandHoldingHeart />
                <span className="donorItemName">Bill Gates</span>{" "}
                <span className="donorItemAmount">$2,500</span>
              </span>
            </li>
            <li>
              <span className="topDonorsItem">
                <FaHandHoldingHeart />
                <span className="donorItemName">Bill Gates</span>{" "}
                <span className="donorItemAmount">$2,500</span>
              </span>
            </li>
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
    </div>
  );
}

export default CampaignStats;
