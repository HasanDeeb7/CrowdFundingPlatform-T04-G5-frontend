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
  const [donorsCount, setDonorsCount] = useState(0);
  const [deadline, setDeadline] = useState();
  async function getDonations() {
    try {
      const response = await fetchDonations();
      if (response) {
        const filteredDonations = response.data.filter(
          (item) => item.CampaignId === data.id
        );
        setDonations(filteredDonations);
        console.log(response.data);
        const donorsList = [];
        filteredDonations.map((item) => {
          if (!donorsList.includes(item.DonorId)) {
            donorsList.push(item.DonorId);
          }
        });
        setDonorsCount(donorsList.length);
        console.log(data.createdAt);

        const givenDate = new Date(data.createdAt);
        const currentDate = new Date();

        const differenceInMilliseconds =
          givenDate.getTime() - currentDate.getTime();

        const remainingDays = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60 * 24)
        );

        const deadlineDate = new Date(
          givenDate.getTime() + 30 * 24 * 60 * 60 * 1000
        );

        const deadlineDifferenceInMilliseconds =
          deadlineDate.getTime() - currentDate.getTime();

        const remainingDeadlineDays = Math.floor(
          deadlineDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
        );

        setDeadline(remainingDeadlineDays);

        console.log("givenDate:", givenDate);
        console.log("currentDate:", currentDate);
        console.log("deadlineDate:", deadlineDate);

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
        donorsCount={donorsCount}
        deadline={deadline}
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
