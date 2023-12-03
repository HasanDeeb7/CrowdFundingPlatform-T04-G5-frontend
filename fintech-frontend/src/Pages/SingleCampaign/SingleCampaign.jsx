import React from "react";
import "./SingleCampaign.css";
import { useLocation } from "react-router-dom";
import img from "../../images/download.png";
import CampgainsDetails from "../../Components/CampaignsDetails/CampgainsDetails";
import CampaignStats from "../../Components/CampaignStats/CampaignStats";
import DonationModal from "../../Components/DonationModal/DonationModal";
function SingleCampaign() {
  const data = useLocation().state;
  console.log(data);
  return (
    <div className="singleCampaignContainer">
      {/* <DonationModal/> */}
      <CampgainsDetails data={data} img={img} />
      <CampaignStats data={data} />
    </div>
  );
}

export default SingleCampaign;
