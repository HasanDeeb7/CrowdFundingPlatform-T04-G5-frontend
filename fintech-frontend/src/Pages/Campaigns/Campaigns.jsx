import React, { useContext, useState } from "react";
import CampaignsTable from "../../Layouts/CampaignsTable/CampaignsTable.jsx";
import "./Campaigns.css";
import CreateCampaign from "../../Components/Dashboard/CreateCampaign.jsx";
import Button from "../../Components/Button/Button.jsx";
import UserContext from "../../useContext/userContext.js";
function Campaigns() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <div className="CampaignsPageWrapper">
      
      {user.role === "creator" && (
        <Button action="New Campaign" onClick={() => setIsModalOpen(true)} />
      )}

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
