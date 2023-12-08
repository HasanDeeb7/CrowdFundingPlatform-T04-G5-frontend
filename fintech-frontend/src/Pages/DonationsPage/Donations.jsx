import React, { useState } from "react";
import Header from "../../Layouts/DonationsLayout/Header";
import Content from "../../Layouts/DonationsLayout/Content";
// import Footer from "../../Layouts/DonationsLayout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";
import "./Donations.css";
// import { FilterProvider } from "../../useContext/filterContext";
// import { DonationContext } from "../../useContext/context.ts";
// import fakeDonations from "../../FakeData/fakeDonations.js";

function Donations() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchText, setSearchText] = useState({ searchText: "" });

  return (
    <div className="container">
      <h1>Donations</h1>

      {/* <FilterProvider> */}
      <Stack gap={5} className="try">
        <Header
          className="p-2"
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <Content
          className="p-2"
          activeFilter={activeFilter}
          searchText={searchText.searchText}
        />
        {/* <Footer className="p-2" /> */}
      </Stack>
      {/* </FilterProvider> */}
    </div>
  );
}

export default Donations;
