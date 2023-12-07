import React from "react";
import "./SingleCampaign.css";
import { useLocation } from "react-router-dom";
import img from "../../images/download.png";
import CampgainsDetails from "../../Components/CampaignsDetails/CampgainsDetails";
import CampaignStats from "../../Components/CampaignStats/CampaignStats";
function SingleCampaign() {
  const data = useLocation().state;
  console.log(data);
  return (
    <div className="singleCampaignContainer">
      
      <CampgainsDetails
        data={data}
        img={`${process.env.REACT_APP_BACKEND_ENDPOINT}public/images/${data.image}`}
      />
      <CampaignStats data={data} />
    </div>
  );
}

export default SingleCampaign;
