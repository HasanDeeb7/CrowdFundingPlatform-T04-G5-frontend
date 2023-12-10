import React from "react";
import "./CampaignsDetails.css";
import { animate, motion } from "framer-motion";
function CampgainsDetails({ data, img }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0, 0.2, 0.2, 1.1] }}
        className="campaignDetails"
      >
        <motion.h1
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0, 0.5, 0.2, 1.1] }}
        >
          {data.title}
        </motion.h1>
        <img src={img} alt="" className="singleCampaignImage" />
        <div className="campaignDetailsText">
          <motion.span
            initial={{ x: -350 }}
            animate={{ x: -0 }}
            transition={{ delay: 0.7, duration: 0.5, ease: [0, 0.5, 0.2, 1.1] }}
          >
            Orginized By a Good Person{" "}
          </motion.span>
          <motion.p
            initial={{ x: -900, opacity: 0 }}
            animate={{ x: -0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0, 0.5, 0.2, 1.1] }}
          >
            {data.description}
          </motion.p>
        </div>
      </motion.div>
    </>
  );
}

export default CampgainsDetails;
