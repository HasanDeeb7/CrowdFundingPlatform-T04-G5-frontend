import React from "react";
import CampaignsTableComponent from "../../Components/CampaignsTableComponent/CampaignsTableComponent.jsx";
import "./CampaignsTable.css";
function CampaignsTable({ setIsLoading }) {
  return (
    <>
      <div className="campaignsTableComponentWrapper">
        <CampaignsTableComponent setIsLoading={setIsLoading} />
      </div>
    </>
  );
}

export default CampaignsTable;
