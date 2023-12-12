import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import UserContext from "../../useContext/userContext";
import { approveCampaign, deleteCampaign } from "../../axios/campaings";
import { toast } from "react-toastify";

async function handleApprove(campaignId) {
  try {
    const response = await approveCampaign(campaignId);
    if (response) {
      console.log(response);
      return toast.success("Campaign is now active");
    }
  } catch (error) {
    toast.error("Error Approving campaign");
    console.log(error);
  }
}
async function handleDelete(data) {
  try {
    const response = await deleteCampaign(data.id);
    if (response) {
      toast.success("Campaign Deleted");
    }
  } catch (error) {
    console.log(error);
  }
}
export default function SubSlide({ data }) {
  const { user } = useContext(UserContext);
  return (
    <div className="sub">
      <div className="first">
        <img
          src={`${process.env.REACT_APP_BACKEND_ENDPOINT}public/images/${data.image}`}
          alt="campaigns"
        />
      </div>
      <div className="second">
        {/* {user.role === "admin" || user.role === "donor"  ( */}
          <NavLink to="/singlecampaign" state={data}>
            <h4>{data.title}</h4>
            <p>{data.description}</p>
          </NavLink>
        {/* ) : null} */}

        {user.role === "admin" ? (
          <>
            <Button action="approved" onClick={() => handleApprove(data.id)} />
            <Button
              btnType="danger"
              action="deny"
              onClick={() => handleDelete(data)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
