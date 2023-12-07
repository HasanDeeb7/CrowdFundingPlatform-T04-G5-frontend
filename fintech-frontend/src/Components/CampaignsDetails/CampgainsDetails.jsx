import React from "react";
import "./CampaignsDetails.css";
import { animate, motion } from "framer-motion";
function CampgainsDetails({ data, img }) {
  return (
    <>
      <motion.div
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0, 0.7, 0.2, 2] }}
        className="campaignDetails"
      >
        <h1>{data.title}</h1>
        <img src={img} alt="" className="singleCampaignImage" />
        <div className="campaignDetailsText">
          <span>Orginized By a Good Person </span>
          <p>{data.description}</p>
        </div>
      </motion.div>
    </>
  );
}

export default CampgainsDetails;
