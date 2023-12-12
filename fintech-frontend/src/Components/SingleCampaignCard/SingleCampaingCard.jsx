import "./SingleCampaignCard.css";
import { motion } from "framer-motion";

function SingleCampaingCard({ isLoading, donations, donorsCount, deadline }) {
  return (
    !isLoading && (
      <div className="campaignCardsContainer">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0, 0.2, 0.2, 1.1] }}
          className="singleCampaignCard"
        >
          <h4>Number of Donations</h4>
          <p>{donations.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0, 0.2, 0.2, 1.1] }}
          className="singleCampaignCard"
        >
          <h4>Number of Donors</h4>
          <p>{donorsCount}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0, 0.2, 0.2, 1.1] }}
          className="singleCampaignCard"
        >
          <h4>Days left</h4>
          <p>{deadline}</p>
        </motion.div>
      </div>
    )
  );
}

export default SingleCampaingCard;
