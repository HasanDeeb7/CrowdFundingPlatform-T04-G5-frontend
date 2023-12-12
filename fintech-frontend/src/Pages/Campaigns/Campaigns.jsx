import React, { useState } from "react";
import CampaignsTable from "../../Layouts/CampaignsTable/CampaignsTable.jsx";
import "./Campaigns.css";
import Loading from "../../Components/Loading/Loading.jsx";
function Campaigns() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="CampaignsPageWrapper">
      {isLoading && <Loading />}
      <CampaignsTable setIsLoading={setIsLoading} />
    </div>
  );
}

export default Campaigns;
