import React from "react";
import SearchFilter from "../../Layouts/SearchFilter/SearchFilter.jsx";
import CampaignsTable from "../../Layouts/CampaignsTable/CampaignsTable.jsx";
import './Campaigns.css'
function Campaigns() {
  return (
    <div className="CampaignsPageWrapper">
      <h1>Campaigns</h1>
      <SearchFilter />
      <CampaignsTable />
    </div>
  );
}

export default Campaigns;
