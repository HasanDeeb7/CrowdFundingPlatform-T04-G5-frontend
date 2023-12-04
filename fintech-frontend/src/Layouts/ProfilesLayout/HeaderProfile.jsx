import React from "react";
import profile from "../../louai.jpg";
import "./HeaderProfile.css";
import Borders from "../../Components/ProfilesComponent/Borders";
import AdditionalDetails from "../../Components/ProfilesComponent/AdditionalDetails";
import { Button } from 'rsuite';

function HeaderProfile() {
  return (
    <div style={{display:"flex" , flexDirection:"column" , rowGap:"50px"}}>
      <div className="headerProfile">
        <img alt="progile" src={profile} className="imageProfile" />
        <h5>Louai Baghdadi</h5>
        <h6>Louai / Admin</h6>
      </div>

      <div className="information">
        <Borders />
        <AdditionalDetails />
      </div>

      <Button color="gold" appearance="primary" style={{backgroundColor:"var(--primary-gold-clr)" , margin:"0 auto"}}>
        Edit Profile
      </Button>
    </div>
  );
}

export default HeaderProfile;
