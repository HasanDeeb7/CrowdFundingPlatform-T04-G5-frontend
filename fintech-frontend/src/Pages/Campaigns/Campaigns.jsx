import React from "react";
import CampaignsTable from "../../Layouts/CampaignsTable/CampaignsTable.jsx";
import './Campaigns.css'
function Campaigns() {
  return (
    <div className="CampaignsPageWrapper">
      <h1>Campaigns</h1>
      <CampaignsTable />
    </div>
  );
}

export default Campaigns;
