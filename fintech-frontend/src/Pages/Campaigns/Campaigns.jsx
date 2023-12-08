import React, { useContext, useState } from "react";
import CampaignsTable from "../../Layouts/CampaignsTable/CampaignsTable.jsx";
import "./Campaigns.css";
import CreateCampaign from "../../Components/Dashboard/CreateCampaign.jsx";
import Button from "../../Components/Button/Button.jsx";
import UserContext from "../../useContext/userContext.js";
import Loading from "../../Components/Loading/Loading.jsx";
function Campaigns() {
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  return (
    <div className="CampaignsPageWrapper">
      {isLoading && <Loading />}
      <CampaignsTable setIsLoading={setIsLoading} />
    </div>
  );
}

export default Campaigns;
