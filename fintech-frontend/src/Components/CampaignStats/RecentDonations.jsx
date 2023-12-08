import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa6";

function RecentDonations(props) {
  const { transferredAmount, name } = props;
  const amount = transferredAmount?.toLocaleString("en-US");
  return (
    <li>
      <span className="topDonorsItem">
        <FaHandHoldingHeart />
        <span className="donorItemName">{name}</span>{" "}
        <span className="donorItemAmount">${amount}</span>
      </span>
    </li>
  );
}

export default RecentDonations;
