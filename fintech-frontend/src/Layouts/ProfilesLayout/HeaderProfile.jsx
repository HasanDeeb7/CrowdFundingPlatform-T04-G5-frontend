import React, { useContext, useState } from "react";
import { Panel, Grid, Row, Col } from "rsuite";
import Button from "../../Components/Button/Button";
import ProfileModal from "../../Pages/ProfilesPage/ProfileModal";
import { LuHelpingHand } from "react-icons/lu";
import { LiaSortAmountUpSolid } from "react-icons/lia";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

import Loading from "../../Components/Loading/Loading";
import UserContext from "../../useContext/userContext";
import DepositModal from "../../Components/DepositModal/DepositModal";

const HeaderProfile = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDepositModal, setIsDepositModal] = useState(false);

  const handleEditProfile = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <Panel bordered>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          {isDepositModal && (
            <DepositModal closeHandler={() => setIsDepositModal(false)} />
          )}
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
                {isProfileModalOpen && (
                  <ProfileModal
                    closeHandler={() => setIsProfileModalOpen(false)}
                    userData={user}
                  />
                )}
                <img
                  alt={user.image}
                  src={`${process.env.REACT_APP_BACKEND_ENDPOINT}public/images/${user.image}`}
                  style={{ width: "100%" }}
                />
              </Col>

              <Col xs={24} md={16}>
                <h1
                  style={{ textAlign: "center" }}
                >{`${user.firstName} ${user.lastName}`}</h1>
                <p style={{ fontSize: "1rem", textAlign: "center" }}>
                  <FaRegUser size={30} color="var(--primary-gold-clr)" /> User
                  Name : {user.userName}
                </p>
                <p style={{ fontSize: "1rem", textAlign: "center" }}>
                  <RiAdminLine size={30} color="var(--primary-gold-clr)" /> Role
                  : {user.role}
                </p>
                {user.role === "creator" && (
                  <p style={{ fontSize: "1rem", textAlign: "center" }}>
                    <TbBrandCampaignmonitor
                      size={30}
                      color="var(--primary-gold-clr)"
                    />{" "}
                    Number Of Campaign : {user.Creator.nbCampaign}
                  </p>
                )}
                {user.role === "donor" && (
                  <>
                    <p style={{ fontSize: "1rem", textAlign: "center" }}>
                      <LiaSortAmountUpSolid
                        size={30}
                        color="var(--primary-gold-clr)"
                      />{" "}
                      Amount Paid :{" "}
                      <span style={{ color: "var(--primary-gold-clr)" }}>
                        {user.Donor.amountPaid}$
                      </span>
                    </p>
                    <p style={{ fontSize: "1rem", textAlign: "center" }}>
                      <LuHelpingHand
                        size={30}
                        color="var(--primary-gold-clr)"
                      />{" "}
                      Number Of Contribution :{" "}
                      <span style={{ color: "var(--primary-gold-clr)" }}>
                        {user.Donor.numberOfContribution}$
                      </span>
                    </p>
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "30px",
                  }}
                >
                  <Button action="Edit Profile" onClick={handleEditProfile} />
                  {user.role === "donor" && (
                    <Button
                      action="Deposit"
                      onClick={() => setIsDepositModal(true)}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Grid>
        </>
      )}
    </Panel>
  );
};

export default HeaderProfile;
