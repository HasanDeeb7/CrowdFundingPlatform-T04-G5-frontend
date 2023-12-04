import React from "react";
import './CampaignsDetails.css'
function CampgainsDetails({data, img}) {

  return (
    <>
      <div className="campaignDetails">
        <h1>{data.title}</h1>
        <img src={img} alt="" className="singleCampaignImage" />
        <div className="campaignDetailsText">
          <span>Orginized By a Good Person </span>
          <p>{data.description}</p>
        </div>
      </div>
    </>
  );
}

export default CampgainsDetails;
