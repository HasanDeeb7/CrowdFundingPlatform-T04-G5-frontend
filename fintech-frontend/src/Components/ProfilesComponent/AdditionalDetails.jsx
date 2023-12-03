import React from "react";
import "../../Layouts/ProfilesLayout/HeaderProfile.css";
import IdIcon from "@rsuite/icons/legacy/IdInfo";
import Email from "@rsuite/icons/legacy/AddressBook";
import Date from "@rsuite/icons/legacy/BirthdayCake";


function AdditionalDetails() {
  return (
    <>
    <div
      style={{
        border: "none", borderRadius:"20px",
        padding: "10px",
        backgroundColor: "var(--secondary-bg-clr)",
      }}
    >
      <h3>Additional Details</h3>

      <div style={{ display: "flex", flexDirection: "column", rowGap: "20px" , marginTop:"5px"}}>
        <article
          style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
        >
          <img alt="idIcon" src={IdIcon} />
          <div>
            <p>ID</p>
            <p>100</p>
          </div>
        </article>

        <article
          style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
        >
          <img alt="email" src={Email} />
          <div>
            <p>Email</p>
            <p>example@example.com</p>
          </div>
        </article>

        <article
          style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
        >
          <img alt="birth" src={Date} />
          <div>
            <p>Date of birth</p>
            <p>29 september 1998</p>
          </div>
        </article>
      </div>

    </div>

    
    </>
  );
}

export default AdditionalDetails;
