import React, { useState } from "react";
import "./DonationConfirmation.css";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import axios from "axios";
import { Donate } from "../../utils/donation";
function DonationConfirmation({
  donationAmount,
  setCurrentStep,
  campaignName,
  campaignId,
}) {
  const confirmationVariant = {
    closed: { opacity: 0, scale: 0, transform: "translateX(300px)" },
    opened: {
      opacity: 1,
      scale: 1,
      transform: "translateX(0)",
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  async function confirmDonation() {
    setIsLoading(true);
    try {
      const data = await Donate({
        amount: donationAmount,
        campaignId: campaignId,
      });
      if (data) {
        console.log(data);
        setCurrentStep(2);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <motion.div
      variants={confirmationVariant}
      initial="closed"
      animate="opened"
      transition={{
        delay: 0.3,
        duration: 0.4,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      exit="closed"
    >
      <h3>
        You are donating amount of {donationAmount}$ for {campaignName}
      </h3>
      <div className="confirmationButtonsWrapper">
        <Button
          action="Confirm"
          onClick={confirmDonation}
          isDisabled={isLoading}
        />
        <Button
          btnType="secondary"
          action="Back"
          onClick={() => setCurrentStep(0)}
          isDisabled={isLoading}
        />
      </div>
    </motion.div>
  );
}

export default DonationConfirmation;
