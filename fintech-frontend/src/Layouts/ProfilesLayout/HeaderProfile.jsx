import React, { useState } from "react";
import { Panel, Grid, Row, Col, Avatar, Icon } from "rsuite";
import profile from "../../louai.jpg";
import Button from "../../Components/Button/Button";
import ProfileModal from "../../Pages/ProfilesPage/ProfileModal";
import { CgMail } from "react-icons/cg";
import { BiSolidInfoSquare } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

const userData = {
  name: "Louai Baghdadi",
  email: "user@example.com",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",

  phone: "(123) 456-7890",
  address: "123 Main St, City, Country",
};

const HeaderProfile = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { name, email, bio, phone, address } = userData;

  const handleEditProfile = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <Panel bordered>
      <Grid fluid>
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col xs={24} md={8}>
            {isProfileModalOpen ? (
              <ProfileModal
                closeHandler={() => setIsProfileModalOpen(false)}
                userData={userData}
              />
            ) : (
              ""
            )}
            <img alt="profileImage" src={profile} style={{ width: "100%" }} />
          </Col>

          <Col xs={24} md={16}>
            <h1 style={{ textAlign: "center" }}>{name}</h1>
            <p style={{ fontSize: "1rem", textAlign: "center" }}>
            <CgMail size={30} color="var(--primary-gold-clr)" /> Email : {email}
            </p>
            <p style={{ fontSize: "1rem", textAlign: "center" }}><BiSolidInfoSquare size={30} color="var(--primary-gold-clr)" /> {bio}</p>

            <p style={{ fontSize: "1rem", textAlign: "center" }}>
            <FaPhoneAlt size={25} color="var(--primary-gold-clr)"/> Phone: {phone}
              <br />
              <IoLocation size={30} color="var(--primary-gold-clr)" /> Address: {address}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop:"30px"
              }}
            >
              <Button action="Edit Profile" onClick={handleEditProfile} />
            </div>
          </Col>
        </Row>
      </Grid>
    </Panel>
  );
};

export default HeaderProfile;
