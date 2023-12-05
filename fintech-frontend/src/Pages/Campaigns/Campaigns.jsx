import React, { useState } from "react";
import CampaignsTable from "../../Layouts/CampaignsTable/CampaignsTable.jsx";
import "./Campaigns.css";
import CreateCampaign from "../../Components/Dashboard/CreateCampaign.jsx";
import Button from "../../Components/Button/Button.jsx";
function Campaigns() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="CampaignsPageWrapper">
      <h1>Campaigns</h1>
      <Button action='New Campaign' onClick={()=> setIsModalOpen(true)} />

      {isModalOpen && (
        <CreateCampaign
          action="Create Campaign"
          closeHandler={() => setIsModalOpen(false)}
        />
      )}

      <CampaignsTable />
    </div>
  );
}

export default Campaigns;
