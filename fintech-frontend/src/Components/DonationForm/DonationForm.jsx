import React, { useContext } from "react";
import { Input, InputGroup } from "rsuite";
import "./DonationForm.css";
import Button from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import UserContext from "../../useContext/userContext";
import { toast } from "react-toastify";

function DonationForm({
  donationAmount,
  setDonationAmount,
  setCurrentStep,
  campaignName,
}) {
  const { user } = useContext(UserContext);
  function handleProceed() {
    if (!donationAmount) {
      return toast.error("Field is required");
    }
    setCurrentStep(1);
  }

  const formVariant = {
    closed: { opacity: 0, scale: 0, transform: "translateX(-300px)" },
    opened: {
      opacity: 1,
      scale: 1,
      transform: "translateX(0)",
    },
  };

  const balance = user.Donor.balance;
  const inputStyles = { width: 200, margin: 0 };
  return (
    <AnimatePresence>
      <motion.div
        variants={formVariant}
        initial="closed"
        animate="opened"
        transition={{
          delay: 0.2,
          duration: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit="closed"
        className="donationFormContainer"
      >
        <h3> You are donating to {campaignName}</h3>
        <div className="donationInputWrapper">
          <label htmlFor="">Your Donation</label>
          <InputGroup inside style={inputStyles}>
            <InputGroup.Addon>$</InputGroup.Addon>
            <Input
              type="number"
              value={donationAmount}
              onChange={(value) => setDonationAmount(value)}
            />
            <InputGroup.Addon>.00</InputGroup.Addon>
          </InputGroup>
        </div>
        <div className="donationInputWrapper">
          <label htmlFor="">Current Balance</label>
          <span>{balance}$</span>
        </div>
        <div className="donationInputWrapper">
          <label htmlFor="">Your Donation</label>
          <span>{donationAmount}$</span>
        </div>
        <div className="donationTotalBalance">
          <label htmlFor="">Your total balance</label>
          <span>{balance - donationAmount || balance}$</span>
        </div>
        <Button action="Proceed" onClick={() => handleProceed()} />
      </motion.div>
    </AnimatePresence>
  );
}

export default DonationForm;
