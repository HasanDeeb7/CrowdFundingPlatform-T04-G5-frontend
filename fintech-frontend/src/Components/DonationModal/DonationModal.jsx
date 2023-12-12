import { Steps } from "rsuite";
import "./DonationModal.css";
import { useState } from "react";
import { motion, steps } from "framer-motion";
import DonationFrom from "../DonationForm/DonationForm";
import DonationConfirmation from "../DonationConfirmation/DonationConfirmation";
import DonationDone from "../DonationDone/DonationDone";

function DonationModal({ closeHandler, campaignId, campaignName, creatorId }) {
  const [donationAmount, setDonationAmount] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const modalVariants = {
    closed: { opacity: 0, scale: 0, width: 0, height: 0 },
    opened: {
      opacity: 1,
      scale: 1,
      width: "500px",
      height: "700px",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <>
      <div className="modalContainer" onClick={closeHandler}></div>
      <motion.div
        variants={modalVariants}
        initial="closed"
        animate="opened"
        transition={{
          duration: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit="closed"
        className="modalItemsWrapper"
      >
        <div className="stepsContainer">
          <Steps current={currentStep}>
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
          </Steps>
        </div>
        {currentStep === 0 && (
          <DonationFrom
            setCurrentStep={setCurrentStep}
            donationAmount={donationAmount}
            campaignName={campaignName}
            setDonationAmount={setDonationAmount}
          />
        )}
        {currentStep === 1 && (
          <DonationConfirmation
            setCurrentStep={setCurrentStep}
            donationAmount={donationAmount}
            setDonationAmount={setDonationAmount}
            campaignId={campaignId}
            campaignName={campaignName}
            creatorId={creatorId}
          />
        )}
        {currentStep === 2 && <DonationDone closeHandler={closeHandler} />}
      </motion.div>
    </>
  );
}

export default DonationModal;
