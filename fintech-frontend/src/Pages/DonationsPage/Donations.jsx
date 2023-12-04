import React from "react";
import Header from "../../Layouts/DonationsLayout/Header";
import Content from "../../Layouts/DonationsLayout/Content";
// import Footer from "../../Layouts/DonationsLayout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import "./Donations.css";
import { DonationContext } from "../../useContext/context.ts";
import fakeDonations from "../../FakeData/fakeDonations.js";

function Donations() {
  return (
    <div className="container">
      <h1 style={{ margin: "2%" }}>Donations</h1>

      <DonationContext.Provider value={fakeDonations}>
        <Stack gap={5} className="try">
          <Header className="p-2" />
          <Content className="p-2" />
          {/* <Footer className="p-2" /> */}
        </Stack>
      </DonationContext.Provider>
    </div>
  );
}

export default Donations;
