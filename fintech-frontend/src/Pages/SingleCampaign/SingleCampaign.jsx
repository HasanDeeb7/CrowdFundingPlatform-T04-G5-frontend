import React, { useEffect, useState } from "react";
import "./SingleCampaign.css";
import { useLocation } from "react-router-dom";
import img from "../../images/download.png";
import CampgainsDetails from "../../Components/CampaignsDetails/CampgainsDetails";
import CampaignStats from "../../Components/CampaignStats/CampaignStats";
import SingleCampaingCard from "../../Components/SingleCampaignCard/SingleCampaingCard";
import fetchDonations from "../../utils/donations";
import Loading from "../../Components/Loading/Loading";
function SingleCampaign() {
  const data = useLocation().state;
  const [isLoading, setIsLoading] = useState(true);
  const [donations, setDonations] = useState();
  async function getDonations() {
    try {
      const response = await fetchDonations();
      if (response) {
        const filteredDonations = response.data.filter(
          (item) => item.CampaignId === data.id
        );
        setDonations(filteredDonations);
        console.log(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDonations();
  }, []);
  return !isLoading ? (
    <div className="singleCampaignContainer">
      <CampgainsDetails
        data={data}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        img={`${process.env.REACT_APP_BACKEND_ENDPOINT}public/images/${data.image}`}
      />
      <SingleCampaingCard
        data={data}
        donations={donations}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <CampaignStats
        data={data}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  ) : (
    <Loading />
  );
}

export default SingleCampaign;
